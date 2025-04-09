import MenuHeader from "../kwon/components/menuheader";
import Location from "../kwon/contact/location";
import Layout from "../layouts/Layout";

export default function Contact() {

    return (
        <Layout title={"오시는 길 | waveware"}>
            <MenuHeader title={"Contact"} description={"기술의 중심에서, 당신과 연결됩니다."}/>

        <Location/>

        </Layout>
    );
}
