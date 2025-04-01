import React from 'react';

export default function ProcessComponent({ step, title, description, isHighlighted }) {
    return (
        <div className="flex flex-col items-center gap-5">

            <div className={`w-[300px] h-[300px] rounded-full flex flex-col justify-center items-center transition-all duration-300 
                ${isHighlighted ? 'bg-black border-none' : 'bg-transparent border border-gray-400'}`}>
                <div className={`h-[150px] text-2xl font-bold mb-2.5 transition-colors duration-300 text-primary`}>
                    {step}
                </div>
                <h3 className={`h-[150px] text-2xl font-bold m-0 transition-colors duration-300
                    ${isHighlighted ? 'text-white' : 'text-black'}`}>
                    {title}
                </h3>
            </div>

            <p className="text-base leading-[1.4] text-center m-0 max-w-[200px]">
                {description}
            </p>

        </div>
    );
}