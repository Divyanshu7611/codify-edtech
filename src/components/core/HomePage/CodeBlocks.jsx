import React, { useMemo, useState } from "react";
import CTAButton from "./Button";
import { FaArrowRight, FaCopy } from "react-icons/fa";
import { motion } from "framer-motion"; // For animations
import { TypeAnimation } from "react-type-animation";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeBlocks = ({
  position = "flex-col lg:flex-row",
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock = "",
  backgroundGradient = "linear-gradient(135deg, #2b2b2b, #404040)", // Distinct lightish black gradient
  codeColor = "text-yellow-300",
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

  // Common styles with !important to enforce
  const codeContainerStyle = {
    background: `${backgroundGradient} !important`,
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
  };

  return (
    <motion.div
      className={`flex ${position} my-12 justify-between flex-col lg:gap-12 gap-8`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      aria-label="Interactive code block section with buttons"
    >
      {/* Section 1: Text and Buttons */}
      <motion.div className="w-full lg:w-[50%] flex flex-col gap-6" variants={itemVariants}>
        {heading}
        <motion.div
          className="text-richblack-300 text-base md:text-lg font-semibold w-[90%] -mt-2"
          variants={itemVariants}
        >
          {subheading || "No subheading provided"}
        </motion.div>
        <motion.div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-6" variants={itemVariants}>
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
        className="h-fit flex flex-row py-4 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-full lg:w-[470px] lg:max-w-[50%] overflow-x-auto"
        style={codeContainerStyle}
        variants={itemVariants}
      >
        {/* Dynamic Line Numbers */}
        <div className="text-center flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold pr-2 pt-2">
          {codeLines.map((_, index) => (
            <p key={index} className="py-1 hover:text-yellow-300 transition-colors">
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
                  sequence={[codeblock, 800, ""]}
                  cursor={true}
                  repeat={Infinity}
                  style={{
                    whiteSpace: "pre-wrap",
                    display: "block",
                    fontSize: "inherit",
                    lineHeight: "inherit",
                    padding: "12px",
                    margin: 0,
                    borderRadius: "0 0 8px 8px",
                    background: "transparent",
                  }}
                  omitDeletionAnimation={true}
                />
                <SyntaxHighlighter
                  language="javascript"
                  style={docco}
                  customStyle={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    opacity: 0,
                    padding: "12px",
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
                className="absolute top-2 right-2 p-2 bg-gray-800 rounded-full hover:bg-gray-700 hover:shadow-md transition-all duration-200 text-yellow-300 hover:text-white"
                aria-label="Copy code to clipboard"
              >
                {copied ? (
                  <span className="text-xs font-medium">Copied!</span>
                ) : (
                  <FaCopy className="text-sm" />
                )}
              </button>
            </>
          ) : (
            <p className="text-richblack-400 p-3">No code to display</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CodeBlocks;