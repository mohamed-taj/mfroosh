export function scrollBy(container: HTMLDivElement | null, direction: 'left' | 'right', amount = 320) {
  if (!container) return;
  // In Arabic we invert the meaning of the left/right button so the visual movement matches RTL expectations
  const delta = direction === 'right' ? amount : -amount;
  const newScrollLeft = container.scrollLeft + delta;
  container.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
}
