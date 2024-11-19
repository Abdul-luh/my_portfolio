"use client";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import TechnologyReducer from "./features/technology";
export const store = configureStore({
	reducer: {
		TechnologyReducer,
		// ProjectReducer,
		// CertificateReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDistpatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
