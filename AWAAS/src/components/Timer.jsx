import React from "react";
import { MdTimer } from "react-icons/md";

const Timer = ({ label, time }) => {
	return (
		<div className="flex gap-4 items-center text-3xl">
			<p>{label}</p>
			<MdTimer className="" />
			<p>{time}s</p>
		</div>
	);
};

export default Timer;
