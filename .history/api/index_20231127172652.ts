// apiService.ts
import axios from 'axios'

const apiUrl = 'http://127.0.0.1:8000/api/recipes/'

export async function fetchRecipes() {
  const response = await axios.get(apiUrl)
  console.log(response.data)
  return response.data
}

export async function fetchVegies() {
  const response = await axios.get('http://127.0.0.1:8000/api/stuffs/')
  console.log(response.data)
  return response.data
}
