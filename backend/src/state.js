import { State, Event } from "./models.js";
import { nextGateState } from "./gate.js";

const CAPACITY = Number(process.env.CAPACITY ?? 30);
const GATE_LOW = Number(process.env.GATE_LOW ?? 10);
const GATE_HIGH = Number(process.env.GATE_HIGH ?? 30);

export async function getState() {
  let state = await State.findById("current");
  if (!state) state = await State.create({ _id: "current" });
  return state;
}

export async function applyEvent(type, camera) {
  const state = await getState();

  if (type === "enter") {
    state.occupancy += 1;
    state.totalEntries += 1;
  } else if (type === "exit") {
    // don't go negative - an exit on an empty room is a miscount
    if (state.occupancy > 0) {
      state.occupancy -= 1;
      state.totalExits += 1;
    }
  } else {
    throw new Error(`Unknown event type: ${type}`);
  }

  state.gate = nextGateState(state.occupancy, state.gate, GATE_LOW, GATE_HIGH);
  await state.save();
  await Event.create({ type, camera });

  return toStatus(state);
}

export async function resetState() {
  const state = await getState();
  state.occupancy = 0;
  state.totalEntries = 0;
  state.totalExits = 0;
  state.gate = nextGateState(0, state.gate, GATE_LOW, GATE_HIGH);
  await state.save();
  return toStatus(state);
}

export function toStatus(state) {
  return {
    occupancy: state.occupancy,
    capacity: CAPACITY,
    gate: state.gate,
    overCapacity: state.occupancy > CAPACITY,
    totalEntries: state.totalEntries,
    totalExits: state.totalExits,
    thresholds: { low: GATE_LOW, high: GATE_HIGH },
    updatedAt: state.updatedAt,
  };
}
