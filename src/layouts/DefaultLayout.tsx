import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

interface DefaultLayoutProps {}
export function DefaultLayout(props: DefaultLayoutProps) {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
