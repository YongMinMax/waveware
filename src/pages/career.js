import MenuHeader from "../kwon/components/menuheader";
import ProcessComponent from "../kwon/career/process_component";
export default function Career() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center">

            <MenuHeader title={"Career"} description={"사람의 성장이 회사의 성장이라고 믿습니다."}/>
        
            <span className="w-full px-12 pt-32 pb-4 text-5xl font-semibold text-left">How To Apply</span>

            <div className="w-[1300px] flex relative my-20">
                <div className="absolute left-0">
                    <ProcessComponent step={"STEP 1"} title={"지원"} description={"원하는 직무를 선택하고 지원서를 제출합니다."} isHighlighted={false} />
                </div>
                <div className="absolute left-[255px]">
                    <ProcessComponent step={"STEP 2"} title={"서류 전형"} description={"원하는 직무를 선택하고 지원서를 제출합니다."} isHighlighted={false} />
                </div>
                <div className="absolute left-[510px]">
                    <ProcessComponent step={"STEP 3"} title={"면접"} description={"원하는 직무를 선택하고 지원서를 제출합니다."} isHighlighted={false} />
                </div>
                <div className="absolute left-[765px]">
                    <ProcessComponent step={"STEP 4"} title={"최종 합격"} description={"원하는 직무를 선택하고 지원서를 제출합니다."} isHighlighted={true} />
                </div>
                <div className="absolute left-[1020px]">
                    <ProcessComponent step={"FINAL"} title={"입사"} description={"원하는 직무를 선택하고 지원서를 제출합니다."} isHighlighted={false} />
                </div>
            </div>

        </main>
    );
}
