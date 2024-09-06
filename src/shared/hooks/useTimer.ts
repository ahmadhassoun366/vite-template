import { useEffect, useRef, useState } from 'react';

export function useTimer(targetDate: Date): {
	days: number;
	hours: number;
	mins: number;
	secs: number;
} {
	const [timeLeft, setTimeLeft] = useState<{
		days: number;
		hours: number;
		mins: number;
		secs: number;
	}>({ days: 0, hours: 0, mins: 0, secs: 0 });

	const intervalRef = useRef<any>();

	useEffect(() => {
		intervalRef.current = setInterval(() => {
			const now = Date.now();
			const target = new Date(targetDate);

			// Calculate time difference in milliseconds
			const diff = target.getTime() - now;

			// Check if target date has passed
			if (diff <= 0) {
				setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
				clearInterval(intervalRef.current!);
				return;
			}

			// Calculate remaining time in days, hours, minutes, and seconds
			const days = Math.floor(diff / (1000 * 60 * 60 * 24));
			const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

			// calculate minutes and seconds
			const mins = Math.floor((diff / 1000 / 60) % 60);
			const secs = Math.floor((diff / 1000) % 60);

			// Update state with the calculated remaining time
			setTimeLeft({ days, hours, mins, secs });
		}, 1000);

		// Cleanup function to clear the interval
		return () => clearInterval(intervalRef.current!);
	}, [targetDate]); // Only run effect when targetDate changes

	return timeLeft;
}
