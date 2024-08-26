import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import Review from "../components/Review";
import { MdArticle } from "react-icons/md";
import { getEvaluation } from "../api/openapi_handler";
import { USE_AI } from "../config/config";
import Loading from "../components/Loading";

const template_response = {
	rating: 1,
	critique:
		"The paper lacks coherence and presents exaggerated and unsubstantiated claims about mismatched socks causing severe mental and physical health issues. The connection to academic abilities is tenuous at best, and the evidence provided is both anecdotal and unscientific.",
	effect: "The paper has caused widespread panic among sock-wearers, with sock manufacturers now facing a surge in demand for 'matching' socks. Schools have instituted 'sock standards' in an attempt to curb the supposed academic decline, while mental health professionals are scrambling to debunk the paper's claims. In a bizarre twist, the paper has also led to the emergence of 'sock therapists' who provide counseling on sock choices.",
	events: [
		"A sock company reported a 300% increase in sales of matching socks following the paper's publication.",
		"Local schools began enforcing 'sock uniform' policies, resulting in protests and a new student fashion movement.",
		"A viral social media trend emerged where people began throwing their mismatched socks out of windows to 'combat' the alleged effects.",
		"Mental health professionals held emergency press conferences to address the false claims made in the paper, which led to a significant public outcry.",
	],
	reviews: [
		{
			title: "The New York Times",
			domain: "nytimes.com",
			text: "A chaotic mess of pseudoscience that confuses rather than clarifies. 1/5",
			rating: 1,
		},
		{
			title: "The Verge",
			domain: "theverge.com",
			text: "An absurd take on socks with no grounding in reality. Thoroughly disappointing. 1/5",
			rating: 1,
		},
		{
			title: "The Guardian",
			domain: "theguardian.com",
			text: "This paper's alarmist and unverified claims about mismatched socks are as ridiculous as they are harmful. 1/5",
			rating: 1,
		},
		{
			title: "The Daily Mail",
			domain: "dailymail.co.uk",
			text: "An over-the-top and laughable attempt at explaining sock-based distress. 1/5",
			rating: 1,
		},
		{
			title: "USA Today",
			domain: "usatoday.com",
			text: "An outlandish and unfounded study that fails to make a sensible argument. 1/5",
			rating: 1,
		},
	],
};

const Judgement = () => {
	const [response, setResponse] = useState(null);
	const [contentLoaded, setContentLoaded] = useState(false);
	const [onTransitionFinished, setOnTransitionFinished] = useState(false);
	useEffect(() => {
		const input = localStorage.getItem("paper");
		const prompt = localStorage.getItem("prompt");

		if (input == null || prompt == null) {
			console.error("No paper or prompt found");
			return;
		}

		if (USE_AI) {
			getEvaluation(prompt, input).then((response) => {
				if (response == null) {
					console.error("Failed to get evaluation");
					return;
				}
				setResponse(response);
				setContentLoaded(true);
			});
		} else {
			setResponse(template_response);
			setContentLoaded(true);
		}
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setResponse(template_response);
			setContentLoaded(true);
		}, 5000);
	}, []);
	if (response == null || !onTransitionFinished)
		return (
			<Loading
				contentLoaded={contentLoaded}
				onTransitionFinished={() => setOnTransitionFinished(true)}
			/>
		);

	const reviews = response["reviews"];
	return (
		<div className="grid grid-cols-2 grid-rows-1">
			<div className="flex items-center justify-center flex-col pt-32 w-2/3 ml-auto mr-auto">
				<Logo />
				<h1 className="text-5xl font-semibold">BREAKING NEWS!</h1>
				<h1 className="text-3xl uppercase">
					Rated {response["rating"]}/5
				</h1>
				<hr className="my-4" />
				<h1 className="text-3xl uppercase">The Consequences</h1>
				<p className="text-xl mt-2 leading-9 tracking-wide">
					{response["effect"]}
				</p>
				<br className="my-4" />
				<h3 className="text-3xl uppercase">Recent Articles</h3>
				<ul className="space-y-4 mt-4">
					{response["events"].map((event) => (
						<li className="text-lg flex gap-4 items-center border-t-2 pt-2 border-slate-700 text-left w-full">
							<MdArticle className="text-5xl" />
							{event}
						</li>
					))}
				</ul>
				<hr className="my-4" />
				<hr className="my-4" />
			</div>
			<div className="flex flex-col gap-4 w-2/3 justify-center">
				<h1 className="text-3xl mb-4 uppercase">Reviews</h1>
				{reviews.map((review) => (
					<Review content={review} />
				))}
			</div>
		</div>
	);
};

export default Judgement;
