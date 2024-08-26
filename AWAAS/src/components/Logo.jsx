import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
	return (
		<Link to="/">
			<header className="px-12 py-4">
				<h3 className="text-5xl font-fun ">
					Author with an{" "}
					<span className="line-through text-gray-500">Annoying</span>{" "}
					Spouse
				</h3>
				<p>As recommended by Ethan Cook. Written by Lance Talban</p>
			</header>
		</Link>
	);
};

export default Logo;
