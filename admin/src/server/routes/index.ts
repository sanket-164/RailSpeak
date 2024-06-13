import { z } from "zod";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import { adminProcedure, publicProcedure, router } from "../trpc";
import { CREATE_STATION_SCHEMA, LOGIN_SCHEMA } from "@/utils/types/zod";
import db from "@/utils/db";
import createHashUtil from "@/utils/createHash";
import stationRouter from "./station";

export const appRouter = router({
  login: publicProcedure
    .input(LOGIN_SCHEMA)
    .output(z.boolean())
    .mutation(async function ({ input }) {
      try {
        const { username, password } = input;
        const adminId = await db.admin.findFirst({
          where: {
            name: username,
            password: createHashUtil(password),
          },
          select: {
            id: true,
          },
        });
        const token = jwt.sign({ adminId }, process.env.JWT_SECRET ?? "", {
          algorithm: "HS512",
          expiresIn: "1h",
        });
        cookies().set("token", token);
        return !!adminId;
      } catch (error: any) {
        throw new Error(error.message);
      }
    }),
  station: stationRouter,
});

export type AppRouter = typeof appRouter;
