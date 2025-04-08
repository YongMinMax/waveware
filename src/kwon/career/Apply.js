import React from "react";

export default function Apply() {
    return (
        <div className={"my-20"}>
            <a
                href="https://www.saramin.co.kr/zf_user/company-info/view?csn=MlUxNjNTaERsZ0h1Qzg3NlZXUnpHdz09"
                target="_blank"
                rel="noopener noreferrer"
            >
                <button
                    className="flex items-center px-6 py-2 border border-black text-black rounded-br-2xl rounded-tl-2xl hover:bg-black hover:text-white transition-colors duration-300">
                    <span className="mr-4 font-light">채용 공고</span>
                    <svg
                        width="30"
                        viewBox="0 0 50 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M0 13H49V14H0V13Z" fill="currentColor"/>
                        <path
                            d="M34 0L49.0942 13.1212L48.4381 13.8759L33.3439 0.75471L34 0Z"
                            fill="currentColor"
                        />
                    </svg>
                </button>
            </a>
        </div>
    )
}