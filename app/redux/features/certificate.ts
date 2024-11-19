import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type certiType = {
	_id: string;
	name: string;
	url: string;
};
type initialStateType = {
	loading: boolean;
	error: string | undefined;
	msg: string;
	certificate: certiType[];
};
const initialState: initialStateType = {
	loading: false,
	error: "",
	msg: "",
	certificate: [],
};

export const certificateSlice = createSlice({
	name: "certificate",
	initialState,
	reducers: {
		clearMsg: (state) => {
			state.msg = "";
		},
	},
	extraReducers: (builders) => {
		builders
			.addCase(fetchCertificates.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchCertificates.fulfilled, (state, action) => {
				state.msg = action.payload;
			})
			.addCase(fetchCertificates.rejected, (state, action) => {
				state.loading = false;
				state.certificate = [];
				state.error = action.error.message;
			});
	},
});

export const fetchCertificates = createAsyncThunk(
	"certificate/fetchCertificates",
	async (_, { signal }) => {
		return axios.get("/api/certificates").then((res) => res.data);
	}
);

export const postCertificates = createAsyncThunk(
	"certificate/postCertificates",
	async (formData: FormData) => {
		return axios
			.post("/api/certificates", formData)
			.then((res) => {
				return res.data.message;
			})
			.catch((err) => {
				console.log(err);
				return err;
			});
	}
);

export default certificateSlice.reducer;
