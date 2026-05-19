/**
 * Utility: moment.tsx
 * Provides date/time helpers derived from the current date at runtime.
 *
 * BUG FIX: Previously the date was computed once at module-load time (a
 * module-level constant). This means the displayed date NEVER updates for
 * long-running sessions (e.g. if the tab is left open past midnight).
 * Now we export functions so callers always get the real current time.
 */

/** Return a fresh Date so each call reflects the real "now" */
const now = () => new Date();

export const getYears = now().getFullYear();
export const getMonthIdn = now().toLocaleDateString("id-ID", { month: "long" });
/** 0-indexed month, as required by the prayer API */
export const getMonth = now().getMonth();
export const getDate = now().getDate();
export const getDayIdn = now().toLocaleDateString("id-ID", { weekday: "long" });
