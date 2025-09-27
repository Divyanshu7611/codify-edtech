// import React from "react";
// import CTAButton from "./Button";
// import { TypeAnimation } from "react-type-animation";
// import { FaArrowRight } from "react-icons/fa";

// const CodeBlocks = ({
//   position,
//   heading,
//   subheading,
//   ctabtn1,
//   ctabtn2,
//   codeblock,
//   backgroundGradient,
//   codeColor,
// }) => {
//   return (
//     <div className={`flex ${position} my-20 justify-between flex-col lg:gap-10 gap-10`}>


//       {/* Section 1  */}
//       <div className="w-[100%] lg:w-[50%] flex flex-col gap-8">
//         {heading}

//         {/* Sub Heading */}
//         <div className="text-richblack-300 text-base font-bold w-[85%] -mt-3">
//           {subheading}
//         </div>

//         {/* Button Group */}
//         <div className="flex gap-7 mt-7">
//           <CTAButton active={ctabtn1.active} linkto={ctabtn1.link}>
//             <div className="flex items-center gap-2">
//               {ctabtn1.btnText}
//               <FaArrowRight />
//             </div>
//           </CTAButton>
//           <CTAButton active={ctabtn2.active} linkto={ctabtn2.link}>
//             {ctabtn2.btnText}
//           </CTAButton>
//         </div>
//       </div>

//       {/* Section 2 */}
//       <div className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]">
//         {backgroundGradient}
//         {/* Indexing */}
//         <div className="text-center flex flex-col   w-[10%] select-none text-richblack-400 font-inter font-bold ">
//           <p>1</p>
//           <p>2</p>
//           <p>3</p>
//           <p>4</p>
//           <p>5</p>
//           <p>6</p>
//           <p>7</p>
//           <p>8</p>
//           <p>9</p>
//           <p>10</p>
//           <p>11</p>
//         </div>

//         {/* Codes */}
//         <div
//           className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}
//         >
//           <TypeAnimation
//             sequence={[codeblock, 1000, ""]}
//             cursor={true}
//             repeat={Infinity}
//             style={{
//               whiteSpace: "pre-line",
//               display: "block",
//             }}
//             omitDeletionAnimation={true}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CodeBlocks;



import React, { useMemo, useState } from "react";
import CTAButton from "./Button";
import { FaArrowRight, FaCopy } from "react-icons/fa";
import { motion } from "framer-motion"; // For animations
import { TypeAnimation } from "react-type-animation"; // Reintroduced for typewriter effect
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs"; // Blue-themed style

const CodeBlocks = ({
  position = "flex-col lg:flex-row",
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock = "",
  backgroundGradient = "linear-gradient(135deg, #1e3c72, #2a5298)", // Blue gradient
  codeColor = "text-blue-400",
}) => {
  const [copied, setCopied] = useState(false);

  // Split codeblock into lines for dynamic line numbers
  const codeLines = useMemo(() => codeblock.split("\n").filter((line) => line.trim()), [codeblock]);

  // Handle copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(codeblock);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className={`flex ${position} my-20 justify-between flex-col lg:gap-10 gap-10`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      aria-label="Interactive code block section with buttons"
    >
      {/* Section 1: Text and Buttons */}
      <motion.div className="w-[100%] lg:w-[50%] flex flex-col gap-8" variants={itemVariants}>
        {heading}
        <motion.div
          className="text-richblack-300 text-base font-bold w-[85%] -mt-3"
          variants={itemVariants}
        >
          {subheading || "No subheading provided"}
        </motion.div>
        <motion.div className="flex gap-7 mt-7" variants={itemVariants}>
          <CTAButton active={ctabtn1?.active} linkto={ctabtn1?.link}>
            <div className="flex items-center gap-2">
              {ctabtn1?.btnText || "Learn More"}
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2?.active} linkto={ctabtn2.link}>
            {ctabtn2?.btnText || "Get Started"}
          </CTAButton>
        </motion.div>
      </motion.div>

      {/* Section 2: Code Block */}
      <motion.div
        className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[90%] lg:w-[470px] lg:max-w-[50%] overflow-x-auto rounded-xl shadow-lg"
        style={{
          background: backgroundGradient,
          backdropFilter: "blur(10px)",
        }}
        variants={itemVariants}
      >
        {/* Dynamic Line Numbers */}
        <div className="text-center flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold pr-2 pt-2">
          {codeLines.map((_, index) => (
            <p key={index} className="py-1">
              {index + 1}
            </p>
          ))}
        </div>

        {/* Code with Typewriter Effect and Syntax Highlighting */}
        <div className={`w-[90%] flex flex-col gap-2 font-mono ${codeColor} relative`}>
          {codeblock ? (
            <>
              <div className="relative">
                <TypeAnimation
                  sequence={[codeblock, 1000, ""]} // Type the entire codeblock
                  cursor={true}
                  repeat={Infinity} // Continuous typewriter effect
                  style={{
                    whiteSpace: "pre-wrap",
                    display: "block",
                    fontSize: "inherit",
                    lineHeight: "inherit",
                    padding: "10px",
                    margin: 0,
                    borderRadius: "0 0 8px 8px",
                    background: "transparent",
                  }}
                  omitDeletionAnimation={true} // Only type, no deletion
                />
                {/* Overlay with Syntax Highlighting for static formatting */}
                <SyntaxHighlighter
                  language="javascript"
                  style={monokai}
                  customStyle={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    opacity: 0, // Hidden by default, used for accessibility
                    padding: "10px",
                    margin: 0,
                    borderRadius: "0 0 8px 8px",
                    background: "transparent",
                  }}
                >
                  {codeblock}
                </SyntaxHighlighter>
              </div>
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 bg-blue-700 rounded-full hover:bg-blue-600 transition-colors text-white hover:text-yellow-300"
                aria-label="Copy code to clipboard"
              >
                {copied ? (
                  <span className="text-xs">Copied!</span>
                ) : (
                  <FaCopy className="text-sm" />
                )}
              </button>
            </>
          ) : (
            <p className="text-richblack-400 p-2">No code to display</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CodeBlocks;