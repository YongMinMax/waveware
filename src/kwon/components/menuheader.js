import React from 'react';

export default function MenuHeader({ title, description }) {
  return (
    <div className="flex flex-col w-[1400px] items-end gap-6 border-b-2 border-gray-200 pb-12 px-2 pt-40">
      <h1 className="text-primary text-xl">{title}</h1>
      <div className="text-4xl font-semibold text-right">
        {description?.split('/').map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
    </div>
  );
}