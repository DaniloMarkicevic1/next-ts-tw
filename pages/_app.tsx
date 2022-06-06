import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout/Layout';
import { ContextProvider } from '../context/context';
import { FilterContextProvider } from '../context/filter-context';

function MyApp({ Component, pageProps: { pageProps } }: AppProps) {
    return (
        <ContextProvider>
            <FilterContextProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </FilterContextProvider>
        </ContextProvider>
    );
}

export default MyApp;
