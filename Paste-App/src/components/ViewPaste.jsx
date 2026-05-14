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
                <input className="w-full h-12 rounded-xl bg-[#111827] border border-gray-700 pl-4 pr-4 text-sm text-white placeholder:text-gray-500 outline-none transition-all duration-300 cursor-not-allowed" disabled
                    type="text"
                    value={paste.title}
                    placeholder="Enter title here"
                />
            </div>

            {/* Editor Box */}
            <div className="w-[80%] bg-[#1e1e1e] rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">

                {/* Top Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#2d2d2d] border-b border-gray-700">

                    {/* Mac Style Dots */}
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>

                    {/* Copy Button */}
                    <button className="text-white text-lg cursor-pointer" onClick={() => handleCopyBtn(paste.content)}>
                        <FontAwesomeIcon icon={faCopy} />
                    </button>
                </div>

                <div className="flex bg-[#1e1e1e]  overflow-hidden border border-gray-700">

                    {/* Line Numbers */}
                    <div className="w-12 bg-neutral-2 bg-[#252526]  font-mono text-white text-right pr-2 text-sm  pt-2 max-h-[620px] overflow-auto   border-input scrollbar-hide  placeholder:text-gray-500">
                        {paste.content.split("\n").map((_, index) => (
                            <div key={index}>
                                {index + 1}
                            </div>
                        ))}
                    </div>

                    {/* Textarea */}
                    <textarea className=" min-h-[300px] text-sm overflow-y-auto border-none rounded-none focus:ring-0 pl-2 pt-2 w-full bg-neutral-2  font-normal placeholder:text-gray-300 focus:outline-none resize-none leading-tight dark:text-white dark:caret-white cursor-not-allowed" disabled //placeholder="Enter content here..."
                        value={paste.content}
                        // onChange={(e) => setValue(e.target.value)}
                        rows={20}
                    ></textarea>
                </div>
            </div>
        </div>
    )
}

export default ViewPaste
