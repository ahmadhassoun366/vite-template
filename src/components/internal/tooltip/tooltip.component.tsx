import './tooltip.scss';
import React, { useRef, useState } from 'react';

type TooltipProps = {
	text: string;
	children: React.ReactNode;
	position?: 'up' | 'down' | 'left' | 'right';
	className?: string;
	large?: boolean;
	trigger?: 'hover' | 'click';
};

export default function Tooltip({
	text,
	children,
	position = 'up',
	className = '',
	large = false,
	trigger = 'hover', // 'hover' | 'click'
}: TooltipProps) {
	const tooltipRef = useRef<HTMLDivElement>(null);
	const timerRef = useRef<any | null>(null);

	const [showTooltip, setShowTooltip] = useState(false);

	function hideAgain() {
		const tooltipElm = tooltipRef.current;

		if (!tooltipElm) return;

		tooltipElm.style.animation = `opR 150ms linear forwards`;

		function handleAnimEnd() {
			setShowTooltip(false);

			if (!tooltipElm) return;
			tooltipElm.removeEventListener('animationend', handleAnimEnd);
		}

		tooltipElm.addEventListener('animationend', handleAnimEnd);
	}

	function handleClick() {
		// Clear any existing timer
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}

		// Show the tooltip
		setShowTooltip(true);

		// Start a new timer to hide the tooltip after 2 seconds
		timerRef.current = setTimeout(() => {
			hideAgain();
		}, 2 * 1000);
	}

	// Define different positions
	const positions = {
		up: 'up',
		down: 'down',
		left: 'left',
		right: 'right',
	};

	const positionClass = positions[position] || 'right'; // default to 'right'

	const eventHandler =
		trigger === 'click'
			? { onClick: handleClick }
			: { onMouseEnter: () => setShowTooltip(true), onMouseLeave: hideAgain };

	return (
		<div className="relative inline-block">
			<div className="tooltip-container-wrapper" {...eventHandler}>
				{children}
			</div>
			{showTooltip && (
				<div
					className={`tooltip ${positionClass} ${className} ${
						large ? 'w-[300px] !text-left' : 'w-max'
					}`}
					ref={tooltipRef}
				>
					{text}
				</div>
			)}
		</div>
	);
}
