import { NavLink } from "react-router-dom"

const NavBar = () => {
  return (
    <div className="w-full flex justify-center ">

      <div className="w-full flex items-center justify-center gap-4 bg-[#111827] border border-gray-700 px-6 py-3 shadow-lg">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
              ? "bg-cyan-500 text-white shadow-md"
              : "text-white hover:bg-[#1f2937]"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/pastes"
          className={({ isActive }) =>
            `px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
              ? "bg-cyan-500 text-white shadow-md"
              : "text-white hover:bg-[#1f2937]"
            }`
          }
        >
          Paste
        </NavLink>

      </div>
    </div>
  )
}

export default NavBar
