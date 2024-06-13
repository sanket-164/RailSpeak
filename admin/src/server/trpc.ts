import { initTRPC, TRPCError } from "@trpc/server";
import createContext from "./context";

const t = initTRPC
  .context<Awaited<ReturnType<typeof createContext>>>()
  .create();

const isAdminMiddleware = t.middleware(({ ctx, next }) => {
  if (!ctx.isAdmin) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized request",
    });
  }
  return next({ ctx });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const adminProcedure = t.procedure.use(isAdminMiddleware);
