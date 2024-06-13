"use client";

import { trpc } from "@/utils/trpc";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

type Props = {
  children: React.ReactNode;
};

const Provider = ({ children }: Props) => {
  const [mounted, setMounted] = useState(false);
  const [reactQueryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/api/trpc",
        }),
      ],
    })
  );
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <NextUIProvider>
      <trpc.Provider client={trpcClient} queryClient={reactQueryClient}>
        <QueryClientProvider client={reactQueryClient}>
          <Toaster position="bottom-center" />
          {children}
        </QueryClientProvider>
      </trpc.Provider>
    </NextUIProvider>
  );
};

export default Provider;
