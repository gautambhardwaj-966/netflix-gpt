import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
    name:"config",
    initialState:{
        lang:"en",
    },
    reducers:{
        changeLangage:(state,action)=>{
            state.lang=action.payload;
        },
    },
}

);
export const {changeLangage} = configSlice.actions;
export default configSlice.reducer;
//We will add this reducer to appStore