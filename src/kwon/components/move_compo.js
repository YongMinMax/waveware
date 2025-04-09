import {motion} from "framer-motion";
import React from "react";

export default function MoveCompo ({ children, animate, delay = 0, className = `` }) {
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
}