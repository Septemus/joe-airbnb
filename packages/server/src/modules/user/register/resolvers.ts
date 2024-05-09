import { ResolverMap } from '../../../types/graphql-utils';
import { User } from '../../../entity/User';
import { formatYupError } from '../../../utils/formatYupError';
import { duplicateEmail } from './errorMessages';
import { createConfirmEmailLink } from './createConfirmEmailLink';
import { validationSchema } from '@joe-airbnb/common';

export const resolvers: ResolverMap = {
  Mutation: {
    register: async (
      _,
      args: GQL.IRegisterOnMutationArguments,
      { redis, url }
    ) => {
      try {
        await validationSchema.validate(args, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }

      const { email, password } = args;

      const userAlreadyExists = await User.findOne({
        where: { email },
        select: ['id']
      });

      if (userAlreadyExists) {
        return [
          {
            path: 'email',
            message: duplicateEmail
          }
        ];
      }

      const user = User.create({
        email,
        password
      });

      await user.save();

      const ret = [
        {
          result: 'User created,please confirm to activate:',
          message: await createConfirmEmailLink(url, user.id, redis)
        }
      ];
      return ret;
    }
  }
};
