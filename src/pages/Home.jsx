// // Icons Import
// import { FaArrowRight } from "react-icons/fa"
// import { Link } from "react-router-dom"

// // Image and Video Import
// import Banner from "../assets/Images/banner.mp4"
// // Component Imports
// import Footer from "../components/Common/Footer"
// import ReviewSlider from "../components/Common/ReviewSlider"
// import CTAButton from "../components/core/HomePage/Button"
// import CodeBlocks from "../components/core/HomePage/CodeBlocks"
// import ExploreMore from "../components/core/HomePage/ExploreMore"
// import HighlightText from "../components/core/HomePage/HighlightText"
// import InstructorSection from "../components/core/HomePage/InstructorSection"
// import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection"
// import TimelineSection from "../components/core/HomePage/Timeline"

// function Home() {
//   return (
//     <div>
//       {/* Section 1 */}
//       <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
//         {/* Become a Instructor Button */}
//         <Link to={"/signup"}>
//           <div className="group mx-auto mt-16 w-fit rounded-full bg-[#1b1818] p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
//             <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
//               <p>Become an Instructor</p>
//               <FaArrowRight />
//             </div>
//           </div>
//         </Link>

//         {/* Heading */}
//         <div className="text-center text-4xl font-semibold">
//           Empower Your Future with
//           <HighlightText text={"Coding Skills"} />
//         </div>

//         {/* Sub Heading */}
//         <div className="-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300">
//           With our online coding courses, you can learn at your own pace, from
//           anywhere in the world, and get access to a wealth of resources,
//           including hands-on projects, quizzes, and personalized feedback from
//           instructors.
//         </div>

//         {/* CTA Buttons */}
//         <div className="mt-8 flex flex-row gap-7">
//           <CTAButton active={true} linkto={"/signup"}>
//             Learn More
//           </CTAButton>
//           <CTAButton active={false} linkto={"/login"}>
//             Book a Demo
//           </CTAButton>
//         </div>

//         {/* Video */}
//         <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
//           <video
//             className="shadow-[20px_20px_rgba(255,255,255)]"
//             muted
//             loop
//             autoPlay
//           >
//             <source src={Banner} type="video/mp4" />
//           </video>
//         </div>

//         {/* Code Section 1  */}
//         <div>
//           <CodeBlocks
//             position={"lg:flex-row"}
//             heading={
//               <div className="text-4xl font-semibold">
//                 Unlock your
//                 <HighlightText text={"coding potential"} /> with our online
//                 courses.
//               </div>
//             }
//             subheading={
//               "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
//             }
//             ctabtn1={{
//               btnText: "Try it Yourself",
//               link: "/signup",
//               active: true,
//             }}
//             ctabtn2={{
//               btnText: "Learn More",
//               link: "/signup",
//               active: false,
//             }}
//             codeColor={"text-yellow-25"}
//             codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
//             backgroundGradient={<div className="codeblock1 absolute"></div>}
//           />
//         </div>

//         {/* Code Section 2 */}
//         <div>
//           <CodeBlocks
//             position={"lg:flex-row-reverse"}
//             heading={
//               <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
//                 Start
//                 <HighlightText text={"coding in seconds"} />
//               </div>
//             }
//             subheading={
//               "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
//             }
//             ctabtn1={{
//               btnText: "Continue Lesson",
//               link: "/signup",
//               active: true,
//             }}
//             ctabtn2={{
//               btnText: "Learn More",
//               link: "/signup",
//               active: false,
//             }}
//             codeColor={"text-white"}
//             codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
//             backgroundGradient={<div className="codeblock2 absolute"></div>}
//           />
//         </div>

//         {/* Explore Section */}
//         <ExploreMore />
//       </div>

