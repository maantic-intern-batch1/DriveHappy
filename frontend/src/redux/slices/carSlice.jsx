// carSlice.js
import { createSlice } from '@reduxjs/toolkit';

const carSlice = createSlice({
    name: 'car',
    initialState: {
        details: null,
        isEditing: false,
    },
    reducers: {
        setCarDetails: (state, action) => {
            state.details = action.payload;
        },
        updateCarDetails: (state, action) => {
            state.details = { ...state.details, ...action.payload };
        },
        setIsEditing: (state, action) => {
            state.isEditing = action.payload;
        },
    },
});

export const { setCarDetails, updateCarDetails, setIsEditing } = carSlice.actions;
export default carSlice.reducer;