import axiosClient from "./axios_client";
import OpenAI from "openai";

const openai = new OpenAI({
	organization: "org-sh7Gsfj1C0qMtYVDT5qDRSS9",
	apiKey: import.meta.env.VITE_OPENAI_API_KEY,
	dangerouslyAllowBrowser: true, /// REMOVE REMOVE WHEN ACTUALLY DOING
});

const model_str = "gpt-4o-mini";
// const model_str = "gpt-3.5-turbo-1106";
var processing = false;
const getPaperPrompt = async () => {
	if (processing) return;
	processing = true;

	const response = await axiosClient.get("/paper-prompt");
	console.log(response);
	processing = false;
	try {
		return response.data;
	} catch (e) {
		console.log(e);
	}
};

const getSpouseInput = async (prompt, suggestions, input) => {
	if (processing) return;
	processing = true;

	const response = await axiosClient.post("/spouse-input", {
		prompt,
		suggestions,
		input,
	});

	processing = false;

	try {
		return response.data;
	} catch (e) {
		console.log(e);
	}
};

const getEvaluation = async (prompt, input) => {
	if (processing) return;
	processing = true;

	const response = await axiosClient.post("/evaluation", {
		prompt,
		input,
	});

	processing = false;

	try {
		return response.data;
	} catch (e) {
		console.log(e);
	}
};

export { getPaperPrompt, getSpouseInput, getEvaluation };
