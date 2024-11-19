import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        isAuthenticated : false
    }
}

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
    
}
})