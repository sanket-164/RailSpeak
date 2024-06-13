import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "../server/routes";

// single instance of trpc throughout the application
export const trpc = createTRPCReact<AppRouter>();