//       {/* Section 2 */}
//       <div className="bg-pure-greys-5 text-richblack-700">
//         <div className="homepage_bg h-[320px]">
//           {/* Explore Full Catagory Section */}
//           <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
//             <div className="lg:h-[150px]"></div>
//             <div className="flex flex-row gap-7 text-white lg:mt-8">
//               <CTAButton active={true} linkto={"/signup"}>
//                 <div className="flex items-center gap-2">
//                   Explore Full Catalog
//                   <FaArrowRight />
//                 </div>
//               </CTAButton>
//               <CTAButton active={false} linkto={"/login"}>
//                 Learn More
//               </CTAButton>
//             </div>
//           </div>
//         </div>

//         <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">
//           {/* Job that is in Demand - Section 1 */}
//           <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
//             <div className="text-4xl font-semibold lg:w-[45%] ">
//               Get the skills you need for a{" "}
//               <HighlightText text={"job that is in demand."} />
//             </div>
//             <div className="flex flex-col items-start gap-10 lg:w-[40%]">
//               <div className="text-[16px]">
//                 The modern StudyNotion is the dictates its own terms. Today, to
//                 be a competitive specialist requires more than professional
//                 skills.
//               </div>
//               <CTAButton active={true} linkto={"/signup"}>
//                 <div className="">Learn More</div>
//               </CTAButton>
//             </div>
//           </div>

//           {/* Timeline Section - Section 2 */}
//           <TimelineSection />

//           {/* Learning Language Section - Section 3 */}
//           <LearningLanguageSection />
//         </div>
//       </div>

//       {/* Section 3 */}
//       <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
//         {/* Become a instructor section */}
//         <InstructorSection />

//         {/* Reviws from Other Learner */}
//         <h1 className="text-center text-4xl font-semibold mt-8">
//           Reviews from other learners
//         </h1>
//         <ReviewSlider />
//       </div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   )
// }

// export default Home



// import React from "react";
// import { FaArrowRight } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion"; // For animations
// import Banner from "../assets/Images/banner.mp4";
// import Footer from "../components/Common/Footer";
// import ReviewSlider from "../components/Common/ReviewSlider";
// import CTAButton from "../components/core/HomePage/Button";
// import CodeBlocks from "../components/core/HomePage/CodeBlocks";
// import ExploreMore from "../components/core/HomePage/ExploreMore";
// import HighlightText from "../components/core/HomePage/HighlightText";
// import InstructorSection from "../components/core/HomePage/InstructorSection";
// import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
// import TimelineSection from "../components/core/HomePage/Timeline";
// import VideoBanner from "../assets/Images/video.mp4";

// // Animation variants
// const sectionVariants = {
//   hidden: { opacity: 0, y: 50 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
// };
// const staggerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.2, delayChildren: 0.1 },
//   },
// };

// function Home() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-richblack-900 to-richblack-800 text-white">
//       {/* Section 1 */}
//       <motion.div
//         className="relative mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-12 py-12"
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.3 }}
//       >
//         {/* Become an Instructor Button */}
//         <motion.div variants={staggerVariants}>
//           <Link to="/signup">
//             <div className="mt-16 group mx-auto w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
//               <div className="flex flex-row items-center gap-2 rounded-full px-6 py-2 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-700 transition-colors duration-300">
//                 <p>Become an Instructor</p>
//                 <FaArrowRight />
//               </div>
//             </div>
//           </Link>
//         </motion.div>

//         {/* Heading */}
//         <motion.div
//           className="text-center text-4xl md:text-5xl font-semibold"
//           variants={staggerVariants}
//         >
//           Empower Your Future with
//           <HighlightText text={"Coding Skills"} />
//         </motion.div>

//         {/* Sub Heading */}
//         <motion.div
//           className="mt-3 text-center text-lg md:text-xl font-medium text-richblack-300 max-w-[70%] mx-auto"
//           variants={staggerVariants}
//         >
//           With our online coding courses, you can learn at your own pace, from
//           anywhere in the world, and get access to a wealth of resources,
//           including hands-on projects, quizzes, and personalized feedback from
//           instructors.
//         </motion.div>

