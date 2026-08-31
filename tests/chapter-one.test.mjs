import assert from "node:assert/strict";
import test from "node:test";
import { BOOKING_IDS, TICKET_SUFFIX, allOrdersCancelled, chapterReducer, initialChapterState } from "../lib/chapter-one.ts";

const validCancel = (id) => ({ type: "cancel", id, code: TICKET_SUFFIX, policyAccepted: true, ticketOpened: true, passengerIds: ["zhou", "lin"] });
function permutations(items) {
  if (!items.length) return [[]];
  return items.flatMap((item, index) => permutations(items.filter((_, i) => i !== index)).map((rest) => [item, ...rest]));
}

test("all 120 cancellation orders trigger the notification only on the fifth booking", () => {
  const orders = permutations([...BOOKING_IDS]);
  assert.equal(orders.length, 120);
  for (const order of orders) {
    let state = initialChapterState();
    order.forEach((id, index) => {
      state = chapterReducer(state, validCancel(id));
      assert.equal(state.notification, index === 4 ? "visible" : "unseen", order.join(","));
      assert.equal(allOrdersCancelled(state), index === 4);
    });
  }
});

test("a guessed booking id and missing prerequisites cannot complete an order", () => {
  const initial = initialChapterState();
  for (const action of [
    { type: "cancel", id: "invented" },
    { type: "cancel", id: "lighthouse", code: "1351" },
    { type: "cancel", id: "lighthouse", code: "" },
    { type: "cancel", id: "mountain", policyAccepted: false },
    { type: "cancel", id: "salt", ticketOpened: false },
    { type: "cancel", id: "return", passengerIds: [] },
    { type: "cancel", id: "return", passengerIds: ["invented"] },
  ]) assert.equal(chapterReducer(initial, action), initial);
});

test("the downloaded ticket's suffix validates, with incidental whitespace tolerated", () => {
  const state = chapterReducer(initialChapterState(), { type: "cancel", id: "lighthouse", code: " " + TICKET_SUFFIX + " " });
  assert.equal(state.cancelled.lighthouse, true);
});

test("one refunded passenger is not a cancelled return booking", () => {
  let state = BOOKING_IDS.filter((id) => id !== "return").reduce((s, id) => chapterReducer(s, validCancel(id)), initialChapterState());
  state = chapterReducer(state, { type: "cancel", id: "return", passengerIds: ["zhou", "zhou", "unknown"] });
  assert.deepEqual(state.refundedPassengers, ["zhou"]);
  assert.equal(state.cancelled.return, false);
  assert.equal(state.notification, "unseen");
  assert.equal(chapterReducer(state, { type: "cancel", id: "return", passengerIds: ["zhou"] }), state);
  state = chapterReducer(state, { type: "cancel", id: "return", passengerIds: ["lin"] });
  assert.equal(state.notification, "visible");
  assert.equal(allOrdersCancelled(state), true);
});

test("repeat cancellation cannot duplicate the notification or resurrect a dismissed toast", () => {
  let state = BOOKING_IDS.reduce((s, id) => chapterReducer(s, validCancel(id)), initialChapterState());
  const visible = state;
  for (const id of BOOKING_IDS) assert.equal(chapterReducer(state, validCancel(id)), visible);
  state = chapterReducer(state, { type: "dismiss-notification" });
  assert.equal(state.notification, "dismissed");
  assert.equal(allOrdersCancelled(state), true, "notification centre can still retrieve the booking");
  for (const id of BOOKING_IDS) assert.equal(chapterReducer(state, validCancel(id)), state);
});

test("manual note checkmarks neither advance nor block the actual cancellation gate", () => {
  const noteMarks = [...BOOKING_IDS];
  const initial = initialChapterState();
  assert.equal(noteMarks.length, 5);
  assert.equal(allOrdersCancelled(initial), false);
  assert.equal(initial.notification, "unseen");
  noteMarks.splice(0);
  const finished = BOOKING_IDS.reduce((s, id) => chapterReducer(s, validCancel(id)), initial);
  assert.equal(noteMarks.length, 0);
  assert.equal(finished.notification, "visible");
});

test("reducer does not mutate earlier state or passenger arrays", () => {
  const initial = initialChapterState();
  Object.freeze(initial.cancelled); Object.freeze(initial.refundedPassengers); Object.freeze(initial);
  const first = chapterReducer(initial, { type: "cancel", id: "return", passengerIds: ["lin"] });
  const second = chapterReducer(first, { type: "cancel", id: "return", passengerIds: ["zhou"] });
  assert.deepEqual(initial.refundedPassengers, []);
  assert.deepEqual(first.refundedPassengers, ["lin"]);
  assert.equal(first.cancelled.return, false);
  assert.equal(second.cancelled.return, true);
});
