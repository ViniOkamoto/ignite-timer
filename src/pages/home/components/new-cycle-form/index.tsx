import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../contexts/CycleContext'
import { FormContainer, TaskDurationInput, TaskInput } from './styles'

export const taskNameInputId = 'taskName'
export const taskDurationInputId = 'taskDuration'
export default function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()
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
        step={1}
        min={1}
        max={60}
        {...register(taskDurationInputId, { valueAsNumber: true })}
      />
      <span>minutes.</span>
    </FormContainer>
  )
}
