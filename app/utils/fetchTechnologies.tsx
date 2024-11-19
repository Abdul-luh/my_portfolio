"use client";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { AppDistpatch } from "@/app/redux/store";

export const baseURL = axios.create({
	baseURL: "/api/",
});

export default function useFetchEffect({
	depArr,
	fetchFunc,
}: {
	depArr: any[];
	fetchFunc: () => void;
}) {
	const dispatch = useDispatch<AppDistpatch>();

	useEffect(() => {
		const abortControl = new AbortController();
		dispatch(() => fetchFunc());
		// console.log(depArr);
		return () => abortControl.abort();
	}, [dispatch, fetchFunc, ...depArr]);
}
