import { useForm } from 'react-hook-form'
import { FormContainer, TaskDurationInput, TaskInput } from './styles'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

const newCycleFormValidationSchema = zod.object({
  taskName: zod.string().min(1, 'Please type the task name'),
  taskDuration: zod
    .number()
    .min(5, 'The task duration in minutes must be more than 5 minutes')
    .max(60, 'The task duration in minutes must be less than 60 minutes'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export default function NewCycleForm() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      taskName: '',
    },
  })

  return (
    <FormContainer>
      <label htmlFor={taskNameInputId}>I will work on</label>
      <TaskInput
        id={taskNameInputId}
        list="task-suggestions"
        placeholder="Prepare layout"
        disabled={!!activeCycle}
        type="text"
        {...register(taskNameInputId)}
      />
      <datalist id="task-suggestions">
        <option value="P1" />
        <option value="P2" />
        <option value="P3" />
        <option value="P4" />
      </datalist>
      <label htmlFor="task-duration">during</label>
      <TaskDurationInput
        id={taskDurationInputId}
        disabled={!!activeCycle}
        placeholder="00"
        type="number"
        step={5}
        min={5}
        max={60}
        {...register(taskDurationInputId, { valueAsNumber: true })}
      />
      <span>minutes.</span>
    </FormContainer>
  )
}
