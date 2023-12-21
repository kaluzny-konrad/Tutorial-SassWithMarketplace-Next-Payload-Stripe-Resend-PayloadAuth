import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { authRouter } from "./auth-router";

export const appRouter = router({
    auth: authRouter
});

export type AppRouter = typeof appRouter;
