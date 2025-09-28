// import React from "react";

// // Importing React Icons
// import { HiUsers } from "react-icons/hi";
// import { ImTree } from "react-icons/im";

// const CourseCard = ({cardData, currentCard, setCurrentCard}) => {
//   return (
//     <div
//       className={`w-[360px] lg:w-[30%] ${
//         currentCard === cardData?.heading
//           ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50"
//           : "bg-richblack-800"
//       }  text-richblack-25 h-[300px] box-border cursor-pointer`}
//       onClick={() => setCurrentCard(cardData?.heading)}
//     >
//       <div className="border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3">
//         <div
//           className={` ${
//             currentCard === cardData?.heading && "text-richblack-800"
//           } font-semibold text-[20px]`}
//         >
//           {cardData?.heading}
//         </div>

//         <div className="text-richblack-400">{cardData?.description}</div>
//       </div>

//       <div
//         className={`flex justify-between ${
//           currentCard === cardData?.heading ? "text-blue-300" : "text-richblack-300"
//         } px-6 py-3 font-medium`}
//       >
//         {/* Level */}
//         <div className="flex items-center gap-2 text-[16px]">
//           <HiUsers />
//           <p>{cardData?.level}</p>
//         </div>

//         {/* Flow Chart */}
//         <div className="flex items-center gap-2 text-[16px]">
//           <ImTree />
//           <p>{cardData?.lessionNumber} Lession</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseCard;



import React from "react";
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";
import { motion } from "framer-motion"; // For animations

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  // Animation variants
  const cardVariants = {
    hidden: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    active: { scale: 1.02, boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)" },
  };

  return (
    <motion.div
      className={`w-[360px] lg:w-[30%] h-[300px] box-border shadow-lg shadow-richblack-5 cursor-pointer rounded-xl overflow-hidden ${
        currentCard === cardData?.heading
          ? "bg-gradient-to-br from-yellow-50 to-white shadow-[12px_12px_0_0] shadow-yellow-100"
          : "bg-gradient-to-br from-richblack-900 to-richblack-800"
      }`}
      onClick={() => setCurrentCard(cardData?.heading)}
      variants={cardVariants}
      initial="hidden"
      whileHover="hover"
      animate={currentCard === cardData?.heading ? "active" : "hidden"}
    >
      <div className="border-b-[2px] border-dashed border-richblack-700 h-[80%] p-6 flex flex-col gap-4">
        <motion.div
          className={`font-semibold text-xl md:text-2xl ${
            currentCard === cardData?.heading ? "text-richblack-800" : "text-richblack-25"
          } transition-colors duration-300`}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
        >
          {cardData?.heading}
        </motion.div>

        <motion.div
          className="text-richblack-400 text-sm md:text-base leading-relaxed"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.1 } }}
        >
          {cardData?.description}
        </motion.div>
      </div>

      <div
        className={`flex justify-between px-6 py-4 font-medium ${
          currentCard === cardData?.heading ? "text-blue-400" : "text-richblack-300"
        } transition-colors duration-300`}
      >
        {/* Level */}
        <motion.div
          className="flex items-center gap-2 text-base md:text-lg"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: 0.5, delay: 0.2 } }}
        >
          <HiUsers className="text-xl md:text-2xl" />
          <p>{cardData?.level}</p>
        </motion.div>

        {/* Lesson Number */}
        <motion.div
          className="flex items-center gap-2 text-base md:text-lg"
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: 0.5, delay: 0.2 } }}
        >
          <ImTree className="text-xl md:text-2xl" />
          <p>{cardData?.lessionNumber} Lesson{cardData?.lessionNumber > 1 ? "s" : ""}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CourseCard;