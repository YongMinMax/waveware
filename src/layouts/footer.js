import React from "react";

export default function Footer() {
    return (
        <footer className="flex justify-center items-center py-14 text-black">
            <div className="w-[1400px] flex justify-between items-center">
                <div>
                    <p className="text-4xl font-pistara text-primary">waveware</p>
                    <p className={"font-light"}>
                        (주)웨이브웨어 <br/>
                        대전 광역시 유성구 관평동 684번지 <br/>
                        042)864-4842 / osy3165@waveware.co.kr <br/>
                        대표자 : 김성주 <br/>
                        © 2025 waveware
                    </p>
                </div>
                <img src="/icon/btn_top.png" alt="botton to top" className="w-16 h-16"/>
            </div>
        </footer>
    );
}