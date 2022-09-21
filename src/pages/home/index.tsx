import { v4 as uniqueId } from 'uuid'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { HandPalm, Play } from 'phosphor-react'
import { Button } from '../../components/Button'
import { HomeContainer } from './styles'
import { createContext, useState } from 'react'
import NewCycleForm, {
  taskNameInputId,
  taskDurationInputId,
} from './components/new-cycle-form'
import { FormProvider, useForm } from 'react-hook-form'
import Countdown from './components/countdown'

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
  amountSecondPassed: number
  setSecondsPassed: (string: number) => void
}

export const CyclesContext = createContext({} as CyclesContextType)
const newCycleFormValidationSchema = zod.object({
  taskName: zod.string().min(1, 'Please type the task name'),
  taskDuration: zod
    .number()
    .min(1, 'The task duration in minutes must be more than 5 minutes')
    .max(60, 'The task duration in minutes must be less than 60 minutes'),
})
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export default function HomePage() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondPassed, setAmountSecondPassed] = useState(0)

  const newCycleFormHook = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      taskName: '',
    },
  })
  const { handleSubmit, watch, reset } = newCycleFormHook

  function markCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        }
        return cycle
      }),
    )
    setActiveCycleId(null)
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondPassed(seconds)
  }
  function handleCreateNewCycle(data: NewCycleFormData) {
    console.log(data)
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

  const taskName = watch(taskNameInputId)

  const taskDuration = watch(taskDurationInputId)
  const formIsValid = !taskName || !taskDuration

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCycleAsFinished,
            amountSecondPassed,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleFormHook}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
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
