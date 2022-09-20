import { v4 as uniqueId } from 'uuid'
import { differenceInSeconds } from 'date-fns'

import { HandPalm, Play } from 'phosphor-react'
import { Button } from '../../components/Button'
import { HomeContainer } from './styles'
import { createContext, useEffect, useState } from 'react'
import Countdown from './components/countdown'
import NewCycleForm from './components/new-cycle-form'

interface Cycle {
  id: string
  taskName: string
  taskDuration: number
  startedAt: Date
  interruptDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCycleAsFinished: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

export default function HomePage() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  function markCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        }
        return cycle
      }),
    )
  }

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: uniqueId(),
      taskName: data.taskName,
      taskDuration: data.taskDuration,
      startedAt: new Date(),
    }

    setCycles((prev) => [...prev, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondPassed(0)

    reset()
  }

  function handleInterruptButton() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptDate: new Date() }
        }
        return cycle
      }),
    )
    setActiveCycleId(null)
  }

  const activeCycle = cycles.find((c) => c.id === activeCycleId)

  const taskNameInputId = 'taskName'
  const taskName = watch(taskNameInputId)
  const taskDurationInputId = 'taskDuration'
  const taskDuration = watch(taskDurationInputId)
  const formIsValid = !taskName || !taskDuration

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyclesContext.Provider
          value={{ activeCycle, activeCycleId, markCycleAsFinished }}
        >
          <NewCycleForm />
          <Countdown minutes={minutes} seconds={seconds} />
        </CyclesContext.Provider>
        {activeCycle ? (
          <Button
            text="Stop countdown"
            icon={<HandPalm size={24} />}
            variant="danger"
            type="button"
            onClick={handleInterruptButton}
          />
        ) : (
          <Button
            text="Start"
            disabled={formIsValid}
            icon={<Play size={24} />}
            variant="primary"
            type="submit"
          />
        )}
      </form>
    </HomeContainer>
  )
}
