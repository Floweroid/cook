// apiService.ts
import axios from 'axios'

const apiUrl = 'http://127.0.0.1:8000/api/recipes/'

export async function fetchRecipes() {
  const response = await axios.get(apiUrl)
  console.log(response.data)
  return response.data
}

export async function fetchStuffs() {
  const apiUrl = 'http://127.0.0.1:8000/api/stuffs/'

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    return data
  }
  catch (error) {
    console.error('Error fetching stuffs:', error)
    throw error // Rethrow the error to handle it where you call fetchStuffs
  }
}

// Function to filter and map stuff items based on their type
async function getStuffByType(type: string): Promise<StuffItem[]> {
  const stuffs = await fetchStuffs()

  return stuffs
    .filter((stuff: { type: string }) => stuff.type === type)
    .map((stuff: StuffItem) => ({ name: stuff.name, emoji: stuff.emoji }))
}
