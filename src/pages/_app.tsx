import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import {AuthProvider} from '../contexts/AuthContext';
import { QueryClientProvider, QueryClient } from 'react-query';
import { io } from 'socket.io-client';

const queryClient = new QueryClient();

export const socket = io("http://localhost:5000", {
  rejectUnauthorized: false 
});

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </QueryClientProvider>
    </>

  ) 
}
