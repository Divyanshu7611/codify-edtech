// import { useEffect, useState } from "react"
// import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
// import { BsChevronDown } from "react-icons/bs"
// import { useSelector } from "react-redux"
// import { Link, matchPath, useLocation } from "react-router-dom"

// import logo from "../../assets/Logo/Logo-Full-Light.png"
// import { NavbarLinks } from "../../data/navbar-links"
// import { apiConnector } from "../../services/apiConnector"
// import { categories } from "../../services/apis"
// import { ACCOUNT_TYPE } from "../../utils/constants"
// import ProfileDropdown from "../core/Auth/ProfileDropdown"

// // const subLinks = [
// //   {
// //     title: "Python",
// //     link: "/catalog/python",
// //   },
// //   {
// //     title: "javascript",
// //     link: "/catalog/javascript",
// //   },
// //   {
// //     title: "web-development",
// //     link: "/catalog/web-development",
// //   },
// //   {
// //     title: "Android Development",
// //     link: "/catalog/Android Development",
// //   },
// // ];

// function Navbar() {
//   const { token } = useSelector((state) => state.auth)
//   const { user } = useSelector((state) => state.profile)
//   const { totalItems } = useSelector((state) => state.cart)
//   const location = useLocation()

//   const [subLinks, setSubLinks] = useState([])
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     ;(async () => {
//       setLoading(true)
//       try {
//         const res = await apiConnector("GET", categories.CATEGORIES_API)
//         setSubLinks(res.data.data)
//       } catch (error) {
//         console.log("Could not fetch Categories.", error)
//       }
//       setLoading(false)
//     })()
//   }, [])

//   // console.log("sub links", subLinks)

//   const matchRoute = (route) => {
//     return matchPath({ path: route }, location.pathname)
//   }

//   return (
//     <div
//       className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
//         location.pathname !== "/" ? "bg-richblack-800" : ""
//       } transition-all duration-200`}
//     >
//       <div className="flex w-11/12 max-w-maxContent items-center justify-between">
//         {/* Logo */}
//         <Link to="/">
//           <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
//         </Link>
//         {/* Navigation links */}
//         <nav className="hidden md:block">
//           <ul className="flex gap-x-6 text-richblack-25">
//             {NavbarLinks.map((link, index) => (
//               <li key={index}>
//                 {link.title === "Catalog" ? (
//                   <>
//                     <div
//                       className={`group relative flex cursor-pointer items-center gap-1 ${
//                         matchRoute("/catalog/:catalogName")
//                           ? "text-yellow-25"
//                           : "text-richblack-25"
//                       }`}
//                     >
//                       <p>{link.title}</p>
//                       <BsChevronDown />
//                       <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
//                         <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
//                         {loading ? (
//                           <p className="text-center">Loading...</p>
//                         ) : subLinks.length ? (
//                           <>
//                             {subLinks
//                               ?.filter(
//                                 (subLink) => subLink?.courses?.length > 0
//                               )
//                               ?.map((subLink, i) => (
//                                 <Link
//                                   to={`/catalog/${subLink.name
//                                     .split(" ")
//                                     .join("-")
//                                     .toLowerCase()}`}
//                                   className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
//                                   key={i}
//                                 >
//                                   <p>{subLink.name}</p>
//                                 </Link>
//                               ))}
//                           </>
//                         ) : (
//                           <p className="text-center">No Courses Found</p>
//                         )}
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   <Link to={link?.path}>
//                     <p
//                       className={`${
//                         matchRoute(link?.path)
//                           ? "text-yellow-25"
//                           : "text-richblack-25"
//                       }`}
//                     >
//                       {link.title}
//                     </p>
//                   </Link>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </nav>
//         {/* Login / Signup / Dashboard */}
//         <div className="hidden items-center gap-x-4 md:flex">
//           {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
//             <Link to="/dashboard/cart" className="relative">
//               <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
//               {totalItems > 0 && (
//                 <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
//                   {totalItems}
//                 </span>
//               )}
//             </Link>
//           )}
//           {token === null && (
//             <Link to="/login">
//               <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
//                 Log in
//               </button>
//             </Link>
//           )}
//           {token === null && (
//             <Link to="/signup">
//               <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
//                 Sign up
//               </button>
//             </Link>
//           )}
//           {token !== null && <ProfileDropdown />}
//         </div>
//         <button className="mr-4 md:hidden">
//           <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Navbar



// import { useEffect, useState } from "react";
// import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
// import { BsChevronDown } from "react-icons/bs";
// import { useSelector } from "react-redux";
// import { Link, matchPath, useLocation } from "react-router-dom";

// import logo from "../../assets/Logo/Logo-Full-Light.png";
// import { NavbarLinks } from "../../data/navbar-links";
// import { apiConnector } from "../../services/apiConnector";
// import { categories } from "../../services/apis";
// import { ACCOUNT_TYPE } from "../../utils/constants";
// import ProfileDropdown from "../core/Auth/ProfileDropdown";

// function Navbar() {
//   const { token } = useSelector((state) => state.auth);
//   const { user } = useSelector((state) => state.profile);
//   const { totalItems } = useSelector((state) => state.cart);
//   const location = useLocation();

//   const [subLinks, setSubLinks] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     (async () => {
//       setLoading(true);
//       try {
//         const res = await apiConnector("GET", categories.CATEGORIES_API);
//         setSubLinks(res.data.data);
//       } catch (error) {
//         console.log("Could not fetch Categories.", error);
//       }
//       setLoading(false);
//     })();
//   }, []);

//   const matchRoute = (route) => {
//     return matchPath({ path: route }, location.pathname);
//   };

//   return (
//     <div
//       className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
//         location.pathname !== "/" ? "bg-richblack-800" : ""
//       } transition-all duration-200`}
//     >
//       <div className="flex w-11/12 max-w-maxContent items-center justify-between">
//         {/* Logo */}
//         <Link to="/">
//           <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
//         </Link>
//         {/* Navigation links */}
//         <nav className="hidden md:block">
//           <ul className="flex gap-x-6 text-richblack-25">
//             {NavbarLinks.map((link, index) => (
//               <li key={index}>
//                 {link.title === "Catalog" ? (
//                   <>
//                     <div
//                       className={`group relative flex cursor-pointer items-center gap-1 ${
//                         matchRoute("/catalog/:catalogName")
//                           ? "text-yellow-25"
//                           : "text-richblack-25"
//                       }`}
//                     >
//                       <p>{link.title}</p>
//                       <BsChevronDown />
//                       <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
//                         <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
//                         {loading ? (
//                           <p className="text-center">Loading...</p>
//                         ) : subLinks?.length > 0 ? (
//                           subLinks
//                             .filter((subLink) => subLink?.courses?.length > 0)
//                             .map((subLink, i) => (
//                               <Link
//                                 to={`/catalog/${subLink.name
//                                   .split(" ")
//                                   .join("-")
//                                   .toLowerCase()}`}
//                                 className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
//                                 key={i}
//                               >
//                                 <p>{subLink.name}</p>
//                               </Link>
//                             ))
//                         ) : (
//                           <p className="text-center">No Courses Found</p>
//                         )}
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   <Link to={link?.path}>
//                     <p
//                       className={`${
//                         matchRoute(link?.path)
//                           ? "text-yellow-25"
//                           : "text-richblack-25"
//                       }`}
//                     >
//                       {link.title}
//                     </p>
//                   </Link>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </nav>
//         {/* Login / Signup / Dashboard */}
//         <div className="hidden items-center gap-x-4 md:flex">
//           {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
//             <Link to="/dashboard/cart" className="relative">
//               <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
//               {totalItems > 0 && (
//                 <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
//                   {totalItems}
//                 </span>
//               )}
//             </Link>
//           )}
//           {token === null && (
//             <Link to="/login">
//               <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
//                 Log in
//               </button>
//             </Link>
//           )}
//           {token === null && (
//             <Link to="/signup">
//               <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
//                 Sign up
//               </button>
//             </Link>
//           )}
//           {token !== null && <ProfileDropdown />}
//         </div>
//         <button className="mr-4 md:hidden">
//           <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Navbar;



// import { useEffect, useState } from "react";
// import { AiOutlineMenu, AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
// import { BsChevronDown } from "react-icons/bs";
// import { useSelector } from "react-redux";
// import { Link, matchPath, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// import logo from "../../assets/Logo/codify.png";
// import { NavbarLinks } from "../../data/navbar-links";
// import { apiConnector } from "../../services/apiConnector";
// import { categories } from "../../services/apis";
// import { ACCOUNT_TYPE } from "../../utils/constants";
// import ProfileDropdown from "../core/Auth/ProfileDropdown";

// // Animation variants
// const navVariants = {
//   hidden: { opacity: 0, y: -20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
// };
// const dropdownVariants = {
//   hidden: { opacity: 0, y: 10 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
// };
// const mobileMenuVariants = {
//   hidden: { opacity: 0, x: "100%" },
//   visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
// };

// function Navbar() {
//   const { token } = useSelector((state) => state.auth);
//   const { user } = useSelector((state) => state.profile);
//   const { totalItems } = useSelector((state) => state.cart);
//   const location = useLocation();

//   const [subLinks, setSubLinks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [openCatalog, setOpenCatalog] = useState(false); // for accordion style dropdown in mobile

//   useEffect(() => {
//     (async () => {
//       setLoading(true);
//       try {
//         const res = await apiConnector("GET", categories.CATEGORIES_API);
//         setSubLinks(res.data.data);
//       } catch (error) {
//         console.log("Could not fetch Categories.", error);
//       }
//       setLoading(false);
//     })();
//   }, []);

//   const matchRoute = (route) => {
//     return matchPath({ path: route }, location.pathname);
//   };

//   return (
//     <motion.div
//       className="fixed top-0 left-0 w-full z-50 flex h-16 items-center justify-center border-b border-richblack-700 bg-gradient-to-r from-richblack-900 to-richblack-800 shadow-lg backdrop-blur-md transition-all duration-200"
//       variants={navVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       <div className="flex w-11/12 max-w-maxContent items-center justify-between">
//         {/* Logo */}
//         <Link to="/">
//           <motion.img
//             src={logo}
//             alt="Logo"
//             width={140}
//             height={32}
//             loading="lazy"
//             className="hover:scale-105 transition-transform duration-300"
//             whileHover={{ scale: 1.05 }}
//           />
//         </Link>

//         {/* Desktop Nav */}
//         <nav className="hidden md:block">
//           <ul className="flex gap-x-6 text-richblack-25">
//             {NavbarLinks.map((link, index) => (
//               <li key={index}>
//                 {link.title === "Catalog" ? (
//                   <div className="relative group">
//                     <div
//                       className={`flex cursor-pointer items-center gap-1 ${
//                         matchRoute("/catalog/:catalogName")
//                           ? "text-yellow-25"
//                           : "text-richblack-25"
//                       } hover:text-yellow-100 transition-colors duration-200`}
//                     >
//                       <p>{link.title}</p>
//                       <BsChevronDown />
//                     </div>
//                     <AnimatePresence>
//                       <motion.div
//                         className="invisible absolute left-[50%] top-[100%] z-[1000] w-[220px] translate-x-[-50%] translate-y-2 flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 group-hover:visible group-hover:translate-y-3 group-hover:opacity-100 lg:w-[300px]"
//                         variants={dropdownVariants}
//                         initial="hidden"
//                         animate="visible"
//                         exit="hidden"
//                       >
//                         {loading ? (
//                           <p className="text-center">Loading...</p>
//                         ) : subLinks?.length > 0 ? (
//                           subLinks
//                             .filter((subLink) => subLink?.courses?.length > 0)
//                             .map((subLink, i) => (
//                               <Link
//                                 to={`/catalog/${subLink.name
//                                   .split(" ")
//                                   .join("-")
//                                   .toLowerCase()}`}
//                                 className="block rounded-md py-2 px-3 hover:bg-richblack-50 hover:text-blue-400 transition-colors duration-200"
//                                 key={i}
//                               >
//                                 {subLink.name}
//                               </Link>
//                             ))
//                         ) : (
//                           <p className="text-center">No Courses Found</p>
//                         )}
//                       </motion.div>
//                     </AnimatePresence>
//                   </div>
//                 ) : (
//                   <Link to={link?.path}>
//                     <p
//                       className={`${
//                         matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"
//                       } hover:text-yellow-100 transition-colors duration-200`}
//                     >
//                       {link.title}
//                     </p>
//                   </Link>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </nav>

//         {/* Desktop Auth/Cart */}
//         <div className="hidden items-center gap-x-4 md:flex">
//           {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
//             <Link to="/dashboard/cart" className="relative group">
//               <AiOutlineShoppingCart className="text-2xl text-richblack-100 hover:text-yellow-100 transition-colors duration-200" />
//               {totalItems > 0 && (
//                 <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-blue-600 text-xs font-bold text-white group-hover:bg-yellow-100 group-hover:text-richblack-800 transition-colors duration-200">
//                   {totalItems}
//                 </span>
//               )}
//             </Link>
//           )}
//           {token === null && (
//             <>
//               <Link to="/login">
//                 <button className="rounded-md border border-richblack-700 bg-richblack-800 px-4 py-2 text-richblack-100 hover:bg-blue-900 hover:text-white transition-colors duration-200">
//                   Log in
//                 </button>
//               </Link>
//               <Link to="/signup">
//                 <button className="rounded-md border border-richblack-700 bg-richblack-800 px-4 py-2 text-richblack-100 hover:bg-blue-900 hover:text-white transition-colors duration-200">
//                   Sign up
//                 </button>
//               </Link>
//             </>
//           )}
//           {token !== null && <ProfileDropdown />}
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-richblack-100 hover:text-yellow-100 transition-colors duration-200"
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         >
//           {isMobileMenuOpen ? <AiOutlineClose fontSize={24} /> : <AiOutlineMenu fontSize={24} />}
//         </button>

//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {isMobileMenuOpen && (
//             <motion.div
//               className="fixed top-0 right-0 h-screen w-4/5 max-w-xs bg-richblack-900 p-6 md:hidden z-[2000] shadow-lg flex flex-col"
//               variants={mobileMenuVariants}
//               initial="hidden"
//               animate="visible"
//               exit="hidden"
//             >
//               {/* Header */}
//               <div className="flex items-center justify-between mb-6">
//                 <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
//                   <img src={logo} alt="Logo" className="h-10" />
//                 </Link>
//                 <AiOutlineClose
//                   className="text-2xl text-richblack-100 hover:text-yellow-100 cursor-pointer"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 />
//               </div>

//               {/* Links */}
//               <ul className="flex flex-col gap-4 text-richblack-25 overflow-y-auto">
//                 {NavbarLinks.map((link, index) => (
//                   <li key={index}>
//                     {link.title === "Catalog" ? (
//                       <div>
//                         <button
//                           className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left hover:bg-richblack-800"
//                           onClick={() => setOpenCatalog(!openCatalog)}
//                         >
//                           <span
//                             className={`${
//                               matchRoute("/catalog/:catalogName") ? "text-yellow-25" : ""
//                             }`}
//                           >
//                             {link.title}
//                           </span>
//                           <BsChevronDown
//                             className={`transition-transform duration-300 ${
//                               openCatalog ? "rotate-180" : ""
//                             }`}
//                           />
//                         </button>
//                         <AnimatePresence>
//                           {openCatalog && (
//                             <motion.div
//                               variants={dropdownVariants}
//                               initial="hidden"
//                               animate="visible"
//                               exit="hidden"
//                               className="pl-4 mt-2 flex flex-col gap-2"
//                             >
//                               {loading ? (
//                                 <p className="text-center">Loading...</p>
//                               ) : subLinks?.length > 0 ? (
//                                 subLinks
//                                   .filter((subLink) => subLink?.courses?.length > 0)
//                                   .map((subLink, i) => (
//                                     <Link
//                                       to={`/catalog/${subLink.name
//                                         .split(" ")
//                                         .join("-")
//                                         .toLowerCase()}`}
//                                       className="block py-2 px-3 rounded-md hover:bg-richblack-700 hover:text-blue-400"
//                                       key={i}
//                                       onClick={() => setIsMobileMenuOpen(false)}
//                                     >
//                                       {subLink.name}
//                                     </Link>
//                                   ))
//                               ) : (
//                                 <p className="text-center">No Courses Found</p>
//                               )}
//                             </motion.div>
//                           )}
//                         </AnimatePresence>
//                       </div>
//                     ) : (
//                       <Link
//                         to={link?.path}
//                         className={`block rounded-md px-2 py-2 ${
//                           matchRoute(link?.path) ? "text-yellow-25" : ""
//                         } hover:bg-richblack-800 hover:text-yellow-100`}
//                         onClick={() => setIsMobileMenuOpen(false)}
//                       >
//                         {link.title}
//                       </Link>
//                     )}
//                   </li>
//                 ))}
//               </ul>

//               {/* Footer buttons */}
//               <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-richblack-700">
//                 {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
//                   <Link
//                     to="/dashboard/cart"
//                     className="relative flex items-center gap-2 rounded-md px-3 py-2 hover:bg-richblack-800"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                   >
//                     <AiOutlineShoppingCart className="text-xl text-richblack-100" />
//                     <span>Cart</span>
//                     {totalItems > 0 && (
//                       <span className="ml-auto grid h-5 w-5 place-items-center rounded-full bg-blue-600 text-xs font-bold text-white">
//                         {totalItems}
//                       </span>
//                     )}
//                   </Link>
//                 )}
//                 {token === null ? (
//                   <>
//                     <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
//                       <button className="w-full rounded-md border border-richblack-700 bg-richblack-800 px-4 py-2 text-richblack-100 hover:bg-blue-900 hover:text-white">
//                         Log in
//                       </button>
//                     </Link>
//                     <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
//                       <button className="w-full rounded-md border border-richblack-700 bg-richblack-800 px-4 py-2 text-richblack-100 hover:bg-blue-900 hover:text-white">
//                         Sign up
//                       </button>
//                     </Link>
//                   </>
//                 ) : (
//                   <ProfileDropdown onClose={() => setIsMobileMenuOpen(false)} />
//                 )}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </motion.div>
//   );
// }

// export default Navbar;



import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import logo from "../../assets/Logo/codify.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/ProfileDropdown";

// Animation variants
const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const dropdownVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};
const mobileMenuVariants = {
  hidden: { opacity: 0, x: "100%" },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openCatalog, setOpenCatalog] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(res.data.data);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  }, []);

  const matchRoute = (route) => matchPath({ path: route }, location.pathname);

  return (
    <motion.div
      className={`fixed top-0 left-0 w-full z-50 flex h-16 items-center justify-center transition-all duration-200 ${
        isMobileMenuOpen
          ? "bg-transparent border-none"
          : "bg-gradient-to-r from-richblack-900 to-richblack-800 border-b border-richblack-700 shadow-lg backdrop-blur-md"
      }`}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* ✅ Hide desktop content when mobile menu is open */}
        {!isMobileMenuOpen && (
          <>
            {/* Logo */}
            <Link to="/">
              <motion.img
                src={logo}
                alt="Logo"
                width={140}
                height={32}
                loading="lazy"
                className="hover:scale-105 transition-transform duration-300"
                whileHover={{ scale: 1.05 }}
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:block">
              <ul className="flex gap-x-6 text-richblack-25">
                {NavbarLinks.map((link, index) => (
                  <li key={index}>
                    {link.title === "Catalog" ? (
                      <div className="relative group">
                        <div
                          className={`flex cursor-pointer items-center gap-1 ${
                            matchRoute("/catalog/:catalogName")
                              ? "text-yellow-25"
                              : "text-richblack-25"
                          } hover:text-yellow-100 transition-colors duration-200`}
                        >
                          <p>{link.title}</p>
                          <BsChevronDown />
                        </div>
                        {/* Desktop Catalog Dropdown */}
                        <AnimatePresence>
                          <motion.div
                            className="invisible absolute left-[50%] top-[100%] z-[1000] w-[220px] translate-x-[-50%] translate-y-2 flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 group-hover:visible group-hover:translate-y-3 group-hover:opacity-100 lg:w-[300px]"
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                          >
                            {loading ? (
                              <p className="text-center">Loading...</p>
                            ) : subLinks?.length > 0 ? (
                              subLinks
                                .filter((subLink) => subLink?.courses?.length > 0)
                                .map((subLink, i) => (
                                  <Link
                                    to={`/catalog/${subLink.name
                                      .split(" ")
                                      .join("-")
                                      .toLowerCase()}`}
                                    className="block rounded-md py-2 px-3 hover:bg-richblack-50 hover:text-blue-400 transition-colors duration-200"
                                    key={i}
                                  >
                                    {subLink.name}
                                  </Link>
                                ))
                            ) : (
                              <p className="text-center">No Courses Found</p>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link to={link?.path}>
                        <p
                          className={`${
                            matchRoute(link?.path)
                              ? "text-yellow-25"
                              : "text-richblack-25"
                          } hover:text-yellow-100 transition-colors duration-200`}
                        >
                          {link.title}
                        </p>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Desktop Auth/Cart */}
            <div className="hidden items-center gap-x-4 md:flex">
              {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                <Link to="/dashboard/cart" className="relative group">
                  <AiOutlineShoppingCart className="text-2xl text-richblack-100 hover:text-yellow-100 transition-colors duration-200" />
                  {totalItems > 0 && (
                    <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-blue-600 text-xs font-bold text-white group-hover:bg-yellow-100 group-hover:text-richblack-800 transition-colors duration-200">
                      {totalItems}
                    </span>
                  )}
                </Link>
              )}
              {token === null ? (
                <>
                  <Link to="/login">
                    <button className="rounded-md border border-richblack-700 bg-richblack-800 px-4 py-2 text-richblack-100 hover:bg-blue-900 hover:text-white transition-colors duration-200">
                      Log in
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="rounded-md border border-richblack-700 bg-richblack-800 px-4 py-2 text-richblack-100 hover:bg-blue-900 hover:text-white transition-colors duration-200">
                      Sign up
                    </button>
                  </Link>
                </>
              ) : (
                <ProfileDropdown />
              )}
            </div>
          </>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-richblack-100 hover:text-yellow-100 transition-colors duration-200"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <div></div> : <AiOutlineMenu fontSize={24} />}
        </button>
      </div>

      {/* Mobile Sidenav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed top-0 right-0 h-screen w-4/5 max-w-xs bg-richblack-900 p-6 md:hidden z-[2000] shadow-lg flex flex-col"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                <img src={logo} alt="Logo" className="h-10" />
              </Link>
              <AiOutlineClose
                className="text-2xl text-richblack-100 hover:text-yellow-100 cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            </div>

            {/* Links */}
            <ul className="flex flex-col gap-4 text-richblack-25 overflow-y-auto">
              {NavbarLinks.map((link, index) => (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div>
                      <button
                        className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left hover:bg-richblack-800"
                        onClick={() => setOpenCatalog(!openCatalog)}
                      >
                        <span
                          className={`${
                            matchRoute("/catalog/:catalogName") ? "text-yellow-25" : ""
                          }`}
                        >
                          {link.title}
                        </span>
                        <BsChevronDown
                          className={`transition-transform duration-300 ${openCatalog ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence>
                        {openCatalog && (
                          <motion.div
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="pl-4 mt-2 flex flex-col gap-2"
                          >
                            {loading ? (
                              <p className="text-center">Loading...</p>
                            ) : subLinks?.length > 0 ? (
                              subLinks
                                .filter((subLink) => subLink?.courses?.length > 0)
                                .map((subLink, i) => (
                                  <Link
                                    to={`/catalog/${subLink.name
                                      .split(" ")
                                      .join("-")
                                      .toLowerCase()}`}
                                    className="block py-2 px-3 rounded-md hover:bg-richblack-700 hover:text-blue-400"
                                    key={i}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    {subLink.name}
                                  </Link>
                                ))
                            ) : (
                              <p className="text-center">No Courses Found</p>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={link?.path}
                      className={`block rounded-md px-2 py-2 ${
                        matchRoute(link?.path) ? "text-yellow-25" : ""
                      } hover:bg-richblack-800 hover:text-yellow-100`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Mobile Profile & Footer buttons */}
            <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-richblack-700">
              {token ? (
                <ProfileDropdown onClose={() => setIsMobileMenuOpen(false)} />
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full rounded-md border border-richblack-700 bg-richblack-800 px-4 py-2 text-richblack-100 hover:bg-blue-900 hover:text-white">
                      Log in
                    </button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full rounded-md border border-richblack-700 bg-richblack-800 px-4 py-2 text-richblack-100 hover:bg-blue-900 hover:text-white">
                      Sign up
                    </button>
                  </Link>
                </>
              )}
              {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                <Link
                  to="/dashboard/cart"
                  className="relative flex items-center gap-2 rounded-md px-3 py-2 hover:bg-richblack-800"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <AiOutlineShoppingCart className="text-xl text-richblack-100" />
                  <span>Cart</span>
                  {totalItems > 0 && (
                    <span className="ml-auto grid h-5 w-5 place-items-center rounded-full bg-blue-600 text-xs font-bold text-white">
                      {totalItems}
                    </span>
                  )}
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Navbar;
