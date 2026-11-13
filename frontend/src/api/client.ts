import axios from 'axios'

// 모든 요청은 /api 로 시작 -> vite proxy -> Spring Boot
export const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
})
