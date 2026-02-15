import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3001',
})

export const fetchHabbits = async (userId: string) => {
  return instance.get('/api/habbits', { params: { userId } })
}
