"use client";

import { Children, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

interface SliderProps {
  label: string;
  children: ReactNode;
  /** Width of each slide on small screens. */
  itemClassName?: string;
  /** Layout applied from the md breakpoint, where the slider becomes a grid. */
  gridClassName?: string;
}

/**
 * Touch slider on phones (native scroll-snap, swipe, keyboard scrollable),
 * a regular grid from tablet upwards.
 */
export function Slider({ label, children, itemClassName, gridClassName }: SliderProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const items = Children.toArray(children);

  function paddingLeft(list: HTMLElement) {
    return parseFloat(getComputedStyle(list).paddingLeft) || 0;
  }

  function goTo(target: number) {
    const list = listRef.current;
    const clamped = Math.max(0, Math.min(items.length - 1, target));
    const item = list?.children[clamped] as HTMLElement | undefined;
    if (!list || !item) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left: item.offsetLeft - paddingLeft(list), behavior: reduceMotion ? "auto" : "smooth" });
  }

  function handleScroll() {
    const list = listRef.current;
    if (!list) return;
    const offset = list.scrollLeft + paddingLeft(list);
    let closest = 0;
    let smallest = Number.POSITIVE_INFINITY;
    Array.from(list.children).forEach((child, i) => {
      const distance = Math.abs((child as HTMLElement).offsetLeft - offset);
      if (distance < smallest) {
        smallest = distance;
        closest = i;
      }
    });
    setIndex(closest);
  }

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <ul
        ref={listRef}
        onScroll={handleScroll}
        tabIndex={0}
        className={cn(
          "no-scrollbar relative -mx-(--gutter) flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-(--gutter) px-(--gutter) pb-2 focus-visible:outline-offset-[-2px] md:mx-0 md:grid md:snap-none md:overflow-visible md:px-0 md:pb-0",
          gridClassName,
        )}
      >
        {items.map((child, i) => (
          <li key={i} className={cn("shrink-0 snap-start md:w-auto", itemClassName)}>
            {child}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between gap-4 md:hidden">
        <p className="text-sm font-semibold tabular-nums text-ink-soft" aria-live="polite">
          {String(index + 1).padStart(2, "0")} <span className="text-ink-soft/60">/ {String(items.length).padStart(2, "0")}</span>
        </p>
        <div aria-hidden="true" className="flex flex-1 gap-1.5">
          {items.map((_, i) => (
            <span
              key={i}
              className={cn("h-0.5 flex-1 transition-colors duration-300", i === index ? "bg-gold" : "bg-line")}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="Previous"
            className="grid size-11 place-items-center rounded-[2px] border border-line text-navy transition-colors hover:border-navy disabled:opacity-40"
          >
            <Icon name="chevronLeft" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            disabled={index === items.length - 1}
            aria-label="Next"
            className="grid size-11 place-items-center rounded-[2px] border border-line text-navy transition-colors hover:border-navy disabled:opacity-40"
          >
            <Icon name="chevronRight" />
          </button>
        </div>
      </div>
    </div>
  );
}
