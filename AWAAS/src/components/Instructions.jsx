import React from "react";

const Instructions = ({ close }) => {
	return (
		<div className="w-screen h-screen flex items-center justify-center">
			<div className="w-1/3 bg-white min-h-[25vh] p-4 absolute ml-auto mr-auto text-black flex flex-col items-center justify-center font-speech rounded-lg text-xl">
				<h1 className="text-black text-3xl mb-2">Instructions</h1>
				<ul className="flex flex-col list-disc font-fun text-3xl">
					<li>Write a paper on the topic provided</li>
					<li>Stay on topic</li>
					<li>
						<span className="line-through">
							Ignore your spouse's advice
						</span>
						<span className="text-red-500 ml-2 font-speech text-2xl">
							Listen to your spouse's advice.
						</span>
					</li>

					<li>Finish the paper before the timer runs out</li>
				</ul>
				<br className="my-4" />
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={() => close()}
				>
					Okay. Got it.
				</button>
			</div>
		</div>
	);
};

export default Instructions;
