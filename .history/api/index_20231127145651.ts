// apiService.ts
import axios from 'axios'

const apiUrl = 'http://127.0.0.1:8000/api/recipes/'

export async function fetchRecipes() {
  const response = await axios.get(apiUrl)
  return response.data
}
