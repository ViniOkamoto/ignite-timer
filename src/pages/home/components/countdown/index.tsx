import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'
import { CyclesContext } from '../../../../contexts/CycleContext'
import { CountdownContainer, CountDownDivider } from './styles'

export default function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCycleAsFinished,
    amountSecondPassed,
    setSecondsPassed,
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.taskDuration * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondPassed : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDiff = differenceInSeconds(
          new Date(),
          activeCycle.startedAt,
        )

        if (secondsDiff >= totalSeconds) {
          markCycleAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDiff)
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    activeCycleId,
    markCycleAsFinished,
    setSecondsPassed,
    totalSeconds,
  ])

  useEffect(() => {
    if (activeCycle) {
      document.title = `Running ${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <CountDownDivider>:</CountDownDivider>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
