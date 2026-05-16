import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare, faEye, faCopy, faCalendar, faShareFromSquare, } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
// import { faCopy } from "@fortawesome/free-regular-svg-icons";

// import { useNavigate } from "react-router-dom";

const Paste = () => {
    const pastes = useSelector((state) => state.paste.pastes)
    // console.log(pastes);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    // const navigate=useNavigate()
    const filteredData = pastes.filter((paste) => {
        return paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    })
    function handleDelete(pasteId) {
        dispatch(removeFromPastes(pasteId))
    }

    function handleCopy(paste) {
        navigator.clipboard.writeText(paste.content)
        toast.success("Copied to clickboard")
    }

    return (
        <div className="mx-4">
            <div className="relative w-full my-4">

                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
                />

                <input
                    type="search"
                    value={searchTerm}
                    placeholder="Search your paste..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-12 rounded-xl bg-[#16171d] dark:bg-[#f5f7fb] border border-gray-700 dark:border-blue-300 pl-11 pr-4 text-sm text-white dark:text-black placeholder:text-gray-500 dark:placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-cyan-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-cyan-500/20 dark:focus:ring-blue-500/20"
                />
            </div>
            {/* <button className="bg-black pl-4 p-2 rounded-2xl" onClick={handleFilter}>Search</button> */}
            <div className="flex flex-col border border-gray-700 dark:border-blue-300 bg-[#16171d] dark:bg-[#f5f7fb] my-4 rounded-[0.4rem] transition-all duration-300">

                <h1 className="p-4 text-4xl font-bold border-b border-gray-700 dark:border-blue-300 flex items-start text-white dark:text-[#16171d] transition-all duration-300">
                    All Pastes
                </h1>

                {
                    filteredData.length > 0 &&
                    filteredData.map((paste) => {
                        return (

                            <div
                                key={paste._id}
                                className="rounded-xl p-6 hover:border-cyan-500 dark:hover:border-blue-400 transition-all duration-300"
                            >

                                <div className="border border-gray-700 dark:border-blue-300 bg-[#1b1d23] dark:bg-white w-full gap-y-6 justify-between flex flex-col sm:flex-row p-4 rounded-[0.5rem] shadow-lg dark:shadow-md transition-all duration-300">

                                    {/* LEFT SIDE */}
                                    <div className="flex flex-col space-y-3 items-start">

                                        {/* TITLE */}
                                        <h1 className="text-5xl font-bold text-white dark:text-[#16171d] m-px transition-all duration-300">
                                            {paste.title}
                                        </h1>

                                        {/* CONTENT */}
                                        <p className="text-xs font-normal text-[#c5c4c4] dark:text-gray-600 max-w-[80%] mt-3 leading-6 line-clamp-3 w-full break-words text-left transition-all duration-300" style={{ marginTop: "12px" }}>
                                            {paste.content}
                                        </p>
                                    </div>

                                    {/* RIGHT SIDE */}
                                    <div className="flex flex-col gap-y-4 sm:items-end">

                                        {/* ICONS */}
                                        <div className="flex gap-2 flex-wrap sm:flex-nowrap">

                                            {/* EDIT */}
                                            <div className="relative group">
                                                <button className="p-2 rounded border border-gray-600 dark:border-blue-300 hover:border-cyan-500 dark:hover:border-blue-500 transition-all cursor-pointer">

                                                    <NavLink to={`/?pastes=${paste._id}`}>
                                                        <FontAwesomeIcon
                                                            icon={faPenToSquare}
                                                            className="text-white dark:text-[#111827] group-hover:text-cyan-500 dark:group-hover:text-blue-500 transition-all"
                                                        />
                                                    </NavLink>

                                                </button>

                                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-gray-800 dark:bg-blue-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                                    Edit
                                                </span>
                                            </div>

                                            {/* DELETE */}
                                            <div className="relative group">

                                                <button
                                                    onClick={() => handleDelete(paste?._id)}
                                                    className="p-2 rounded border border-gray-600 dark:border-blue-300 hover:border-red-400 transition-all cursor-pointer"
                                                >

                                                    <FontAwesomeIcon
                                                        icon={faTrashCan}
                                                        className="text-white dark:text-[#111827] group-hover:text-red-400 transition-all"
                                                    />

                                                </button>

                                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-gray-800 dark:bg-blue-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                                    Delete
                                                </span>
                                            </div>

                                            {/* SHARE */}
                                            <div className="relative group">

                                                <Popup
                                                    trigger={
                                                        <button className="p-2 rounded border border-gray-600 dark:border-blue-300 hover:border-orange-500 dark:hover:border-orange-500 transition-all cursor-pointer">

                                                            <FontAwesomeIcon
                                                                icon={faShareFromSquare}
                                                                className="text-white dark:text-[#111827] group-hover:text-orange-500"
                                                            />

                                                        </button>
                                                    }

                                                    modal
                                                    nested

                                                    contentStyle={{
                                                        background: "transparent",
                                                        border: "none",
                                                        padding: "0",
                                                        width: "400px",
                                                        borderRadius: "16px"
                                                    }}
                                                >

                                                    {
                                                        close => (

                                                            <div className="bg-[#111827] dark:bg-white p-6 rounded-xl border border-gray-700 dark:border-blue-300 w-[100%] transition-all duration-300">

                                                                <h2 className="text-white dark:text-[#111827] text-xl font-semibold mb-4">
                                                                    Share Paste
                                                                </h2>

                                                                <input
                                                                    type="text"
                                                                    value={`https://paste-app-red-six.vercel.app/pastes/${paste._id}`}
                                                                    readOnly
                                                                    className="w-full p-3 rounded-lg bg-black dark:bg-[#f5f7fb] border border-gray-700 dark:border-blue-300 text-white dark:text-black outline-none transition-all duration-300"
                                                                />

                                                                <div className="flex justify-end gap-3 mt-5">

                                                                    <button
                                                                        onClick={() => {
                                                                            navigator.clipboard.writeText(
                                                                                `https://paste-app-red-six.vercel.app/pastes/${paste._id}`
                                                                            )
                                                                            toast.success("Copied to clipboard")
                                                                        }}

                                                                        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg transition-all cursor-pointer"
                                                                    >
                                                                        Copy Link
                                                                    </button>

                                                                    <button
                                                                        onClick={close}
                                                                        className="px-4 py-2 bg-gray-700 hover:bg-gray-800 dark:bg-gray-300 dark:hover:bg-gray-400 dark:text-black text-white rounded-lg transition-all cursor-pointer"
                                                                    >
                                                                        Close
                                                                    </button>

                                                                </div>
                                                            </div>
                                                        )
                                                    }

                                                </Popup>

                                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-gray-800 dark:bg-blue-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                                    Share
                                                </span>
                                            </div>

                                            {/* VIEW */}
                                            <div className="relative group">

                                                <button className="p-2 rounded border border-gray-600 dark:border-blue-300 hover:border-indigo-300 dark:hover:border-blue-500 transition-all">

                                                    <NavLink to={`/pastes/${paste._id}`}>
                                                        <FontAwesomeIcon
                                                            icon={faEye}
                                                            className="text-white dark:text-[#111827] group-hover:text-indigo-300 dark:group-hover:text-blue-500 transition-all"
                                                        />
                                                    </NavLink>

                                                </button>

                                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-gray-800 dark:bg-blue-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                                    View
                                                </span>
                                            </div>

                                            {/* COPY */}
                                            <div className="relative group">

                                                <button
                                                    onClick={() => handleCopy(paste)}
                                                    className="p-2 rounded border border-gray-600 dark:border-blue-300 hover:border-lime-500 transition-all cursor-pointer"
                                                >

                                                    <FontAwesomeIcon
                                                        icon={faCopy}
                                                        className="text-white dark:text-[#111827] group-hover:text-lime-500 transition-all"
                                                    />

                                                </button>

                                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-gray-800 dark:bg-blue-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                                    Copy
                                                </span>
                                            </div>

                                        </div>

                                        {/* DATE */}
                                        <div className="flex items-center gap-2 text-white dark:text-[#111827] text-2xl font-semibold transition-all duration-300">

                                            <FontAwesomeIcon
                                                style={{ height: "20px", width: "20px" }}
                                                icon={faCalendar}
                                            />

                                            <p className="text-sm font-normal">
                                                {paste.createdAt}
                                            </p>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

                {
                    filteredData.length <= 0 &&
                    <div
                        className="text-2xl text-center w-full pt-4 text-orange-500 dark:text-blue-600 transition-all duration-300"
                    >
                        No Data Found
                    </div>
                }

            </div>
        </div>
    )
}

export default Paste
