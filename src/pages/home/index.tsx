import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { Play } from 'phosphor-react'
import { Button } from '../../components/Button'
import {
  CountdownContainer,
  CountDownDivider,
  FormContainer,
  HomeContainer,
  TaskDurationInput,
  TaskInput,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  taskName: zod.string().min(1, 'Please type the task name'),
  taskDuration: zod
    .number()
    .min(5, 'The task duration in minutes must be more than 5 minutes')
    .max(60, 'The task duration in minutes must be less than 60 minutes'),
})

export default function HomePage() {
  const { register, handleSubmit, watch } = useForm({
    resolver: zodResolver(newCycleFormValidationSchema),
  })
  function handleCreateNewCycle(data: any) {
    console.log(data)
  }

  const taskName = watch('task-name')
  const taskDuration = watch('task-duration')
  const formIsValid = !taskName || !taskDuration

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task-name">I will work on</label>
          <TaskInput
            id="task-name"
            list="task-suggestions"
            placeholder="Prepare layout"
            type="text"
            {...register('task-name')}
          />
          <datalist id="task-suggestions">
            <option value="P1" />
            <option value="P2" />
            <option value="P3" />
            <option value="P4" />
          </datalist>
          <label htmlFor="task-duration">during</label>
          <TaskDurationInput
            id="task-duration"
            placeholder="00"
            type="number"
            step={5}
            min={5}
            max={60}
            {...register('task-duration', { valueAsNumber: true })}
          />
          <span>minutes.</span>
        </FormContainer>
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <CountDownDivider>:</CountDownDivider>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        <Button
          text="Começar"
          disabled={formIsValid}
          icon={<Play size={24} />}
          variant="primary"
        />
      </form>
    </HomeContainer>
  )
}
