import { configureStore } from '@reduxjs/toolkit'
import counterSlice from "./slices/counter"
export default configureStore({
    reducer: {
        counter: counterSlice
    },
})