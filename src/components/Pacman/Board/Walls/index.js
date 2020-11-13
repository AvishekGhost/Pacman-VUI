import React from "react";
import { WALL_COLOUR_DARK } from "../../constants";
import Line from "../../grid/Line";
import walls from "./walls.json";

export default function Walls(props) {
	const lineProps = {
		strokeWidth: 1,
		stroke: WALL_COLOUR_DARK,
		fill: "none",
	};

	const linesWalls = Object.keys(walls).map((key) => {
		const parts = walls[key].parts.map(([distance, direction, radius]) => ({
			distance,
			direction,
			radius,
		}));

		return (
			<Line
				key={key}
				{...props}
				{...lineProps}
				start={walls[key].start}
				parts={parts}
			/>
		);
	});

	return <g className="walls">{linesWalls}</g>;
}
