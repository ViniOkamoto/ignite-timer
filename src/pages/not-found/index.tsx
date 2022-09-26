import { Button } from '../../components/Button'
import { NotFoundContainer } from './styles'

export default function NotFoundPage() {
  return (
    <NotFoundContainer>
      <div className="wrapper">
        <h1>404</h1>
        <h2>Oops! Something went wrong.</h2>
        <span>The page that you are trying to navigate do not exist</span>
        <Button variant="primary" text="Go back to home page" to="/" />
      </div>
    </NotFoundContainer>
  )
}