//         {/* CTA Buttons */}
//         <motion.div className="mt-8 flex flex-col md:flex-row gap-6" variants={staggerVariants}>
//           <CTAButton active={true} linkto="/signup">
//             Learn More
//           </CTAButton>
//           <CTAButton active={false} linkto="/login">
//             Book a Demo
//           </CTAButton>
//         </motion.div>

//         {/* Video */}
//         <motion.div
//           className="mx-3 my-7 rounded-xl overflow-hidden shadow-2xl shadow-blue-200"
//           variants={staggerVariants}
//         >
//           <video
//             className="w-full h-auto object-cover"
//             muted
//             loop
//             autoPlay
//           >
//             <source src={VideoBanner} type="video/mp4" />
//           </video>
//         </motion.div>

//         {/* Code Section 1 */}
//         <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
//           <CodeBlocks
//             position="lg:flex-row"
//             heading={
//               <div className="text-4xl md:text-5xl font-semibold">
//                 Unlock your
//                 <HighlightText text={"coding potential"} /> with our online
//                 courses.
//               </div>
//             }
//             subheading={
//               "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
//             }
//             ctabtn1={{
//               btnText: "Try it Yourself",
//               link: "/signup",
//               active: true,
//             }}
//             ctabtn2={{
//               btnText: "Learn More",
//               link: "/signup",
//               active: false,
//             }}
//             codeColor="text-blue-400"
//             codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav><a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
//             backgroundGradient="linear-gradient(135deg, #1e3c72, #2a5298)"
//           />
//         </motion.div>

//         {/* Code Section 2 */}
//         <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
//           <CodeBlocks
//             position="lg:flex-row-reverse"
//             heading={
//               <div className="w-[100%] text-4xl md:text-5xl font-semibold lg:w-[50%]">
//                 Start
//                 <HighlightText text={"coding in seconds"} />
//               </div>
//             }
//             subheading={
//               "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
//             }
//             ctabtn1={{
//               btnText: "Continue Lesson",
//               link: "/signup",
//               active: true,
//             }}
//             ctabtn2={{
//               btnText: "Learn More",
//               link: "/signup",
//               active: false,
//             }}
//             codeColor="text-blue-400"
//             codeblock={`import React from "react";\nimport CTAButton from "./Button";\nimport TypeAnimation from "react-type-animation";\nimport { FaArrowRight } from "react-icons/fa";\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
//             backgroundGradient="linear-gradient(135deg, #1e3c72, #2a5298)"
//           />
//         </motion.div>
//       </motion.div>

//       {/* Section 2 */}
//       <motion.div
//         className="bg-gradient-to-b from-pure-greys-5 to-pure-greys-50 text-richblack-700 py-12"
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.3 }}
//       >
//         <div className="homepage_bg h-[320px] bg-cover bg-center">
//           <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-8">
//             <div className="lg:h-[150px]"></div>
//             <motion.div className="flex flex-col md:flex-row gap-6" variants={staggerVariants}>
//               <CTAButton active={true} linkto="/signup">
//                 <div className="flex items-center gap-2">
//                   Explore Full Catalog
//                   <FaArrowRight />
//                 </div>
//               </CTAButton>
//               <CTAButton active={false} linkto="/login">
//                 Learn More
//               </CTAButton>
//             </motion.div>
//           </div>
//         </div>

//         <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center gap-8 mt-12">
//           {/* Job that is in Demand - Section 1 */}
//           <motion.div
//             className="flex flex-col lg:flex-row justify-between gap-10"
//             variants={staggerVariants}
//           >
//             <div className="text-4xl md:text-5xl font-semibold lg:w-[45%]">
//               Get the skills you need for a{" "}
//               <HighlightText text={"job that is in demand."} />
//             </div>
//             <div className="flex flex-col items-start gap-6 lg:w-[40%]">
//               <div className="text-base md:text-lg">
//                 The modern StudyNotion is the dictates its own terms. Today, to
//                 be a competitive specialist requires more than professional
//                 skills.
//               </div>
//               <CTAButton active={true} linkto="/signup">
//                 <div>Learn More</div>
//               </CTAButton>
//             </div>
//           </motion.div>

