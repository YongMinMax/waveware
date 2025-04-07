import React from "react";

function CareerCard({ title, description, color }) {
  return (
    <div className="relative flex-1 overflow-hidden transform transition-transform duration-300 ease-out hover:scale-105">
      {/* 카드 배경 */}
      <div className="absolute inset-0 bg-white opacity-20 transition-colors duration-300"></div>

      {/* 카드 내용 */}
      <div className="relative flex flex-col items-start justify-between self-stretch p-10 gap-11 z-10">
        <img src={`/icon/career_${title}.png`} className="w-20 h-20" />
        <h2 className="text-2xl font-bold">
          <span style={{ color: color, fontSize: "2rem" }}>
            {title.charAt(0)}
          </span>
          {title.slice(1)}
        </h2>
        <p className="font-light pr-10">{description}</p>
      </div>
    </div>
  );
}

export default CareerCard;
