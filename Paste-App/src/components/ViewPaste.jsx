import { useSelector } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { useParams } from "react-router-dom"
import toast from "react-hot-toast"
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
            <div className="flex justify-between w-[80%] mb-5">
                <input className="w-full h-12 rounded-xl bg-[#16171d] dark:bg-[#f5f7fb] border border-gray-700 dark:border-blue-300 pl-4 pr-4 text-sm text-white dark:text-black placeholder:text-gray-500 dark:placeholder:text-gray-400 outline-none transition-all duration-300 cursor-not-allowed" disabled
                    type="text"
                    value={paste.title}
                    placeholder="Enter title here"
                />
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
                    <div className="w-12 bg-[#252526] dark:bg-[#e9eefc] font-mono text-gray-400 dark:text-gray-600 text-right pr-2 text-sm pt-2 max-h-[620px] overflow-auto scrollbar-hide select-none transition-all duration-300">

                        {paste.content.split("\n").map((_, index) => (
                            <div key={index}>
                                {index + 1}
                            </div>
                        ))}

                    </div>

                    {/* Textarea */}
                    <textarea
                        className="min-h-[300px] text-sm overflow-y-auto border-none rounded-none focus:ring-0 pl-2 pt-2 w-full bg-[#16171d] dark:bg-[#f5f7fb] text-white dark:text-black font-normal placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none resize-none leading-tight cursor-not-allowed transition-all duration-300"
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
