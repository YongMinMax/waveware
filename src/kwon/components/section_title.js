import React from 'react';

export default function SectionTitle({ text }) {
    return (
        <div className="w-full flex justify-center">
            <span className="w-[1400px] pt-32 pb-4 text-6xl font-bold text-left">{text}</span>
        </div>
    )
}
