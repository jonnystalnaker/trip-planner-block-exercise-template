// CountdownDisplay.js
import { RichText } from "@wordpress/block-editor";
import { Button, Popover, TextControl } from "@wordpress/components";
import { edit } from "@wordpress/icons";
import { useCallback } from "react";
import {
	getTimeInfoColorClass,
	niceHumanTime,
	useEncouragementAreaClasses,
	useEncouragementMessage,
} from "./utils";

export default function CountdownDisplay({
	tripName,
	tripTime,
	setTripName,
	updateTripTime,
	timeInfo,
	isEditable,
	isInvisible,
	toggleVisible,
}) {
	const { timeLeft, secondsLeft } = timeInfo;

	// Memoized encouragement message
	const encouragementMessage = useEncouragementMessage(secondsLeft);

	// Memoized classes for encouragement area
	const encouragementAreaClasses = useEncouragementAreaClasses(secondsLeft);

	const timeInfoColorClass = getTimeInfoColorClass(secondsLeft);

	return (
		// Switched to className here for proper JSX.
		<div className="CountdownPage">
			<RichText
				tagName="h2"
				value={tripName}
				onChange={setTripName}
				withoutInteractiveFormatting
				placeholder="Trip name"
				allowedFormats={[]}
			/>
			<div className={"timeInfo" + timeInfoColorClass}>
				<div>Out the door at {niceHumanTime(tripTime)}</div>
				<div className="time-info-wrapper">
					<span>{timeLeft} LEFT!</span>
					{isEditable && (
						<Button
							variant="tertiary"
							icon={edit}
							aria-label="Edit Trip Time"
							onClick={toggleVisible}
						/>
					)}
					{/* Only render the Popover component when isInvisible is false. */}
					{isEditable && !isInvisible && (
						<Popover onClose={toggleVisible}>
							<div className="time-popup-styles">
								<TextControl
									label="Trip Time"
									value={tripTime}
									placeholder="Enter trip time"
									onChange={updateTripTime}
									type="time"
								/>
							</div>
						</Popover>
					)}
				</div>
			</div>
			<div className="otherStuff">
				<div className={encouragementAreaClasses}>{encouragementMessage}</div>
			</div>
		</div>
	);
}
