"use client";

import { useCallback, useEffect, useRef } from "react";

const DEFAULT_IDLE_TIMEOUT = 5 * 60 * 1000;

const ACTIVITY_EVENTS: (keyof WindowEventMap)[] = [
	"mousemove",
	"mousedown",
	"keydown",
	"touchstart",
	"scroll",
	"wheel",
];

export interface UseIdleOptions {
	/**
	 * Time in milliseconds before user is considered idle.
	 * @default 300000 (5 minutes)
	 */
	timeout?: number;

	/**
	 * Callback fired when user becomes idle.
	 * Only fires once per idle period.
	 */
	onIdle: () => void;

	/**
	 * Whether the idle detection is enabled.
	 * Useful for disabling during certain states.
	 * @default true
	 */
	enabled?: boolean;
}

export function useIdle({
	timeout = DEFAULT_IDLE_TIMEOUT,
	onIdle,
	enabled = true,
}: UseIdleOptions): void {
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const hasTriggeredRef = useRef(false);

	const clearTimer = useCallback(() => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
	}, []);

	const startTimer = useCallback(() => {
		clearTimer();

		// Don't start if already triggered or disabled
		if (hasTriggeredRef.current || !enabled) return;

		timerRef.current = setTimeout(() => {
			hasTriggeredRef.current = true;
			onIdle();
		}, timeout);
	}, [clearTimer, timeout, onIdle, enabled]);

	const handleActivity = useCallback(() => {
		// If already triggered, reset the flag on new activity
		if (hasTriggeredRef.current) {
			hasTriggeredRef.current = false;
		}

		startTimer();
	}, [startTimer]);

	useEffect(() => {
		if (!enabled) {
			clearTimer();
			return;
		}

		// Start the initial timer
		startTimer();

		// Add activity listeners
		for (const event of ACTIVITY_EVENTS) {
			window.addEventListener(event, handleActivity, { passive: true });
		}

		return () => {
			clearTimer();
			for (const event of ACTIVITY_EVENTS) {
				window.removeEventListener(event, handleActivity);
			}
		};
	}, [enabled, startTimer, handleActivity, clearTimer]);
}
