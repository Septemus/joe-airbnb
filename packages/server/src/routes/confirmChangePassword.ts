import { Request, Response } from "express";
import { User } from "../entity/User";
import { redis } from "../redis";
import { forgotPasswordPrefix } from "../constants";

export const confirmChangePassword = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = await redis.get(`${forgotPasswordPrefix}${id}`);
  if (userId) {
    await User.update({ id: userId }, { forgotPasswordLocked: false });
    await redis.del(id);
    res.send("ok");
  } else {
    res.send("invalid");
  }
};
