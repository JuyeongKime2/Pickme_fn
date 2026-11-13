import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'

// 기능별 페이지를 여기에 추가: /login, /decision, /history, /community, /chat
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}
