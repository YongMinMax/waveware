import React from "react";

export default function Requirements({requirements }) {
    return(
        <div className="w-[400px] h-[500px] flex flex-col mt-12 px-4">
            <p className="text-primary text-xl">{requirements.eng}</p>
            <p className="text-3xl font-semibold pb-10">{requirements.kor}</p>
            <p className="text-gray-600 text-lg">{requirements.description}</p>
        </div>
    )
}