// Thin bars with a 2px surface gap between stacked segments and a rounded data-end.
export const SEGMENT = { stroke: 'var(--background)', strokeWidth: 2 } as const;
export const END_RADIUS: [number, number, number, number] = [0, 4, 4, 0];
export const TOP_RADIUS: [number, number, number, number] = [4, 4, 0, 0];
