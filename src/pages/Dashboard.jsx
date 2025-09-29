// import { useSelector } from "react-redux"
// import { Outlet } from "react-router-dom"

// import Sidebar from "../components/core/Dashboard/Sidebar"

// function Dashboard() {
//   const { loading: profileLoading } = useSelector((state) => state.profile)
//   const { loading: authLoading } = useSelector((state) => state.auth)

//   if (profileLoading || authLoading) {
//     return (
//       <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//         <div className="spinner"></div>
//       </div>
//     )
//   }

//   return (
//     <div className="relative flex min-h-[calc(100vh-3.5rem)] mt-16">
//       <Sidebar />
//       <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
//         <div className="mx-auto w-11/12 max-w-[1000px] py-10">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Dashboard


import { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

import Sidebar from "../components/core/Dashboard/Sidebar";

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] mt-16">
      {/* Hamburger Button for Mobile */}
      <button
        className="
          fixed top-4 left-4 z-50 md:hidden flex items-center justify-center
          w-12 h-12 bg-yellow-100 text-richblack-900 rounded-full shadow-lg
          hover:bg-yellow-200 transition-colors duration-300
        "
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <AiOutlineClose className="text-2xl" /> : <AiOutlineMenu className="text-2xl" />}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-richblack-900 shadow-lg z-40 transform transition-transform duration-300
          md:relative md:translate-x-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar onLinkClick={() => setIsSidebarOpen(false)} />
      </div>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 md:ml-64 h-[calc(100vh-3.5rem)] overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
