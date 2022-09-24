import { v4 as uniqueId } from 'uuid'

import {
  createContext,
  ReactNode,
  useState,
  useReducer,
  useEffect,
} from 'react'
import cyclesReducer from '../reducers/cycles/reducer'
import {
  ActionTypes,
  addNewCycleAction as createNewCycleAction,
  interruptCurrentCycleAction,
  markCycleAsFinishedAction,
} from '../reducers/cycles/actions'
import { Cycle } from '../models/Cycle'
import { differenceInSeconds } from 'date-fns'

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
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateAsJson = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0',
      )
      if (storedStateAsJson) {
        console.log(storedStateAsJson)
        return JSON.parse(storedStateAsJson)
      }
      return {
        cycles: [],
        activeCycleId: null,
      }
    },
  )

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((c) => c.id === activeCycleId)

  const [amountSecondPassed, setAmountSecondPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startedAt))
    }
    return 0
  })
  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  function markCycleAsFinished() {
    dispatch(markCycleAsFinishedAction())
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

    dispatch(createNewCycleAction(newCycle))

    setAmountSecondPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
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
