import Head from 'next/head'
import Header from "./header";

export default function Layout({ title, children, isDark = false }: { title: string; children: React.ReactNode; isDark?: boolean }) {

    return (
        <>
            <Head>
                <link rel="icon" type="image/png" href="/favicon_v2.png"/>
                <title>{title}</title>
            </Head>
            <Header isDark={isDark}/>
            <main className={"min-h-screen flex flex-col items-center justify-center"}>
                {children}
            </main>
        </>
    )
}