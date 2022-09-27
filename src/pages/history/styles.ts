import styled from 'styled-components'
import { defaultTheme } from '../../styles/themes/default'

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;
  display: flex;
  flex-direction: column;
  overflow: auto;
  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }
`

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;
  padding-right: 1rem;
  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    min-width: 600px;
    overflow-y: scroll;
    th {
      background-color: ${(props) => props.theme['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme['gray-100']};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${(props) => props.theme['gray-700']};
      border-top: 4px solid ${(props) => props.theme['gray-800']};
      padding: 1rem;
      text-align: left;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        flex: 1;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`

const STATUS_COLORS = {
  completed: defaultTheme['green-500'],
  inProgress: defaultTheme['yellow-500'],
  interrupted: defaultTheme['red-500'],
} as const

type StatusColors = keyof typeof STATUS_COLORS

interface TaskStatusProps {
  statusColor: StatusColors
}
export const TaskStatus = styled.span<TaskStatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${(props) => [STATUS_COLORS[props.statusColor]]};
  }
`

export const EmptyListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;
  svg {
    font-size: 8rem;
    color: ${(props) => props.theme['gray-600']};
  }
  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-300']};
  }
  span {
    margin: 1rem 0 2rem 0;
    color: ${(props) => props.theme['gray-300']};
  }
`
