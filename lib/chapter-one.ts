export const BOOKING_IDS = ["south", "lighthouse", "mountain", "salt", "return"] as const;
export type BookingId = (typeof BOOKING_IDS)[number];
export const TICKET_SUFFIX = "7642";
export const PASSENGERS = ["lin", "zhou"] as const;

export type ChapterState = {
  cancelled: Record<BookingId, boolean>;
  refundedPassengers: string[];
  notification: "unseen" | "visible" | "dismissed";
};
export type CancelAction = {
  type: "cancel";
  id: BookingId;
  code?: string;
  policyAccepted?: boolean;
  ticketOpened?: boolean;
  passengerIds?: string[];
};
export type ChapterAction = CancelAction | { type: "dismiss-notification" };

export function initialChapterState(): ChapterState {
  return {
    cancelled: { south: false, lighthouse: false, mountain: false, salt: false, return: false },
    refundedPassengers: [],
    notification: "unseen",
  };
}

export function allOrdersCancelled(state: ChapterState): boolean {
  return BOOKING_IDS.every((id) => state.cancelled[id]);
}

// The itinerary notes deliberately do not participate in this reducer.
export function chapterReducer(state: ChapterState, action: ChapterAction): ChapterState {
  if (action.type === "dismiss-notification") {
    return state.notification === "visible" ? { ...state, notification: "dismissed" } : state;
  }
  if (!BOOKING_IDS.includes(action.id) || state.cancelled[action.id]) return state;
  if (action.id === "lighthouse" && action.code?.trim() !== TICKET_SUFFIX) return state;
  if (action.id === "mountain" && !action.policyAccepted) return state;
  if (action.id === "salt" && !action.ticketOpened) return state;

  let refundedPassengers = state.refundedPassengers;
  if (action.id === "return") {
    const valid = (action.passengerIds ?? []).filter((id) => PASSENGERS.some((passenger) => passenger === id));
    if (!valid.some((id) => !refundedPassengers.includes(id))) return state;
    refundedPassengers = [...new Set([...refundedPassengers, ...valid])];
  }
  const next: ChapterState = {
    ...state,
    refundedPassengers,
    cancelled: {
      ...state.cancelled,
      [action.id]: action.id !== "return" || PASSENGERS.every((id) => refundedPassengers.includes(id)),
    },
  };
  if (allOrdersCancelled(next) && state.notification === "unseen") next.notification = "visible";
  return next;
}
