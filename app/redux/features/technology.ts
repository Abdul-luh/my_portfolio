import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

type Technology = {
	_id: string;
	image: string;
	title: string;
};

// Define the type for the technologies array in the state
type TechnologiesState = Technology[];

type initialStateType = {
	loading: boolean;
	technologies: TechnologiesState; // Use the TechnologiesState type here
	error: string | undefined;
	msg: string;
};

const initialState: initialStateType = {
	loading: false,
	technologies: [],
	error: "",
	msg: "",
};

export const technologySlice = createSlice({
	name: "technologies",
	initialState,
	reducers: {
		clearMsg: (state) => {
			state.msg = "";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTechnologies.pending, (state) => {
				state.loading = true;
			})
			.addCase(
				fetchTechnologies.fulfilled,
				(state, action: PayloadAction<TechnologiesState>) => {
					state.loading = false;
					state.technologies = action.payload;
					state.error = "";
					console.log(action.payload);
				}
			)
			.addCase(fetchTechnologies.rejected, (state, action) => {
				state.loading = false;
				state.technologies = [];
				state.error = action.error.message;
			})
			.addCase(postTechnologies.pending, (state) => {
				state.loading = true;
			})
			.addCase(
				postTechnologies.fulfilled,
				(state, action: PayloadAction<string>) => {
					state.loading = false;
					state.msg = action.payload;
				}
			)
			.addCase(postTechnologies.rejected, (state, action) => {
				state.loading = false;
			});
	},
});

export const fetchTechnologies = createAsyncThunk(
	"technologies/fetchTechnologies",
	async (_, { signal }) => {
		return axios.get("/api/technologies", { signal }).then((res) => {
			return res.data.technologies;
		});
	}
);

export const postTechnologies = createAsyncThunk(
	"technologies/postTechnologies",
	async (formData: FormData) => {
		return axios
			.post("/api/technologies", formData)
			.then((res) => {
				return res.data.message;
			})
			.catch((err) => {
				console.log(err);
				return err;
			});
	}
);

// UNUSED
export const deleteTechnologies = createAsyncThunk(
	"technologies/deleteTechnologies",
	async (id: string) => {
		await axios.delete("/api/technologies/" + id).then((res) => {
			console.log(res.data.technologies);
			return id;
		});
	}
);

export default technologySlice.reducer;

// handleImage: (state, action: PayloadAction<Technology>) => {
// 	const obj = {
// 		_id: action.payload._id,
// 		img: action.payload.img,
// 		title: action.payload.title,
// 	};
// 	state.technologies = state.technologies.concat([obj]);
// },
// handleDeleteTechnology: (state, action: PayloadAction<string>) => {
// 	state.technologies = state.technologies.filter(
// 		(tech) => tech._id === action.payload
// 	);
// },
