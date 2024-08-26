import axios from "axios";

const axiosClient = axios.create({
	baseURL: "http://localhost:3000", // Replace with your API base URL
	timeout: 15000, // Set a timeout value in milliseconds
	headers: {
		"Content-Type": "application/json", // Set the content type for requests
		// Add any additional headers you need
	},
});

export default axiosClient;
