// import React from 'react'
// import HighlightText from './HighlightText'
// import CTAButton from "../../../components/core/HomePage/Button";
// import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
// import Compare_with_others from "../../../assets/Images/Compare_with_others.svg";
// import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg";

// const LearningLanguageSection = () => {
//   return (
//     <div>
//         <div className="text-4xl font-semibold text-center my-10">
//             Your swiss knife for
//             <HighlightText text={"learning any language"} />
//             <div className="text-center text-richblack-700 font-medium lg:w-[75%] mx-auto leading-6 text-base mt-3">
//               Using spin making learning multiple languages easy. with 20+
//               languages realistic voice-over, progress tracking, custom schedule
//               and more.
//             </div>
//             <div className="flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0">
//               <img
//                 src={Know_your_progress}
//                 alt=""
//                 className="object-contain  lg:-mr-32 "
//               />
//               <img
//                 src={Compare_with_others}
//                 alt=""
//                 className="object-contain lg:-mb-10 lg:-mt-0 -mt-12"
//               />
//               <img
//                 src={Plan_your_lessons}
//                 alt=""
//                 className="object-contain  lg:-ml-36 lg:-mt-5 -mt-16"
//               />
//             </div>
//           </div>

//           <div className="w-fit mx-auto lg:mb-20 mb-8 -mt-5">
//             <CTAButton active={true} linkto={"/signup"}>
//               <div className="">Learn More</div>
//             </CTAButton>
//           </div>
//     </div>
//   )
// }

// export default LearningLanguageSection




import React from "react";
import HighlightText from "./HighlightText";
import CTAButton from "../../../components/core/HomePage/Button";
import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg";
import { FaChartPie, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion"; // For animations

// Animation variants
const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const LearningLanguageSection = () => {
  return (
    <motion.div
      className="relative w-full max-w-maxContent mx-auto py-12 lg:py-16 bg-gradient-to-br from-richblack-900 to-richblack-800 text-white rounded-lg overflow-hidden"
      variants={staggerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      aria-label="Language learning section with interactive features"
    >
      {/* Decorative Background Accent */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-900/20 rounded-full blur-xl animate-pulse -z-10 hidden lg:block" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          className="text-4xl lg:text-5xl font-semibold leading-tight tracking-wide"
          variants={itemVariants}
        >
          Your Swiss Knife for
          <HighlightText text={"learning any language"} />
        </motion.div>

        <motion.div
          className="mt-4 text-sm lg:text-base font-medium text-richblack-300 max-w-xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Using Spin, mastering multiple languages is effortless. Enjoy 20+
          languages with realistic voice-overs, track your progress, create
          custom schedules, and more.
        </motion.div>

        {/* Feature Images and Progress Indicator */}
        <motion.div
          className="mt-12 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12"
          variants={itemVariants}
        >
          {/* Progress Indicator */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-32 h-32">
              <FaChartPie className="w-full h-full text-blue-400 animate-spin-slow" />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-yellow-300">
                85%
              </div>
            </div>
            <p className="text-sm text-richblack-300">Progress</p>
          </div>

          {/* Feature Images */}
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <motion.img
              src={Know_your_progress}
              alt="Know your progress"
              className="w-60 lg:w-64 object-contain shadow-md hover:shadow-lg transition-shadow duration-300"
              variants={itemVariants}
            />
            <motion.img
              src={Compare_with_others}
              alt="Compare with others"
              className="w-60 lg:w-64 object-contain shadow-md hover:shadow-lg transition-shadow duration-300"
              variants={itemVariants}
            />
            <motion.img
              src={Plan_your_lessons}
              alt="Plan your lessons"
              className="w-60 lg:w-64 object-contain shadow-md hover:shadow-lg transition-shadow duration-300"
              variants={itemVariants}
            />
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="mt-12 w-fit mx-auto"
          variants={itemVariants}
        >
          <CTAButton active={true} linkto="/signup">
            <div className="flex items-center gap-2">
              Learn More
              <FaArrowRight className="text-xs" />
            </div>
          </CTAButton>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Custom CSS for animation (add to your stylesheet or component)
const style = document.createElement("style");
style.innerHTML = `
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-spin-slow {
    animation: spin-slow 4s linear infinite;
  }
`;
document.head.appendChild(style);

export default LearningLanguageSection;