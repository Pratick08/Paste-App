import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
const initialState = {
    pastes: localStorage.getItem("pastes")
        ? JSON.parse(localStorage.getItem("pastes"))
        : [],
}

export const pasteSlice = createSlice({
    name: 'paste',
    initialState,
    reducers: {
        addToPastes: (state, action) => {
            const paste = action.payload;
            console.log(paste);
            state.pastes.push(paste);
            localStorage.setItem("pastes", JSON.stringify(state.pastes));
            toast.success('Paste Created Successfully');


        },
        updateToPastes: (state, action) => {
            const paste = action.payload;
            //ye  state.pastes array ke har ek index mein jake us perticular index id ko paste._id ke sath compair kar rahe hai 
            // [0: { title: "a", content: "aa", _id: "ahh221s" },
            //  1: { title: "a", content: "aa", _id: "ahh221s" },
            //  2: { title: "a", content: "aa", _id: "ahh221s" }
            // ]
            const index = state.pastes.findIndex((item) => 
                item._id === paste._id
            )
            if (index >= 0) {
                state.pastes[index] = paste;
                localStorage.setItem("pastes", JSON.stringify(state.pastes))
                toast.success("Paste Updated");
            }

        },
        resetAllPastes: (state) => {
            state.pastes = [];
            localStorage.removeItem("pastes");
        },
        removeFromPastes: (state, action) => {
            const pasteId = action.payload;

            const index = state.pastes.findIndex(
                (item) => item._id === pasteId
            )
            console.log(index);
            if (index >= 0) {
                state.pastes.splice(index, 1);
                localStorage.setItem("pastes", JSON.stringify(state.pastes))
                toast.success("Paste Deleted");
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer