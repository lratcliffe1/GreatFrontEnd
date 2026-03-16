import { useEffect, useRef, useState } from "react";

/** Returns the content rect width of the ref'd element, updating on resize. */
export function useContainerWidth(): [React.RefObject<HTMLDivElement | null>, number] {
	const ref = useRef<HTMLDivElement>(null);
	const [width, setWidth] = useState(0);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const ro = new ResizeObserver((entries) => {
			const entry = entries[0];
			if (entry) setWidth(entry.contentRect.width);
		});
		ro.observe(el);
		setWidth(el.getBoundingClientRect().width);
		return () => ro.disconnect();
	}, []);

	return [ref, width];
}
