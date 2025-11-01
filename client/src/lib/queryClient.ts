import { QueryClient } from "@tanstack/react-query";

/**
 * Query client configuration for frontend-only app
 * Each component will define its own queryFn using services
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
    mutations: {
      retry: false,
    },
  },
});
