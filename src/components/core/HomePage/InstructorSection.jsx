// import React from 'react'
// import CTAButton from "../../../components/core/HomePage/Button";
// import { FaArrowRight } from "react-icons/fa";
// import Instructor from "../../../assets/Images/Instructor.png";
// import HighlightText from './HighlightText';

// const InstructorSection = () => {
//   return (
//     <div>
//         <div className="flex flex-col lg:flex-row gap-20 items-center">
//           <div className="lg:w-[50%]">
//             <img
//               src={Instructor}
//               alt=""
//               className="shadow-white shadow-[-20px_-20px_0_0]"
//             />
//           </div>
//           <div className="lg:w-[50%] flex gap-10 flex-col">
//             <h1 className="lg:w-[50%] text-4xl font-semibold ">
//               Become an
//               <HighlightText text={"instructor"} />
//             </h1>

//             <p className="font-medium text-[16px] text-justify w-[90%] text-richblack-300">
//               Instructors from around the world teach millions of students on
//               StudyNotion. We provide the tools and skills to teach what you
//               love.
//             </p>

//             <div className="w-fit">
//               <CTAButton active={true} linkto={"/signup"}>
//                 <div className="flex items-center gap-3">
//                   Start Teaching Today
//                   <FaArrowRight />
//                 </div>
//               </CTAButton>
//             </div>
//           </div>
//         </div>
//     </div>
//   )
// }

// export default InstructorSection



import React from "react";
import CTAButton from "../../../components/core/HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";
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

const InstructorSection = () => {
  return (
    <motion.div
      className="relative w-full max-w-maxContent mx-auto py-12 lg:py-16 bg-gradient-to-br from-richblack-900 to-richblack-800 text-white rounded-lg overflow-hidden"
      variants={staggerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      aria-label="Become an instructor section"
    >
      {/* Decorative Background Accent */}
      <div className="absolute top-10 right-10 w-24 h-24 bg-blue-900/20 rounded-full blur-xl animate-pulse -z-10 hidden lg:block" />

      <motion.div
        className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 px-4 lg:px-8"
        variants={staggerVariants}
      >
        {/* Image Section */}
        <motion.div
          className="w-full lg:w-[50%] flex justify-center"
          variants={itemVariants}
        >
          <img
            src={Instructor}
            alt="Instructor teaching"
            className="w-full max-w-md lg:max-w-lg object-contain rounded-lg shadow-2xl hover:shadow-blue-400/30 transition-shadow duration-300"
          />
        </motion.div>

        {/* Text and CTA Section */}
        <motion.div
          className="w-full lg:w-[50%] flex flex-col gap-6 lg:gap-8"
          variants={itemVariants}
        >
          <motion.h1
            className="text-3xl lg:text-4xl font-semibold leading-tight tracking-wide"
            variants={itemVariants}
          >
            Become an
            <HighlightText text={"instructor"} />
          </motion.h1>

          <motion.p
            className="text-base lg:text-lg font-medium text-richblack-300 leading-relaxed text-left lg:text-justify max-w-lg"
            variants={itemVariants}
          >
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </motion.p>

          <motion.div
            className="w-fit"
            variants={itemVariants}
          >
            <CTAButton active={true} linkto="/signup">
              <div className="flex items-center gap-3">
                Start Teaching Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default InstructorSection;