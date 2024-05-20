import { Redis } from 'ioredis';
import * as session from 'express-session';
export interface Session extends session.Session {
  userId?: string;
}

export interface Context {
  redis: Redis;
  url: string;
  session: Session & Partial<session.SessionData>;
  req: Express.Request;
}

export type Resolver = (
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;

export type GraphQLMiddlewareFunc = (
  resolver: Resolver,
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;

export interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver;
  };
}
