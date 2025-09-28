import { FaArrowRight, FaStar, FaUserGraduate } from "react-icons/fa";
import { motion } from "framer-motion"; // For animations
import HighlightText from "../../core/HomePage/HighlightText";
import CTAButton from "../../core/HomePage/Button";
import studentImage from "../../../assets/Images/Student.png"; // Placeholder image
import videoBg from "../../../assets/Images/banner.mp4"; // Placeholder video
import { Link } from "react-router-dom";

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

const HeroSection = () => {
  return (
    <motion.div
      className="relative w-full max-w-maxContent mx-auto py-16 lg:py-24 bg-gradient-to-br from-richblack-900 to-richblack-800 text-white overflow-hidden"
      variants={staggerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      aria-label="Premium hero section for edtech platform"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover opacity-30"
          autoPlay
          muted
          loop
        >
          <source src={videoBg} type="video/mp4" />
        </video>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-blue-900/20 rounded-full blur-xl animate-pulse -z-10 hidden lg:block" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-300/20 rounded-full blur-xl animate-pulse -z-10 hidden lg:block" />

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Become an Instructor Button */}
        <motion.div variants={itemVariants}>
          <Link to="/signup">
            <div className="mt-12 lg:mt-16 group mx-auto w-fit rounded-full bg-richblack-800 p-[2px] font-semibold text-richblack-200 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 cursor-pointer border border-blue-700/50">
              <div className="flex flex-row items-center gap-3 rounded-full px-6 py-2.5 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-700 transition-colors duration-300">
                <p className="text-sm md:text-base">Become an Instructor</p>
                <FaArrowRight className="text-xs md:text-sm" />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Heading */}
        <motion.div
          className="mt-12 lg:mt-16 text-4xl lg:text-6xl font-extrabold leading-tight tracking-tight"
          variants={itemVariants}
        >
          <motion.p variants={itemVariants}>
            Empower Your Future with
          </motion.p>
          <HighlightText text={"Cutting-Edge Code"} />
        </motion.div>

        {/* Sub Heading */}
        <motion.div
          className="mt-6 text-base lg:text-xl font-medium text-richblack-300 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Master coding with expert-led courses. Learn at your pace, access
          hands-on projects, quizzes, and get{" "}
          <span className="text-yellow-300 font-semibold">personalized feedback</span>
          from industry pros worldwide.
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-10 flex flex-col lg:flex-row gap-8 text-white"
          variants={itemVariants}
        >
          <div className="flex items-center gap-2">
            <FaUserGraduate className="text-2xl text-blue-400" />
            <span className="text-lg font-bold">50K+ Students</span>
          </div>
          <div className="flex items-center gap-2">
            <FaStar className="text-2xl text-yellow-300" />
            <span className="text-lg font-bold">4.8/5 Rating</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row gap-6 justify-center"
          variants={itemVariants}
        >
          <CTAButton active={true} linkto="/signup">
            Start Learning Today
          </CTAButton>
          <CTAButton active={false} linkto="/login">
            Book a Free Demo
          </CTAButton>
        </motion.div>

        {/* Student Image */}
        <motion.div
          className="mt-12 lg:mt-16 w-full max-w-xs lg:max-w-md"
          variants={itemVariants}
        >
          <img
            src={studentImage}
            alt="Student learning coding"
            className="w-full h-auto rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
          />
        </motion.div>

        {/* Testimonial Callout */}
        <motion.div
          className="mt-12 text-sm lg:text-base text-richblack-300 max-w-lg mx-auto italic border-l-4 border-yellow-300 pl-4"
          variants={itemVariants}
        >
          "Transformed my career with personalized guidance—highly recommend!"
          <span className="block mt-2 font-semibold text-yellow-300">- John D.</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection;




//    <motion.div
//           className="text-center text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mt-6" // Heavier font, tighter line height for impact
//           variants={staggerVariants}
//         >
//           <motion.p variants={staggerVariants}>
//             Empower Your Future with
//           </motion.p>
//           <HighlightText text={"Cutting-Edge Code"} /> {/* Updated text for punch */}
//         </motion.div>

//         <motion.div
//           className="mt-4 text-center text-base lg:text-lg font-normal text-richblack-300 max-w-3xl mx-auto" // Slightly adjusted max-width for better centering
//           variants={staggerVariants}
//         >
//           Master online coding with expert-led courses. Learn at your own pace,
//           access a wealth of hands-on projects, quizzes, and receive **personalized feedback**
//           from industry professionals, no matter where you are in the world.
//         </motion.div>

     
//         <motion.div className="mt-10 flex flex-col sm:flex-row gap-6" variants={staggerVariants}>
//           <CTAButton active={true} linkto="/signup">
//             Start Learning Today
//           </CTAButton>
//           <CTAButton active={false} linkto="/login">
//             Book a Free Demo
//           </CTAButton>
//         </motion.div> 
