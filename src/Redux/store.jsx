import { combineReducers, configureStore } from "@reduxjs/toolkit";
import busSlice from './busSlice'

const rootReducer = combineReducers({
    bus: busSlice,
});

const store = configureStore({
    reducer: rootReducer,
})

export default store;