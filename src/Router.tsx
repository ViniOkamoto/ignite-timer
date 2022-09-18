import { Routes, Route } from 'react-router-dom'
import DefaultLayout from './layouts/default-layout'
import HistoryPage from './pages/history/History'
import HomePage from './pages/home'
import NotFoundPage from './pages/NotFound'

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
