const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const openai = new OpenAI({
	organization: "org-sh7Gsfj1C0qMtYVDT5qDRSS9",
	apiKey: process.env.OPENAI_API_KEY,
});
const model_str = "gpt-4o-mini";

// Import required modules
const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());
// Define routes
app.get("/paper-prompt", async (req, res) => {
	const stream = await openai.chat.completions.create({
		model: model_str,
		messages: [
			{
				role: "user",
				content: `Please respond in the format '{"p": "", "g": ""}' (same quotes). p has an insane and ridiculous random (not complicated) short one line prompt for a paper. g has two or three random simple writing styles (comma separated, simple and does not comply with the prompt).`,
			},
		],
	});
	processing = false;
	try {
		return res.send(stream.choices[0].message.content);
	} catch (e) {
		console.log(e);
		return res.status(500).send("Internal server error");
	}
});

app.post("/spouse-input", async (req, res) => {
	const { prompt, suggestions, input } = req.body;

	// Checks
	if (!prompt || !suggestions || input === null) {
		return res.status(400).send("Invalid request");
	}

	const stream = await openai.chat.completions.create({
		model: model_str,
		messages: [
			{
				role: "system",
				content: `As the arrogant and condescending spouse who believes their ideas are truly wise (you lack common sense and have an iq between 70-90) you must give a ridiculous one to three line suggestion to their work that will have nothing to do with the given propmt. Speak condescendingly and add LOTS of emotion. Include exclamations and all caps if needed. Either suggest something to add or correct one of the sentences. Slowly become infuriated as your spouse chooses to not include your previous suggestions (mock their sentences if needed with the quotes appearing as "tHiS qUoTe" for example). If they satisfy the last requirement, start of polite. Make the sentences simple and readable. Respond in the format '{"message": "", "short": "", "fulfilled": []}' where short is the one line simplified addition from your suggestion and fulfilled is a boolean list that represents which of your previous suggestions were loosely stated in your spouses writing. Do not reuse previous suggestions.`,
			},
			{
				role: "user",
				content: `The prompt is: "${prompt}". Your previous suggestions were: "${suggestions}". Your spouse wrote the following: "${input}" `,
			},
		],
	});

	try {
		res.send(stream.choices[0].message.content);
		// Send request to speaker api
		fetch("http://localhost:5000/", {
			method: "POST",
			body: JSON.stringify({
				content: JSON.parse(stream.choices[0].message.content).message,
			}),
			headers: { "Content-Type": "application/json" },
		});
	} catch (e) {
		console.log(e.stack);
		return res.status(500).send("Internal server error");
	}
});

app.post("/evaluation", async (req, res) => {
	console.log(req.body);
	const { prompt, input } = req.body;

	// Checks
	if (!prompt || !input) {
		return res.status(400).send("Invalid request");
	}

	const stream = await openai.chat.completions.create({
		model: model_str,
		messages: [
			{
				role: "system",
				content: `As the system, you will receive a paper submitted by an influential author.
You will be provided the prompt, the authors writings, and the genres.
Response in json format exactly as follows: '{"rating": NUM, "critique": "", "effect": "", "events": [], "reviews":  [{"title": "", "domain": "", "text": "", "rating": NUM},... }]'
You must rate the writings according to how well they work with the given prompt and genres out of 5 and then give a very brief critique.

Write an absurd paragraph about its effect on their society (4-8 sentences) and up to four chaotic events that made the news. 

Write five fake (max three line) simple reviews written by random companies (such as New York Times, the verge, the guardian, etc. ) with a rating out of 5. Include the domain of the website (e.g. DOMAIN.com)`,
			},
			{
				role: "user",
				content: `The prompt is: "${prompt}". Written was: "${input}" `,
			},
		],
	});
	console.log(stream.choices[0].message.content);
	try {
		return res.send(stream.choices[0].message.content);
	} catch (e) {
		console.log(e.stack);
		return res.status(500).send("Internal server error");
	}
});

// Start the server
app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
