import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const NavBar = () => {

  const [isDark, setIsDark] = useState(true);

  function handleTheme() {

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setIsDark(!isDark);
  }

  return (

    <div className="w-full flex justify-center px-2 sm:px-4 pt-2 sm:pt-4">

      <div className="w-full max-w-6xl flex items-center justify-between bg-[#111827]/95 dark:bg-blue-600 backdrop-blur-xl border border-gray-700 dark:border-blue-400 px-3 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-2xl dark:shadow-blue-200 transition-all duration-300">

        {/* LEFT */}
        <div className="flex items-center">
          <h1 className="text-xl sm:text-3xl font-black tracking-tight select-none">
            <span className="text-cyan-400 ">Paste</span>
            <span className="text-white ">X</span>
          </h1>
        </div>

        {/* CENTER LINKS */}
        <div className="flex items-center gap-2 sm:gap-3">
          <NavLink to="/" className={({ isActive }) =>
            `px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-medium transition-all duration-300 ${isActive
              ? "bg-cyan-500 dark:bg-white text-white dark:text-blue-600 shadow-lg scale-105"
              : "text-white hover:bg-[#1f2937] dark:hover:bg-blue-500/40"
            }`
          }
          >Home</NavLink>

          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              `px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-medium transition-all duration-300 ${isActive
                ? "bg-cyan-500 dark:bg-white text-white dark:text-blue-600 shadow-lg scale-105"
                : "text-white hover:bg-[#1f2937] dark:hover:bg-blue-500/40"
              }`
            }
          >
            Pastes
          </NavLink>

        </div>

        {/* RIGHT */}
        <div className="flex items-center">

          <button
            onClick={handleTheme}
            className="relative flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-[#25262b] dark:bg-blue-100 border border-gray-700 dark:border-blue-300 shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer overflow-hidden group"
          >

            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent dark:from-blue-500/20 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

            {/* Icon */}
            <FontAwesomeIcon
              icon={isDark ? faSun : faMoon}
              className={`text-xs sm:text-lg transition-all duration-500 ${isDark
                ? "text-yellow-400 rotate-180 scale-110"
                : "text-[#16171d]"
                }`}
            />

          </button>

        </div>

      </div>

    </div>
  );
};

export default NavBar;