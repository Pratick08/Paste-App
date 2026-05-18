import { useSelector } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { useParams } from "react-router-dom"
import toast from "react-hot-toast"
import { NavLink } from "react-router-dom";
// import toast from "react-hot-toast";
const ViewPaste = () => {
    const Allpastes = useSelector((state) => state.paste.pastes)
    const { id } = useParams();
    console.log(id);
    //  console.log("View all pastes page",Allpastes)
    const paste = Allpastes.find((item) =>
        item._id === id
    )
    console.log(paste);
    function handleCopyBtn(value) {
        navigator.clipboard.writeText(value)
        // console.log(value)
        toast.success("Copied to clickboard", {
            duration: 1000,
        })
    }
    return (
        <div className="home-main-container w-full flex flex-col items-center mt-5">

            {/* Top Section */}
            <div className="flex items-center justify-between w-[80%] mb-5 gap-3">

                {/* INPUT */}
                <div className="relative flex-1">

                    <input
                        type="text"
                        placeholder="Enter title here"
                        defaultValue={paste.title}
                        className="w-full h-12 rounded-xl bg-[#16171d] dark:bg-[#f5f7fb] border border-gray-700 dark:border-blue-300 pl-4 pr-4 text-sm text-white dark:text-black placeholder:text-gray-500 dark:placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-cyan-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-cyan-500/20 dark:focus:ring-blue-500/20 cursor-not-allowed"
                        disabled
                    />

                </div>

                {/* CREATE / UPDATE BUTTON */}
                <button
                    className="h-12 px-6 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl cursor-pointer transition-all duration-300 font-medium shadow-lg "
                ><NavLink to={`/?pastes=${paste._id}`}>Create Paste</NavLink>
                </button>


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
                    <button
                        className="text-white text-lg cursor-pointer hover:scale-110 transition-all duration-300"
                        onClick={() => handleCopyBtn(paste.content)}
                    >
                        <FontAwesomeIcon icon={faCopy} />
                    </button>
                </div>

                <div className="flex bg-[#16171d] dark:bg-[#f5f7fb] overflow-hidden border border-gray-700 dark:border-blue-300 transition-all duration-300">

                    {/* Line Numbers */}
                    <div className="w-12 bg-[#252526] dark:bg-[#e9eefc] font-mono text-gray-400 dark:text-gray-600 text-right pr-2 text-sm pt-2 max-h-155 overflow-auto scrollbar-hide select-none transition-all duration-300">

                        {paste.content.split("\n").map((_, index) => (
                            <div key={index}>
                                {index + 1}
                            </div>
                        ))}

                    </div>

                    {/* Textarea */}
                    <textarea
                        className="min-h-75 text-sm overflow-y-auto border-none rounded-none focus:ring-0 pl-2 pt-2 w-full bg-[#16171d] dark:bg-[#f5f7fb] text-white dark:text-black font-normal placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none resize-none leading-tight cursor-not-allowed transition-all duration-300"
                        disabled
                        value={paste.content}
                        rows={20}
                    ></textarea>
                </div>
            </div>
        </div>
    )
}

export default ViewPaste
