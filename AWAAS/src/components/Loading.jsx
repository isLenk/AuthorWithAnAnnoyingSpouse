import React, { useEffect, useState } from "react";

const Loading = ({ contentLoaded, onTransitionFinished }) => {
	const [charsWritten, setCharsWritten] = useState([0, 0, 0]);
	const _title = "You have published your paper...";
	const _subtitle = "The world is currently reading your work";
	const _description = "Lets see what damages you have caused.";
	const [opacity, setOpacity] = useState(1);

	useEffect(() => {
		let interval;

		interval = setInterval(() => {
			setCharsWritten((prev) => {
				const newCharsWritten = [...prev];
				if (newCharsWritten[0] < _title.length) {
					newCharsWritten[0]++;
				} else if (newCharsWritten[1] < _subtitle.length) {
					newCharsWritten[1]++;
				}

				// This part does not execute unless contentLoaded is true
				if (newCharsWritten[1] === _subtitle.length) {
					clearInterval(interval);
				}
				return newCharsWritten;
			});
		}, 20);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		let interval;
		setTimeout(() => {
			interval = setInterval(() => {
				setCharsWritten((prev) => {
					const newCharsWritten = [...prev];
					if (newCharsWritten[2] < _description.length) {
						newCharsWritten[2]++;
					}

					// This part does not execute unless contentLoaded is true
					if (newCharsWritten[2] === _description.length) {
						setTimeout(() => {
							setOpacity(0);
						}, 2000);

						clearInterval(interval);
					}
					return newCharsWritten;
				});
			}, 20);
		}, 2000);

		return () => clearInterval(interval);
	}, [contentLoaded]);

	useEffect(() => {
		if (opacity === 0) {
			setTimeout(() => {
				onTransitionFinished();
			}, 100);
		}
	}, [opacity]);

	const title = _title.substring(0, charsWritten[0]);
	const subtitle = _subtitle.substring(0, charsWritten[1]);
	const description = _description.substring(0, charsWritten[2]);

	return (
		<div
			style={{ opacity }}
			className="w-screen h-screen bg-black flex flex-col transition-all justify-center items-center gap-4"
		>
			<h1 className="text-4xl transition-all" style={{ opacity }}>
				{title}
			</h1>
			<h3 className="text-5xl transition-all" style={{ opacity }}>
				{subtitle}
			</h3>
			<h1 className="text-6xl transition-all" style={{ opacity }}>
				{description}
			</h1>
		</div>
	);
};

export default Loading;
