import MenuHeader from "../kwon/components/menuheader";

export default function Contact() {

    return (
        <main className="min-h-screen flex flex-col items-center justify-center">
            <MenuHeader title={"Contact"} description={"기술의 중심에서, 당신과 연결됩니다."}/>
        
        <span className="w-full px-12 pt-32 pb-4 text-5xl font-bold text-left">Location</span>

        <section className="relative w-full bg-gray-100 h-[600px]">

            <div className="w-[1400px] h-[500px] mx-auto py-[50px] flex flex-col gap-20">

                {/* 회사 정보 섹션 */}
                <section className="flex justify-between items-start">
                    <div className="flex flex-col gap-8">
                        <dl className="addr_item">
                            <dt>Address</dt>
                            <dd>대전광역시 유성구 테크노4로 17 대덕비즈센터 D동 104호</dd>
                            <dd>D-104, Daedeok Biz Center, 17 Techno 4-ro, Daejeon</dd>
                        </dl>
                        <dl className="addr_item">
                            <dt>Tel</dt>
                            <dd>042-864-4842</dd>
                        </dl>
                        <dl className="addr_item">
                            <dt>Fax</dt>
                            <dd>042-864-4841</dd>
                        </dl>
                        <dl className="addr_item">
                            <dt>E-Mail</dt>
                            <dd>osy3165@waveware.co.kr</dd>
                        </dl>
                    </div>

                    {/* 지도 */}
                    <div className="w-[800px] h-[500px] bg-white rounded-lg overflow-hidden">

                    </div>
                </section>

            </div>

        </section>

        </main>
    );
}
