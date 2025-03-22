export function replaceCssClass(
  element: unknown,
  cssClass: string | string[],
  newCssClass: string | string[]
): void {
  if (element instanceof HTMLElement) {
    element.classList.add(...newCssClass);
    element.classList.remove(...cssClass);
  }
}

export function randomFunction(min: number, max: number): number {
  return Math.ceil(Math.random() * (max - min) + min);
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
