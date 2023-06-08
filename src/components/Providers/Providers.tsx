'use client';

import { SWRConfig } from 'swr';
import axiosClient from '~/api-client/axios-client';
import Header from '../Header/Header';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}>
            <Header />
            {children}
        </SWRConfig>
    );
}
