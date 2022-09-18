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

export default function HomePage() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task-name">I will work on</label>
          <TaskInput
            id="task-name"
            list="task-suggestions"
            placeholder="Prepare layout"
            type="text"
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
            max={60}
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
          disabled
          icon={<Play size={24} />}
          variant="primary"
        />
      </form>
    </HomeContainer>
  )
}
