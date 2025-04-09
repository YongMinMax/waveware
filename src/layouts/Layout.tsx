import Head from 'next/head'

export default function Layout({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <>
            <Head>
                <link rel="icon" type="image/png" href="/favicon_v2.png"/>
                <title>{title}</title>
            </Head>
            <main>{children}</main>
        </>
    )
}