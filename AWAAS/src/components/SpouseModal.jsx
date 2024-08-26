import React, { useEffect, useState } from "react";
import { getSpouseInput } from "../api/openapi_handler.js";
import { HELP_INTERVAL, USE_AI } from "../config/config.js";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
const SpouseModal = ({
	eventState,
	prompt,
	written,
	suggestionsState,
	satisfiedSuggestionsState,
}) => {
	const [spouseEventTimer, setSpouseEventTimer] = eventState;
	const [satisfiedSuggestions, setSatisfiedSuggestions] =
		satisfiedSuggestionsState;
	const [suggestions, setSuggestions] = suggestionsState;
	const [message, setMessage] = useState("");
	const [visible, setVisible] = useState(false);
	const [charsWritten, setCharsWritten] = useState(0);

	const exit = () => {
		setVisible(false);
		setSpouseEventTimer(HELP_INTERVAL);
		setCharsWritten(0);
		setMessage("");
	};

	// placeholder funcs
	const accept = () => {
		exit();
	};
	const ignore = () => {
		exit();
	};

	const ignoresLeft = 1;
	const ignoresAllowed = 2;

	useEffect(() => {
		if (spouseEventTimer > 0) return;

		if (USE_AI) {
			getSpouseInput(prompt, suggestions, written).then((response) => {
				if (response === null) {
					console.error("Failed to load spouse input");
					return;
				}

				setMessage(response.message);
				setSuggestions((prev) => [...prev, response.short]);
				setSatisfiedSuggestions(response.fulfilled);
				setVisible(true);
			});
		} else {
			setMessage(
				"Lorem ipsum dolor sit AMET, consectetur adipiscing ELIT!!! Nam viverra mattis tellus, nec dignissim erat commodo EGET. Curabitur et vestibulum nunc. Donec quis metus massa. Praesent rhoncus efficitur neque, placerat varius purus porttitor non. Nunc a magna tincidunt, dignissim enim tempus, pretium risus. Mauris sit amet consequat nisl, pharetra tristique tellus. Donec ut justo sit amet nibh tempus malesuada. Aenean ultricies turpis ante, quis sollicitudin neque consectetur tristique. Fusce sed aliquam risus. Vestibulum dignissim elementum mi, at ullamcorper sem pellentesque in. Vestibulum mattis nisl in ultrices ultrices. Aliquam metus leo, lobortis sed eros a, egestas vestibulum ex. Quisque vel ligula non odio faucibus rhoncus ut ac mauris. Integer bibendum diam sed faucibus accumsan. Cras sit amet ipsum eget lectus hendrerit gravida blandit et quam. "
			);
			setVisible(true);
		}
	}, [spouseEventTimer]);

	useEffect(() => {
		if (!visible) return;
		let interval;
		interval = setInterval(() => {
			setCharsWritten((val) => {
				if (val === message.length) {
					clearInterval(interval);
					return message.length;
				} else return val + 1;
			});
		}, 10);

		return () => clearInterval(interval);
	}, [visible]);

	var isProcessingAllCapsWord = message.substring(
		charsWritten,
		charsWritten + 4
	);
	var isProcessingAllCapsWord =
		isProcessingAllCapsWord.toUpperCase() == isProcessingAllCapsWord;

	const isFullyWritten = charsWritten == message.length;
	const splitMessage = message.substring(0, charsWritten);
	const output = splitMessage.split(" ").map((word) => {
		if (word.toUpperCase() == word && word.length > 1) {
			return (
				<span className="text-red-500 font-bold text-2xl"> {word}</span>
			);
		}
		return " " + word;
	});
	return (
		<>
			<div
				style={{ visibility: visible ? "visible" : "hidden" }}
				className="absolute w-screen h-screen z-10 bg-black "
			/>
			<div
				style={{ visibility: visible ? "visible" : "hidden" }}
				className="flex justify-center items-center flex-col gap-16 "
			>
				<div
					style={{
						transform: `rotate(${
							isFullyWritten || charsWritten % 8 != 0
								? 0
								: charsWritten % 8
								? 1
								: -1
						}deg) scale(${
							isProcessingAllCapsWord && !isFullyWritten
								? 1.25
								: 1
						})`,
					}}
					className=" bg-white z-20 text-black p-4 rounded-lg w-fit max-w-[50vw] min-w-24 min-h-24 pt-16 relative"
				>
					<h3 className="text-5xl font-bold text-blue-700 -top-8 left-0 bg-white rounded-lg absolute px-4">
						Your Lovely Spouse
					</h3>
					<p className="font-speech tracking-wide text-2xl leading-loose">
						{output}
					</p>
				</div>
				<div
					className="flex gap-8 z-20"
					style={{
						visibility:
							isFullyWritten && visible ? "visible" : "hidden",
					}}
				>
					<button
						className="rounded-lg w-64 bg-green-600 items-center flex justify-center gap-4 text-black p-4"
						onClick={accept}
					>
						<FaThumbsUp className="text-3xl text-black" />
						<p className="text-2xl font-speech">Okay</p>
					</button>
					<button
						className="rounded-lg w-64 bg-red-500 items-center flex justify-center gap-4 text-black p-4"
						onClick={ignore}
					>
						<FaThumbsDown className="text-3xl text-black" />
						<p className="text-2xl font-speech">
							Ignore ({ignoresLeft}/{ignoresAllowed})
						</p>
					</button>
				</div>
			</div>
		</>
	);
};

export default SpouseModal;
