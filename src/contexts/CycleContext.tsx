import { v4 as uniqueId } from 'uuid'

import { createContext, ReactNode, useState, useReducer } from 'react'

interface Cycle {
  id: string
  taskName: string
  taskDuration: number
  startedAt: Date
  interruptDate?: Date
  finishedDate?: Date
}

interface CreateCycleData {
  taskName: string
  taskDuration: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCycleAsFinished: () => void
  amountSecondPassed: number
  setSecondsPassed: (string: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}
export const CyclesContext = createContext({} as CyclesContextType)
interface CyclesContextProviderProps {
  children: ReactNode
}
export default function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: any) => {
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
    },
    {
      cycles: [],
      activeCycleId: null,
    },
  )
  const { cycles, activeCycleId } = cyclesState
  const [amountSecondPassed, setAmountSecondPassed] = useState(0)
  const activeCycle = cycles.find((c) => c.id === activeCycleId)
  function markCycleAsFinished() {
    dispatch({
      type: 'markCycleAsFinished',
      payload: {
        activeCycleId,
      },
    })
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondPassed(seconds)
  }

  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: uniqueId(),
      taskName: data.taskName,
      taskDuration: data.taskDuration,
      startedAt: new Date(),
    }

    // setCycles((prev) => [...prev, newCycle])
    dispatch({
      type: 'createNewCycle',
      payload: {
        newCycle,
      },
    })

    setAmountSecondPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch({
      type: 'interruptCurrentCycle',
      payload: {
        activeCycleId,
      },
    })
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCycleAsFinished,
        amountSecondPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
