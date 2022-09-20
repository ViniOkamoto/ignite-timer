import { differenceInSeconds } from 'date-fns'
import { useState } from 'react'
import { CountdownContainer, CountDownDivider } from './styles'

interface CountdownProps {
  minutes: string
  seconds: string
}
export default function Countdown({
  minutes = '0',
  seconds = '0',
}: CountdownProps) {
  const [amountSecondPassed, setAmountSecondPassed] = useState(0)

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDiff = differenceInSeconds(
          new Date(),
          activeCycle.startedAt,
        )

        if (secondsDiff >= totalSeconds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              }
              return cycle
            }),
          )
          setAmountSecondPassed(0)
          clearInterval(interval)
        } else {
          setAmountSecondPassed(secondsDiff)
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, activeCycleId, totalSeconds])
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
