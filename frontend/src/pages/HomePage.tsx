import { useEffect, useState } from 'react'
import { api } from '../api/client'

type Health = { service: string; status: string }

// 세 서버 연결 확인용 임시 화면. 메인 페이지를 만들 때 교체하세요.
export default function HomePage() {
  const [backend, setBackend] = useState('확인 중...')
  const [ai, setAi] = useState('확인 중...')

  useEffect(() => {
    api
      .get<Health>('/health')
      .then((res) => setBackend(res.data.status))
      .catch(() => setBackend('down'))
    api
      .get<Health>('/ai/health')
      .then((res) => setAi(res.data.status))
      .catch(() => setAi('down'))
  }, [])

  return (
    <main style={{ fontFamily: 'sans-serif', padding: 32 }}>
      <h1>PickMe</h1>
      <ul>
        <li>React (5173): ok</li>
        <li>Spring Boot (8080): {backend}</li>
        <li>FastAPI (8000): {ai}</li>
      </ul>
    </main>
  )
}
