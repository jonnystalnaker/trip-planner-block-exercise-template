// preview.js
import { useCallback, useEffect, useState } from "react";
import CountdownDisplay from "./CountdownDisplay";
import { calculateSecondsLeft, calculateTimeLeft } from "./utils";

export default function TimerPreview({
	tripName,
	tripTime,
	setTripName,
	updateTripTime,
}) {
	// I combined the states for optimization
	const [timeInfo, setTimeInfo] = useState(() => ({
		timeLeft: calculateTimeLeft(tripTime),
		secondsLeft: calculateSecondsLeft(tripTime),
	}));

	//I destructured these.
	const { timeLeft, secondsLeft } = timeInfo;

	// Fixed typo from setIsInvisble to setIsInvisible for clarity.
	const [isInvisible, setIsInvisible] = useState(true);

	// I used useCallback to avoid re-rendering the toggleVisible function every time the isInvisible state changes.
	const toggleVisible = useCallback(() => {
		setIsInvisible((state) => !state);
	}, []);

	// I updated the useEffect to use a setInterval instead of a setTimeout to update the timeInfo state every 500ms.
	useEffect(() => {
		const interval = setInterval(() => {
			// Calculate the updated values for time left and seconds left
			const updatedSecondsLeft = calculateSecondsLeft(tripTime);
			const updatedTimeLeft = calculateTimeLeft(tripTime);

			// Update the state only if the new values are different from the current values. This avoids unnecessary re-renders if timeLeft hasn't changed.
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

	return (
		<CountdownDisplay
			tripName={tripName}
			tripTime={tripTime}
			setTripName={setTripName}
			updateTripTime={updateTripTime}
			timeInfo={timeInfo}
			isEditable={true}
			isInvisible={isInvisible}
			toggleVisible={toggleVisible}
		/>
	);
}
