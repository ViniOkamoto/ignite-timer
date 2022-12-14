import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CycleContext'
import {
  EmptyListContainer,
  HistoryContainer,
  HistoryList,
  TaskStatus,
} from './styles'
import { formatDistanceToNow } from 'date-fns'
import { SmileyBlank } from 'phosphor-react'
import { Button } from '../../components/Button'
export default function HistoryPage() {
  const { cycles } = useContext(CyclesContext)
  return (
    <HistoryContainer>
      <h1>My History</h1>
      {cycles.length > 0 ? (
        <HistoryList>
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Duration</th>
                <th>Started</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {cycles
                .map((cycle) => {
                  return (
                    <tr key={cycle.id}>
                      <td>{cycle.taskName}</td>
                      <td>{`${cycle.taskDuration} minutes`}</td>
                      <td>
                        {formatDistanceToNow(new Date(cycle.startedAt), {
                          addSuffix: true,
                        })}
                      </td>
                      <td>
                        {cycle.finishedDate && (
                          <TaskStatus statusColor="completed">
                            Completed
                          </TaskStatus>
                        )}
                        {cycle.interruptDate && (
                          <TaskStatus statusColor="interrupted">
                            Interrupted
                          </TaskStatus>
                        )}
                        {!cycle.finishedDate && !cycle.interruptDate && (
                          <TaskStatus statusColor="inProgress">
                            In progress
                          </TaskStatus>
                        )}
                      </td>
                    </tr>
                  )
                })
                .reverse()}
            </tbody>
          </table>
        </HistoryList>
      ) : (
        <EmptyListContainer>
          <SmileyBlank />
          <h1>Oops! You do not have any task</h1>
          <span>
            It is easy to create, set up your task and start the countdown
          </span>
          <Button variant="primary" to="/" text="Go to countdownn"></Button>
        </EmptyListContainer>
      )}
    </HistoryContainer>
  )
}
