import mongoose from "mongoose";

export async function Connect() {
	try {
		await mongoose.connect(process.env.MONGO_URI!);

		const connection = mongoose.connection;

		connection.on("connected", () => {
			console.log("MongoDB connected successsfully");
		});

		connection.on("error", (err) => {
			console.log("No Internet Connection \n" + err);
			// process.exit();
		});
	} catch (error: any) {
		console.log("Network Error");
		console.log(error);
	}
}
// SOMETHING WENT WRONG FROM THE DATABASE CONNECTION
