// apiService.js

const apiUrl = 'http://127.0.0.1:8000/api/recipes/'

export async function fetchRecipes() {
  // Make a GET request to apiUrl
  const response = await fetch(apiUrl)
  const data = await response.json()
  return data
}
