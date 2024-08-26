import React, { useState } from "react";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import Review from "../components/Review";
import Instructions from "../components/Instructions";

const Home = () => {
	const [showInstructions, setShowInstructions] = useState(false);

	return (
		<>
			{showInstructions && (
				<Instructions close={() => setShowInstructions(false)} />
			)}
			<div className="ml-auto mr-auto h-screen flex items-center justify-center flex-col w-2/3 gap-8">
				<Logo />
				<h3 className="text-4xl text-center w-1/2 font-fun tracking-widest">
					You have a paper due VERY SOON. Type fast and try your best
					to stay on topic while your{" "}
					<span className="line-through">intimidating</span>{" "}
					<span className="text-red-500 text-2xl font-speech">
						wonderful{" "}
					</span>
					spouse gives you 'helpful' advice.
				</h3>

				<div className="flex flex-col gap-4">
					<Link
						to="/game"
						className="min-w-full bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
					>
						Start
					</Link>
					<button
						onClick={() => setShowInstructions(true)}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					>
						Instructions
					</button>
				</div>
			</div>
		</>
	);
};

export default Home;
