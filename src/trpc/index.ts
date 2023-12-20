import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";

export const appRouter = router({});

export type AppRouter = typeof appRouter;
