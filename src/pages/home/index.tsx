import { Play } from 'phosphor-react'
import { Button } from '../../components/Button'
import {
  CountdownContainer,
  CountDownDivider,
  FormContainer,
  HomeContainer,
} from './styles'

export default function HomePage() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task-name">I will work on</label>
          <input type="text" name="Task name" id="task-name" />
          <label htmlFor="task-duration">during</label>
          <input type="text" name="During in minutes" id="task-duration" />
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
