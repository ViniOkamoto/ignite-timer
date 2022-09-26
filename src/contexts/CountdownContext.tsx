import { v4 as uniqueId } from 'uuid'

import { createContext, ReactNode, useEffect, useContext } from 'react'
import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from './CycleContext'

interface CountdownContextType {
  minutes: string
  seconds: string
}

export const CountdownContext = createContext({} as CountdownContextType)
interface CountdownContextProviderProps {
  children: ReactNode
}
export default function CountdownContextProvider({
  children,
}: CountdownContextProviderProps) {
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
          new Date(activeCycle.startedAt),
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
    } else document.title = `Ignite Timer`
  }, [minutes, seconds, activeCycle])

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
      }}
    >
      {children}
    </CountdownContext.Provider>
  )
}
