import { useEffect, useState } from "react";
import "../App.css";
import SpouseModal from "../components/SpouseModal";
import Timer from "../components/Timer";
import { getPaperPrompt } from "../api/openapi_handler.js";
import { HELP_INTERVAL, PAPER_DUE, USE_AI } from "../config/config.js";
import Logo from "../components/Logo.jsx";
import { FaCheck } from "react-icons/fa";
import { HiMiniXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const initialSuggestions = [
	"Penguins could take orders using ice tablets!",
	"Penguins should wear chef hats while making pizza!",
	"Add a penguin pizza mascot that delivers on ice skates!",
	"Penguins should have loud, colorful ice banners to advertise their pizza!",
	"Penguins should use a secret ingredient from Antarctic snowflakes!",
];

function Game() {
	const [count, setCount] = useState(0);
	const [topic, setTopic] = useState("LOADING");
	const [genre, setGenre] = useState(["LOADING"]);
	const [timer, setTimer] = useState(PAPER_DUE);
	const spouseEvent = useState(HELP_INTERVAL);
	const [spouseEventTimer, setSpouseEventTimer] = spouseEvent;
	const suggestionsState = useState(!USE_AI ? initialSuggestions : []);
	const [suggestions, setSuggestions] = suggestionsState;
	const satisfiedSuggestions = useState([true, true, false, false, false]);
	const [satisfied, setSatisfied] = satisfiedSuggestions;
	const [response, setResponse] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (USE_AI == false) {
			setTopic("NO AI MODE");
			setGenre(["NO AI MODE"]);
			return;
		}

		if (timer != 0 && topic != "LOADING") return;
		console.log("SENDING!!!\n");
		getPaperPrompt().then((res) => {
			if (res == null) {
				console.error("Failed to load prompt");
				return;
			}
			console.log(res);
			setTopic(res.p);
			setGenre(res.g.split(","));
		});
	}, []);

	useEffect(() => {
		let interval;
		interval = setInterval(() => {
			setTimer((time) => {
				if (time === 0) {
					clearInterval(interval);
					return 0;
				} else return time - 1;
			});

			setSpouseEventTimer((time) => {
				if (time === 0) {
					return 0;
				} else return time - 1;
			});
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (timer > 0) {
			return;
		}

		localStorage.setItem("paper", response);
		localStorage.setItem("prompt", topic);
		navigate("/results");
	}, [timer]);

	return (
		<>
			<div
				style={{
					height: spouseEventTimer > 0 ? "0" : "",
				}}
				className="sticky z-20 w-screen h-screen top-0 flex flex-col items-center justify-center"
			>
				<SpouseModal
					eventState={spouseEvent}
					prompt={topic}
					suggestionsState={suggestionsState}
					satisfiedSuggestionsState={satisfiedSuggestions}
					written={response}
				/>
			</div>
			<div className="bg-slate-800/80 w-fit p-4 sticky right-4 top-4 ml-auto z-10 rounded-lg">
				{suggestions.map((suggestion, index) => (
					<div
						key={index}
						className="flex  gap-2 items-center text-xl"
					>
						{satisfied[index] == true ? (
							<FaCheck className="text-green-500" />
						) : (
							<HiMiniXMark className="text-red-500" />
						)}
						{suggestion}
					</div>
				))}
			</div>

			<div className="flex flex-col relative">
				<Logo />

				<div className="sticky left-64 top-4 z-10 w-fit bg-gray-800/80 rounded-lg p-4">
					<div>
						<h1 className="text-2xl">Your Topic</h1>
						<h1 className="text-3xl">{topic}</h1>
						<h3 className="flex gap-4 font-bold">
							Genre:
							<ul className="flex flex-row gap-2">
								{genre.map((genreText, index) => (
									<li key={genreText} className="capitalize">
										{genreText}
									</li>
								))}
							</ul>
						</h3>
					</div>
					<div className="scale-75 flex gap-8">
						<Timer label="Paper is due in" time={timer} />
						<hr />
						<Timer
							label='"Help" will arrive in'
							time={spouseEventTimer}
						/>
					</div>
				</div>
				<div className="w-screen min-h-screenn my-16 mt-16 flex justify-center flex-col items-center">
					<div
						id="document"
						className="bg-white w-2/3 h-[110vh] relative px-32 py-32"
					>
						<textarea
							value={response}
							onChange={(e) => setResponse(e.target.value)}
							name="documentsource"
							className="h-full w-full text-2xl bg-transparent text-slate-800 border-none outline-none"
						></textarea>
					</div>
				</div>
			</div>
		</>
	);
}

export default Game;
