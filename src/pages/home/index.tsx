import { v4 as uniqueId } from 'uuid'
import { differenceInSeconds } from 'date-fns'

import { HandPalm, Play } from 'phosphor-react'
import { Button } from '../../components/Button'
import { HomeContainer } from './styles'
import { useEffect, useState } from 'react'
import Countdown from './components/countdown'

interface Cycle {
  id: string
  taskName: string
  taskDuration: number
  startedAt: Date
  interruptDate?: Date
  finishedDate?: Date
}

export default function HomePage() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

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

  const totalSeconds = activeCycle ? activeCycle.taskDuration * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondPassed : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  const taskNameInputId = 'taskName'
  const taskName = watch(taskNameInputId)
  const taskDurationInputId = 'taskDuration'
  const taskDuration = watch(taskDurationInputId)
  const formIsValid = !taskName || !taskDuration

  useEffect(() => {
    if (activeCycle) {
      document.title = `Running ${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <Countdown minutes={minutes} seconds={seconds} />
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
