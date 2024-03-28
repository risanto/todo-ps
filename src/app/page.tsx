'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@/lib/env';

import TodoComponent from '@/components/Todo/TodoComponent';

const queryClient = new QueryClient();

export default function HomePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoComponent />
    </QueryClientProvider>
  );
}
