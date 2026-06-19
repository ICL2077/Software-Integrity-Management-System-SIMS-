'use client';

import { useRef } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';

import appMutations from '@/lib/appMutations'

export default function QueryPersistProvider({ children }: { children: React.ReactNode }) {
    const queryClientRef = useRef<QueryClient | null>(null);
    const persisterRef = useRef<ReturnType<typeof createAsyncStoragePersister> | null>(null);

    if (!queryClientRef.current) {
        queryClientRef.current = new QueryClient();
            appMutations(queryClientRef.current)
    }

    if (!persisterRef.current) {
        persisterRef.current = createAsyncStoragePersister({
            storage: (globalThis as any).localStorage,
        });
    }


    return (
        <PersistQueryClientProvider
            client={queryClientRef.current}
            persistOptions={{
                persister: persisterRef.current,
                maxAge: 1000 * 60 * 10,
                dehydrateOptions: {
                    shouldDehydrateQuery: (query) => {
                        const key = query.queryKey[0];
                        // Персистим только публичные данные
                        return key === 'events';
                    },
                },
            }}
            onSuccess={() => queryClientRef.current!.resumePausedMutations()}>
            {children}
        </PersistQueryClientProvider>
    );
}
