import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import useLoginStorage from '../hooks/useLoginStorage';
import UserContext from '../contexts/UserContext';

export default function App({ Component, pageProps }: AppProps) {
  const [token, setToken] = useLoginStorage('token', false);

  return (
    <>
      <UserContext.Provider value={{token, setToken}}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </>

  ) 
}
