// utils.js

// I moved all of the functions that were shared between the preview.js and TripCounter.js files were moved here to avoid duplication.
import { useMemo } from "react";

export function calculateSecondsLeft(time) {
	const departureTime = new Date();
	const currentTime = new Date();

	const [hours, minutes] = time.split(":");

	departureTime.setHours(hours);
	departureTime.setMinutes(minutes);
	departureTime.setSeconds(0);

	return Math.floor((departureTime - currentTime) / 1000); // millis to seconds
}

export function getTimeInfoColorClass(secondsLeft) {
	if (secondsLeft < 60) {
		return " timeInfoRed";
	} else if (secondsLeft < 300) {
		return " timeInfoYellow";
	} else {
		return " timeInfoGreen";
	}
}

export function niceHumanTime(time) {
	const now = new Date();

	const [hours, minutes] = time.split(":");

	now.setHours(hours);
	now.setMinutes(minutes);

	return now.toLocaleString("en-us", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});
}

export function calculateTimeLeft(time) {
	const now = new Date();
	const then = new Date();

	const [hours, minutes] = time.split(":");

	now.setHours(hours);
	now.setMinutes(minutes);
	now.setSeconds(0);

	let secondsLeft = (now - then) / 1000; // millis

	// Added check to remove negative time from appearing
	if (secondsLeft <= 0) {
		return "0 SECONDS";
	}

	// The else if statement was not needed here.
	// Changed the variable name for remaining minutes to remainingMinutes to not redeclare the variable 'minutes'
	if (secondsLeft > 3600) {
		let hours = Math.floor(secondsLeft / 3600);
		let remainingMinutes = Math.floor((secondsLeft % 3600) / 60);
		return `${hours} Hours and ${remainingMinutes} minutes`;
	}

	let remainingMinutes = Math.floor(secondsLeft / 60);
	let seconds = Math.floor(secondsLeft % 60);
	return `${remainingMinutes}:${seconds.toString().padStart(2, "0")}`;
}

export function useEncouragementMessage(secondsLeft) {
	return useMemo(() => {
		if (secondsLeft < 300) {
			// less than 5 minutes
			return "Time to go!";
		} else if (secondsLeft < 600) {
			// between 5 and 10 minutes
			return "Almost time to leave!";
		}
		return "Let's go!"; // default message
	}, [secondsLeft]);
}

export function useEncouragementAreaClasses(secondsLeft) {
	return useMemo(() => {
		const classes = ["encouragementArea"];
		if (secondsLeft < 60) {
			classes.push("encouragementAreaRed");
		} else if (secondsLeft < 300) {
			classes.push("encouragementAreaYellow");
		} else {
			classes.push("encouragementAreaGreen");
		}
		return classes.join(" ");
	}, [secondsLeft]);
}
