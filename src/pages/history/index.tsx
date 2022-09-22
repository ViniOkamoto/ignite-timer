import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CycleContext'
import { HistoryContainer, HistoryList, TaskStatus } from './styles'
import { formatDistanceToNow } from 'date-fns'
export default function HistoryPage() {
  const { cycles } = useContext(CyclesContext)
  return (
    <HistoryContainer>
      <h1>My History</h1>

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
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.taskName}</td>
                  <td>{cycle.taskDuration}</td>
                  <td>
                    {formatDistanceToNow(cycle.startedAt, {
                      addSuffix: true,
                    })}
                  </td>
                  <td>
                    {cycle.finishedDate && (
                      <TaskStatus statusColor="completed">Completed</TaskStatus>
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
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
