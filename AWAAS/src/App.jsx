import React, { useMemo } from "react";
import Game from "./pages/Game";
import Judgement from "./pages/Judgement";
import {
	BrowserRouter,
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
	const router = useMemo(
		() =>
			createBrowserRouter([
				{
					path: "/",
					element: <Home />,
				},
				{
					path: "/game",
					element: <Game />,
				},
				{
					path: "results",
					element: <Judgement />,
				},
			]),
		[]
	);

	return (
		<div className="bg-gray-800 min-h-screen">
			<RouterProvider router={router} />
		</div>
	);
};

export default App;
