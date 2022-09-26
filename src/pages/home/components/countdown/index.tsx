import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'
import { CountdownContext } from '../../../../contexts/CountdownContext'
import { CyclesContext } from '../../../../contexts/CycleContext'
import { CountdownContainer, CountDownDivider } from './styles'

export default function Countdown() {
  const { minutes, seconds } = useContext(CountdownContext)
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
