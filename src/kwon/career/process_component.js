import React, { useState, useEffect } from 'react';

export default function ProcessComponent({ data, isActive, onHover }) {

    const isHighlighted = isActive || data.isHighlighted;
    
    return (
        <div 
            className="flex flex-col items-center gap-6"
            onMouseEnter={() => onHover && onHover(data.id)}
            onMouseLeave={() => onHover && onHover(null)}
        >
            <div className={`w-[300px] h-[300px] rounded-full flex flex-col justify-center items-center transition-all duration-300 
                ${isHighlighted ? 'bg-black border-none' : 'bg-transparent border border-gray-400'}`}>

                <div className={"w-[140px] h-[150px] flex flex-col justify-end text-xl font-bold transition-colors duration-300 text-primary"}>
                    {data.step}
                </div>

                <h3 className={`w-[140px] h-[150px] text-2xl font-bold pt-2 transition-colors duration-300
                    ${isHighlighted ? 'text-white' : 'text-black'}`}>
                    {data.title}
                </h3>
                
            </div>
            <p className="text-base leading-[1.4] text-left m-0 max-w-[200px]">
                {data.description}
            </p>
        </div>
    );
}