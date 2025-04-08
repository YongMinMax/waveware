import { motion } from "framer-motion";
import React from "react";

export default function Requirements({ requirements, animate, delay = 0 }) {
  return (
    <div className="w-[400px] h-[600px] flex flex-col mt-12 px-4">
      <MoveCompo animate={animate} delay={delay} className={`text-primary text-xl`}>
        <p className="">{requirements.eng}</p>
      </MoveCompo>
      <MoveCompo animate={animate} delay={delay}>
        <p className="text-3xl font-semibold pb-10">{requirements.kor}</p>
      </MoveCompo>

      <MoveCompo animate={animate} delay={delay}>
        <p className="text-gray-600 text-lg">{requirements.description}</p>
      </MoveCompo>
      <MoveCompo animate={animate} delay={delay} className="mt-auto flex  self-end   mb-10">
        <img src={requirements.img} alt="requirement" className="w-[330px] pt-[20px]" />
      </MoveCompo>
    </div>
  );
}

const MoveCompo = ({ children, animate, delay, className = `` }) => {
  return (
    <div className={` overflow-hidden ${className}`}>
      <motion.div
        animate={{ y: animate ? 0 : "100%" }}
        transition={{ ease: [0.68, -0.55, 0.265, 1.55], duration: 0.8, delay: delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};
