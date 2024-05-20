import 'reflect-metadata';
import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { expressMiddleware } from '@apollo/server/express4';
import * as express from 'express';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import { rateLimit } from 'express-rate-limit';
import * as RateLimitRedisStore from 'rate-limit-redis';
import { redis } from './redis';
import { createTypeormConn } from './utils/createTypeormConn';
import { confirmEmail } from './routes/confirmEmail';
import { genSchema } from './utils/genSchema';
import { redisSessionPrefix } from './constants';
import { createTestConn } from './testUtils/createTestConn';
import { confirmChangePassword } from './routes/confirmChangePassword';
import { Redis } from 'ioredis';
import { CorsRequest } from 'cors';
import * as cors from 'cors';
import { RequestHandler } from 'express';
import * as http from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

interface MyContext {
  redis: Redis;
  url: string;
  session: session.Session & Partial<session.SessionData>;
  req: express.Request;
}
const SESSION_SECRET = 'ajslkjalksjdfkl';
const RedisStore = connectRedis(session);
export const startServer = async () => {
  if (process.env.NODE_ENV === 'test') {
    await redis.flushall();
  }
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer<MyContext>({
    schema: genSchema(),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ includeCookies: true })
    ]
  });
  await server.start();
  const expMiddleware = expressMiddleware(server, {
    context: async ({ req }: { req: express.Request }): Promise<MyContext> => {
      return {
        redis,
        url: req.protocol + '://' + req.get('host'),
        session: req.session,
        req
      };
    }
  });
  const limiterMiddleware = rateLimit({
    store: new RateLimitRedisStore({
      client: redis
    }),
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });
  const sessionMiddleWare = session({
    store: new RedisStore({
      client: redis,
      prefix: redisSessionPrefix
    }),
    name: 'qid',
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
  });
  const corsMiddleWare = cors<CorsRequest>({
    credentials: true,
    origin:
      process.env.NODE_ENV === 'test'
        ? '*'
        : (process.env.FRONTEND_HOST as string)
  });
  const jsonMiddleWare = express.json();
  const middlewares: RequestHandler[] = [
    jsonMiddleWare,
    sessionMiddleWare,
    expMiddleware,
    limiterMiddleware,
    corsMiddleWare
  ];
  app.use('/', ...middlewares);
  app.get('/confirm/:id', confirmEmail);
  app.get('/change-password/:id', confirmChangePassword);
  if (process.env.NODE_ENV === 'test') {
    await createTestConn(true);
  } else {
    await createTypeormConn();
  }
  await new Promise<void>(resolve =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/`);
  return app;
};
