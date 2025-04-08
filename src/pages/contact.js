import MenuHeader from "../kwon/components/menuheader";
import Location from "../kwon/contact/location";

export default function Contact() {

    return (
        <main className="min-h-screen flex flex-col items-center justify-center">
            <MenuHeader title={"Contact"} description={"기술의 중심에서, 당신과 연결됩니다."}/>

        <Location/>

        </main>
    );
}
