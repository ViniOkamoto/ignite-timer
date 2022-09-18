import { HistoryContainer, HistoryList, TaskStatus } from './styles'

export default function HistoryPage() {
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
            <tr>
              <td>Task ASDJASIDJAIOSJDIOAJSIOJASOIJDOIAJSIO</td>
              <td>20 minutes</td>
              <td>2 months ago</td>
              <td>
                <TaskStatus statusColor="inProgress">Pending</TaskStatus>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>2 months ago</td>
              <td>
                <TaskStatus statusColor="inProgress">Pending</TaskStatus>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>2 months ago</td>
              <td>
                <TaskStatus statusColor="inProgress">Pending</TaskStatus>
              </td>
            </tr>
            <tr>
              <td>Task</td>
              <td>20 minutes</td>
              <td>2 months ago</td>
              <td>
                <TaskStatus statusColor="inProgress">Pending</TaskStatus>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
