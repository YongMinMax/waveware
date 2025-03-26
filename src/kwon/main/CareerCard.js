import React from 'react';

function CareerCard({ title, description, color }) {
    return (
        <section className={"relative flex-1"}>
            <div className={"absolute inset-0 bg-white hover:bg-black opacity-20 transition-colors duration-300"}></div>
            <div className={"flex flex-col items-start justify-between self-stretch p-10 gap-11"}>
                <img src={`/icon/career_${title}.png`} className={"w-20 h-20"}/>
                <h2 className={"text-2xl font-bold"}>
                    <span style={{ color: color, fontSize: '2rem' }}>{title.charAt(0)}</span>
                    {title.slice(1)}
                </h2>
                <p className={"font-light pr-10"}>{description}</p>
            </div>
        </section>
    );
}

export default CareerCard; 