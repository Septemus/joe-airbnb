import * as yup from "yup";
import * as bcrypt from "bcryptjs";

import { ResolverMap } from "../../../types/graphql-utils";
import { forgotPasswordLockAccount } from "../../../utils/forgotPasswordLockAccount";
import { createForgotPasswordLink } from "../../../utils/createForgotPasswordLink";
import { User } from "../../../entity/User";
import { userNotFoundError } from "./errorMessages";
import { forgotPasswordPrefix } from "../../../constants";
import { registerPasswordValidation } from "../../../yupSchemas";
import { formatYupError } from "../../../utils/formatYupError";
import { confirmedChangePasswordError } from "../login/errorMessages";

// 20 minutes
// lock account

const schema = yup.object().shape({
  newPassword: registerPasswordValidation
});

export const resolvers: ResolverMap = {
  Feedback:{
    __resolveType(obj) {
      if(obj.result) {
        return 'Success'
      }
      else {
        return 'Error'
      }
    }
  },
  Mutation: {
    sendForgotPasswordEmail: async (
      _,
      { email }: GQL.ISendForgotPasswordEmailOnMutationArguments,
      { redis,url }
    ) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return [
          {
            path: "email",
            message: userNotFoundError
          }
        ]
      }

      await forgotPasswordLockAccount(user.id, redis);
      // @todo add frontend url
      const confirmLink = await createForgotPasswordLink(url, user.id, redis);
      // @todo send email with url
      return [
        {
          result:'Please confirm your application in the link:',
          message:confirmLink
        }
      ]
    },
    forgotPasswordChange: async (
      _,
      { newPassword, key }: GQL.IForgotPasswordChangeOnMutationArguments,
      { redis }
    ) => {
      const redisKey = `${forgotPasswordPrefix}${key}`;

      const userId = await redis.get(redisKey);

      const user:User = await User.findOne({ where: { id:userId } }) as User;

      if (user.forgotPasswordLocked) {
        return [
          {
            path: "email",
            message: confirmedChangePasswordError
          }
        ]
      }

      try {
        await schema.validate({ newPassword }, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const updatePromise = User.update(
        { id: userId },
        {
          password: hashedPassword
        }
      );

      const deleteKeyPromise = redis.del(redisKey);

      await Promise.all([updatePromise, deleteKeyPromise]);

      return [
        {
          result:'Change password successful!',
          message:''
        }
      ];
    }
  }
};
