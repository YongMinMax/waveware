import MenuHeader from "../kwon/components/menuheader";
import TimeLine from "../kwon/history/timeline";

export default function History() {

    return (
        <main className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-500`}>
            <MenuHeader title={"History"} description={"기술로 써 내려온 성장의 기록/ 미래를 향한 우리의 발자취입니다."}/>

            <TimeLine/>

        </main>
    );
}
