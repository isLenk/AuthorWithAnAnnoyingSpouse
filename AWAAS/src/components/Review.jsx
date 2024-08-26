import React from "react";
import { FaStar } from "react-icons/fa";

const Review = ({ content }) => {
	const { title, text, domain, rating } = content;
	return (
		<div
			key={title}
			className="bg-white min-h-8 h-fit w-full [&>*]:text-black p-6 flex gap-4"
		>
			<img
				src={"https://logo.clearbit.com/" + domain}
				alt={domain}
				className="w-16 rounded-lg aspect-square"
			/>
			<div className="">
				<div className="flex gap-4">
					<h1 className="font-bold">{title}</h1>
					<div className="flex text-2xl ml-auto">
						{[...Array(5)].map((_, index) => (
							<FaStar
								key={index}
								className={
									1 + index <= rating
										? "text-yellow-400"
										: "text-gray-900"
								}
							/>
						))}
					</div>
				</div>
				<h3 className="mt-2 tracking-wide">{text}</h3>
			</div>
		</div>
	);
};

export default Review;
