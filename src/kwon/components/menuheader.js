import React from 'react';

export default function MenuHeader({ title, description }) {
  return (
    <div className="flex flex-col w-[1400px] items-end gap-7 border-b-2 border-gray-200 pb-12 px-2 pt-40">
      <h1 className="text-primary text-[30px] font-semibold">{title}</h1>
      <div className="text-[62px] font-semibold text-right leading-tight">
        {description?.split('/').map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
    </div>
  );
}


// leading-none: 1.0
// leading-tight: 1.25
// leading-snug: 1.375
// leading-normal: 1.5
// leading-relaxed: 1.625
// leading-loose: 2.0
// leading-[1.2]