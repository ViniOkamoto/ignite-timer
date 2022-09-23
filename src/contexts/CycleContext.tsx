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

export const CyclesContext = createContext({} as CyclesContextType)
interface CyclesContextProviderProps {
  children: ReactNode
}
export default function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
    return state
  }, [])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondPassed, setAmountSecondPassed] = useState(0)
  const activeCycle = cycles.find((c) => c.id === activeCycleId)
  function markCycleAsFinished() {
    dispatch({
      type: 'markCycleAsFinished',
      payload: {
        activeCycleId,
      },
    })
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, finishedDate: new Date() }
    //     }
    //     return cycle
    //   }),
    // )
    setActiveCycleId(null)
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
    setActiveCycleId(newCycle.id)
    setAmountSecondPassed(0)

    // reset()
  }

  function interruptCurrentCycle() {
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, interruptDate: new Date() }
    //     }
    //     return cycle
    //   }),
    // )
    dispatch({
      type: 'interruptCurrentCycle',
      payload: {
        activeCycleId,
      },
    })
    setActiveCycleId(null)
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