//           {/* Timeline Section - Section 2 */}
//           <TimelineSection />

//           {/* Learning Language Section - Section 3 */}
//           <LearningLanguageSection />
//         </div>
//       </motion.div>

//       {/* Section 3 */}
//       <motion.div
//         className="relative mx-auto my-20 w-11/12 max-w-maxContent flex flex-col items-center gap-8 bg-gradient-to-b from-richblack-900 to-richblack-800 rounded-xl p-8 shadow-2xl"
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.3 }}
//       >
//         {/* Become a Instructor Section */}
//         <InstructorSection />

//         {/* Reviews from Other Learners */}
//         <motion.h1
//           className="text-center text-4xl md:text-5xl font-semibold mt-12"
//           variants={staggerVariants}
//         >
//           Reviews from other learners
//         </motion.h1>
//         <ReviewSlider />
//       </motion.div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }

// export default Home;


import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // For animations
import Banner from "../assets/Images/banner.mp4"; // Keeping original imports
import Footer from "../components/Common/Footer";
import ReviewSlider from "../components/Common/ReviewSlider";
import CTAButton from "../components/core/HomePage/Button";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import HighlightText from "../components/core/HomePage/HighlightText";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import TimelineSection from "../components/core/HomePage/Timeline";
import VideoBanner from "../assets/Images/video.mp4";
import HeroSection from "../components/core/HomePage/Hero";

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-richblack-900 to-richblack-800 text-white">
      {/* Section 1 - Hero Section */}
      <motion.div
        className="relative mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-12 pt-16 pb-24" // Increased top/bottom padding
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }} // Reduced amount for quicker animation trigger
      >
        {/* Become an Instructor Button */}
        {/* <motion.div variants={staggerVariants}>
          <Link to="/signup">
            <div className="mt-8 group mx-auto w-fit rounded-full bg-richblack-800 p-[1px] font-semibold text-richblack-200 shadow-[0_0px_60px_rgba(2,_6,_23,_0.5)] hover:shadow-blue-200/20 hover:scale-105 transition-all duration-500 cursor-pointer border border-blue-700/50">
              <div className="flex flex-row items-center gap-3 rounded-full px-6 py-2 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-700 transition-colors duration-300">
                <p className="text-sm">Become an Instructor</p>
                <FaArrowRight className="text-xs" />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Heading */}
        <HeroSection/>
        {/* Video */}
    
        {/* Code Section 1 */}
        <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          <CodeBlocks
            position="lg:flex-row"
            heading={
              <div className="text-4xl lg:text-5xl font-semibold leading-snug">
                Unlock your
                <HighlightText text={"coding potential"} /> with our online
                courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you. They mentor you through real-world applications."
            } // Enhanced subheading
            ctabtn1={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor="text-blue-400"
            codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>Codify</title>\n<style>\nbody { font-family: 'Arial', sans-serif; }\n.header { color: #1e3c72; }\n</style>\n</head>\n<body>\n<h1 class="header">Hello World!</h1></body>`} // Slightly refined code block
            backgroundGradient="linear-gradient(135deg, #1e3c72, #2a5298)"
          />
        </motion.div>

        {/* Code Section 2 */}
        <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          <CodeBlocks
            position="lg:flex-row-reverse"
            heading={
              <div className="w-full text-4xl lg:text-5xl font-semibold lg:w-[50%] leading-snug">
                Start
                <HighlightText text={"building in seconds"} /> {/* Updated text for action */}
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on, browser-based learning environment means you'll be writing real, executable code from your very first lesson. No complex setup required."
            } // Enhanced subheading
            ctabtn1={{
              btnText: "Continue Lesson",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Explore Courses", // Changed button text
              link: "/signup",
              active: false,
            }}
            codeColor="text-yellow-25" // Changed code color to introduce a slight variation within the richblack theme (assuming yellow-25 is a richblack secondary color)
            codeblock={`const express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => {\n  res.send('Welcome to CodeTech!');\n});\n\nconst PORT = 4000;\napp.listen(PORT, () => {\n  console.log('Server running on port');\n});`} // Changed code block content to backend example for variety
            backgroundGradient="linear-gradient(135deg, #2a5298, #1e3c72)" // Reversed gradient direction
          />

              <motion.div
          className="mx-3 my-16 w-full max-w-7xl rounded-2xl overflow-hidden shadow-[0_0_100px_0px] shadow-blue-400/30 border-2 border-richblack-700/50" // Enhanced shadow and added border
          variants={staggerVariants}
        >
          <video
            className="w-full h-auto object-cover"
            muted
            loop
            autoPlay
          >
            <source src={VideoBanner} type="video/mp4" />
          </video>
        </motion.div>


            <ExploreMore />
        </motion.div>
      </motion.div>

      {/* Section 2 - Catalog and Skills */}
      <motion.div
        className="bg-gradient-to-b from-pure-greys-5 to-pure-greys-50 text-richblack-700 py-20" // Increased vertical padding
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        
        <div className="homepage_bg h-[320px] bg-cover bg-center">
          <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-8">
            <div className="lg:h-[150px]">
              
               
            </div>
            <motion.div className="flex flex-col sm:flex-row gap-8" variants={staggerVariants}>
              <CTAButton active={true} linkto="/catalog"> {/* Linked to /catalog */}
                <div className="flex items-center gap-2 font-semibold">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto="/about"> {/* Linked to /about */}
                <div className="font-semibold text-white">Discover Our Story</div> {/* Updated button text */}
              </CTAButton>
            </motion.div>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center gap-16 mt-20"> {/* Increased gap and mt */}
          {/* Job that is in Demand - Section 1 */}
          <motion.div
            className="flex flex-col lg:flex-row justify-between gap-12"
            variants={staggerVariants}
          >
            <div className="text-4xl lg:text-5xl font-extrabold lg:w-[45%] tracking-tight"> {/* Heavier font */}
              Get the high-demand{" "}
              <HighlightText text={"skills employers crave."} /> {/* Updated text */}
            </div>
            <div className="flex flex-col items-start gap-8 lg:w-[45%]"> {/* Increased gap */}
              <div className="text-lg leading-relaxed"> {/* Better line height */}
                The modern tech landscape evolves fast. To be a competitive
                specialist, you need more than foundational knowledge—you need
                practical, up-to-date skills that translate directly into
                high-value careers.
              </div>
              <CTAButton active={true} linkto="/contact"> {/* Changed link to contact */}
                <div className="font-semibold">Contact Our Advisors</div> {/* Updated button text */}
              </CTAButton>
            </div>
          </motion.div>

          {/* Timeline Section - Section 2 */}
          <TimelineSection />

          {/* Learning Language Section - Section 3 */}
          <LearningLanguageSection />
          
          {/* Explore More Section (Added for better flow and hierarchy, assuming component exists) */}
       
        </div>
      </motion.div>

      {/* Section 3 - Instructor and Reviews */}
      <motion.div
        className="relative mx-auto my-24 w-11/12 max-w-maxContent flex flex-col items-center gap-16 bg-richblack-900 rounded-xl p-10 shadow-[0_0_100px_10px_rgba(45,212,255,0.1)]" // New shadow for separation
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Become a Instructor Section */}
        <InstructorSection />

        {/* Reviews from Other Learners */}
        <motion.h2
          className="text-center text-4xl lg:text-5xl font-extrabold mt-16 text-richblack-5" // Heavier font and better contrast
          variants={staggerVariants}
        >
          Trusted by learners worldwide
        </motion.h2>
        <div className="w-full py-8">
            <ReviewSlider />
        </div>
      </motion.div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;