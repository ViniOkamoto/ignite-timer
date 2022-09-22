import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { HandPalm, Play } from 'phosphor-react'
import { Button } from '../../components/Button'
import { HomeContainer } from './styles'
import NewCycleForm, {
  taskNameInputId,
  taskDurationInputId,
} from './components/new-cycle-form'
import { FormProvider, useForm } from 'react-hook-form'
import Countdown from './components/countdown'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CycleContext'

const newCycleFormValidationSchema = zod.object({
  taskName: zod.string().min(1, 'Please type the task name'),
  taskDuration: zod
    .number()
    .min(1, 'The task duration in minutes must be more than 5 minutes')
    .max(60, 'The task duration in minutes must be less than 60 minutes'),
})
export type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export default function HomePage() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)
  const newCycleFormHook = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      taskName: '',
    },
  })
  const { handleSubmit, watch, reset } = newCycleFormHook

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const taskName = watch(taskNameInputId)

  const taskDuration = watch(taskDurationInputId)
  const formIsValid = !taskName || !taskDuration

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleFormHook}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        {activeCycle ? (
          <Button
            text="Stop countdown"
            icon={<HandPalm size={24} />}
            variant="danger"
            type="button"
            onClick={interruptCurrentCycle}
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
