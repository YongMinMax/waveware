import React from 'react';

export default function SectionTitle({ text }) {
    return (
        <div className="w-full flex justify-center">
            <span className="w-full mx-6 md:w-[1400px] pt-32 pb-4 text-3xl font-bold text-left md:text-6xl">{text}</span>
        </div>
    )
}
