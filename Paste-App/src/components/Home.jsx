/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pastes");
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes)
    console.log("All pastes", allPastes);
    //update paste karne ke time data show karne ke liye ye wala hook use kr rahe hai
    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find(
                (e) => e._id === pasteId
            );
            setTitle(paste.title);
            setValue(paste.content);
        } else {
            // clear fields on home page
            setTitle("")
            setValue("")
        }


    }, [pasteId, allPastes]);

    function createMyPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
            }),
        }
        if (title.trim() != "" && value.trim() != "") {
            if (pasteId) {
                //update
                dispatch(updateToPastes(paste))
            } else {
                //create
                dispatch(addToPastes(paste))
            }
            setTitle('');
            setValue('');
            setSearchParams({});
        } else {
            toast.error("Plese fill all the fields ")
        }
        //after updation or creation

    }
    function handleCopyBtn(value) {
        navigator.clipboard.writeText(value)
        // console.log(value)
        toast.success("Copied to clickboard")
    }

    return (
        <div className="home-main-container w-full flex flex-col items-center mt-5 ">

            {/* Top Section */}
            <div className="flex items-center justify-between w-[80%] mb-5 gap-3">

                {/* INPUT */}
                <div className="relative flex-1">

                    <input
                        type="text"
                        placeholder="Enter title here"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full h-12 rounded-xl bg-[#16171d] dark:bg-[#f5f7fb] border border-gray-700 dark:border-blue-300 pl-4 pr-4 text-sm text-white dark:text-black placeholder:text-gray-500 dark:placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-cyan-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-cyan-500/20 dark:focus:ring-blue-500/20"
                    />

                </div>

                {/* CREATE / UPDATE BUTTON */}
                <button
                    className="h-12 px-6 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl cursor-pointer transition-all duration-300 font-medium shadow-lg "
                    onClick={createMyPaste}
                >
                    {pasteId ? "Update Paste" : "Create Paste"}
                </button>

                {/* ADD BUTTON */}
                {
                    pasteId && (
                        <button
                            className="h-12 w-12 flex items-center justify-center bg-cyan-600 hover:bg-cyan-700 rounded-xl text-white transition-all duration-300 shadow-lg cursor-pointer"
                        >
                            <NavLink to="/"><FontAwesomeIcon icon={faPlus} /></NavLink>
                        </button>
                    )
                }

            </div>

            {/* Editor Box */}
            <div className="w-[80%] bg-[#16171d] dark:bg-[#f5f7fb] rounded-2xl overflow-hidden border border-gray-700 dark:border-blue-300 shadow-2xl dark:shadow-blue-100 transition-all duration-300">

                {/* Top Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#22232b] dark:bg-blue-600 border-b border-gray-700 dark:border-blue-500 transition-all duration-300">

                    {/* Mac Style Dots */}
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>

                    {/* Copy Button */}
                    <button className="text-white dark:text-white text-lg cursor-pointer hover:scale-110 transition-all duration-300" onClick={() => handleCopyBtn(value)}>
                        <FontAwesomeIcon icon={faCopy} />
                    </button>
                </div>

                <div className="flex bg-[#16171d] dark:bg-[#f5f7fb] overflow-hidden border border-gray-700 dark:border-blue-300 transition-all duration-300">

                    {/* Line Numbers */}
                    <div className="w-12 bg-[#252526] dark:bg-[#e9eefc] text-gray-400 dark:text-gray-600 text-right font-mono text-sm py-2 pr-2 leading-6 select-none transition-all duration-300">
                        {value.split("\n").map((_, index) => (
                            <div key={index}>
                                {index + 1}
                            </div>
                        ))}
                    </div>

                    {/* Textarea */}
                    <textarea
                        className="w-full bg-[#16171d] dark:bg-[#f5f7fb] text-white dark:text-black font-mono text-sm leading-6 py-2 pl-2 outline-none resize-none overflow-y-auto placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-all duration-300"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        rows={20}
                    ></textarea>
                </div>
            </div>
        </div>
    )
}

export default Home
