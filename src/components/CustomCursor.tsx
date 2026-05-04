import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on desktop with hover capability
    const isTouch = window.matchMedia("(hover: none) or (pointer: coarse)").matches;
    if (isTouch) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    let outerX = 0, outerY = 0;
    let targetX = 0, targetY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      // Inner follows exactly
      inner.style.left = `${e.clientX}px`;
      inner.style.top = `${e.clientY}px`;
    };

    const onMouseDown = () => {
      outer.classList.add("clicking");
      inner.classList.add("clicking");
    };

    const onMouseUp = () => {
      outer.classList.remove("clicking");
      inner.classList.remove("clicking");
    };

    const onMouseEnterInteractive = () => outer.classList.add("hovering");
    const onMouseLeaveInteractive = () => outer.classList.remove("hovering");

    // Lerp outer cursor
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      outerX = lerp(outerX, targetX, 0.12);
      outerY = lerp(outerY, targetY, 0.12);
      outer.style.left = `${outerX}px`;
      outer.style.top = `${outerY}px`;
      rafId = requestAnimationFrame(animate);
    };
    animate();

    // Interactive elements
    const interactiveSelector = "a, button, [role='button'], input, textarea, select, label, .tilt-card";
    const addListeners = () => {
      document.querySelectorAll<HTMLElement>(interactiveSelector).forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };
    addListeners();

    // Re-add on DOM changes
    const mutObs = new MutationObserver(addListeners);
    mutObs.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      mutObs.disconnect();
    };
  }, []);

  return (
    <>
      <div id="cursor-outer" ref={outerRef} aria-hidden="true" />
      <div id="cursor-inner" ref={innerRef} aria-hidden="true" />
    </>
  );
};

export default CustomCursor;
