import { v4 as uniqueId } from 'uuid'

import { createContext, ReactNode, useState, useReducer } from 'react'
import cyclesReducer, { Cycle } from '../reducers/cycles'

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

export const CyclesContext = createContext({} as CyclesContextType)
interface CyclesContextProviderProps {
  children: ReactNode
}
export default function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })

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
