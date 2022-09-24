export interface Cycle {
  id: string
  taskName: string
  taskDuration: number
  startedAt: Date
  interruptDate?: Date
  finishedDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}
export default function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case 'createNewCycle':
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      }
    case 'markCycleAsFinished':
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, finishedDate: new Date() }
          }
          return cycle
        }),

        activeCycleId: null,
      }
    case 'interruptCurrentCycle':
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, interruptDate: new Date() }
          }
          return cycle
        }),

        activeCycleId: null,
      }
    default:
      return state
  }
}
