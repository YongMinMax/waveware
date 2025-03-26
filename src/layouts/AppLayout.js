import React from "react";
import Header from "./Header";
import Footer from "./footer";

const AppLayout = ({ children, sections, sectionRefs, title }) => {
    return (
        <div className="h-screen flex flex-col">
            <Header />
            <div className="relative flex-1 flex">
                {/* Main Content Area */}
                <div className="z-0 flex flex-col w-full h-full">
                    <main className="flex flex-col flex-1 h-full justify-start items-center">
                        {children}
                    </main>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default AppLayout