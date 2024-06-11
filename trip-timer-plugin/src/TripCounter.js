// TripCounter.js
import { useCallback, useEffect, useMemo, useState } from "react";
import CountdownDisplay from "./CountdownDisplay";
import { calculateSecondsLeft, calculateTimeLeft } from "./utils";

export default function TripCounter({ tripName, tripTime }) {
	const [timeInfo, setTimeInfo] = useState(() => ({
		timeLeft: calculateTimeLeft(tripTime),
		secondsLeft: calculateSecondsLeft(tripTime),
	}));
	const [newTaskText, setNewTaskText] = useState("");
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const interval = setInterval(() => {
			const updatedSecondsLeft = calculateSecondsLeft(tripTime);
			const updatedTimeLeft = calculateTimeLeft(tripTime);
			setTimeInfo((prevTimeInfo) => ({
				timeLeft:
					updatedTimeLeft !== prevTimeInfo.timeLeft
						? updatedTimeLeft
						: prevTimeInfo.timeLeft,
				secondsLeft:
					updatedSecondsLeft !== prevTimeInfo.secondsLeft
						? updatedSecondsLeft
						: prevTimeInfo.secondsLeft,
			}));
		}, 500);
		return () => {
			clearInterval(interval);
		};
	}, [tripTime]);

	const checkEnterKey = useCallback(
		(event) => {
			if (event.key && event.key === "Enter") {
				addNewTask();
			}
		},
		[newTaskText, tasks],
	);

	const addNewTask = useCallback(() => {
		setTasks([...tasks, { text: newTaskText, done: false }]);
		setNewTaskText("");
	}, [newTaskText, tasks]);

	const changeCheckbox = useCallback(
		(event) => {
			const updatedTasks = Array.from(tasks);
			const index = event.target.id.match(/\d/)[0];

			updatedTasks[index].done = event.target.checked;
			setTasks(updatedTasks);
		},
		[tasks],
	);

	const listItems = useMemo(
		() =>
			tasks.map((task, index) => {
				let itemClass = "taskItem";
				if (task?.done) {
					itemClass += " done";
				}

				const id = `taskCheckbox_${index}`;

				return (
					<li className={itemClass} key={index}>
						<input
							type="checkbox"
							id={id}
							onChange={changeCheckbox}
							checked={task.done}
							aria-label={`Task ${index + 1}`} // Added ARIA label
						/>
						<label htmlFor={id}>{task.text}</label>
					</li>
				);
			}),
		[tasks],
	);

	return (
		<div className="CountdownPage">
			<CountdownDisplay
				tripName={tripName}
				tripTime={tripTime}
				timeInfo={timeInfo}
				isEditable={false}
			/>
			<div className="otherStuff">
				<div>
					<h2>Things Left To Do</h2>
				</div>
				<div>
					<ul>{listItems}</ul>
				</div>
				<div>
					<input
						className="newTask"
						placeholder="Add tasks here"
						value={newTaskText}
						onChange={(e) => setNewTaskText(e.target.value)}
						onKeyDown={checkEnterKey}
						aria-label="New Task Input" // Added ARIA label
					/>
					<button onClick={addNewTask} aria-label="Add Task Button">
						+
					</button>{" "}
					{/* Added ARIA label */}
				</div>
			</div>
		</div>
	);
}
