export function scrollBy(container: HTMLDivElement | null, direction: 'left' | 'right', amount = 320) {
  if (!container) return;
  const delta = direction === 'left' ? -amount : amount;
  const newScrollLeft = container.scrollLeft + delta;
  container.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
}
