import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'
import consola from 'consola'

import { fetchRecipes } from '../api'

// Import the function to fetch recipes
import type { RecipeItem, Recipes } from '../types'

// convert.ts
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const recipeCsvFile = path.resolve(__dirname, '../data/recipe.csv')
const recipeJsonFile = path.resolve(__dirname, '../data/recipe.json')

async function run() {
  try {
    // Fetch recipes from the API
    const apiRecipes = await fetchRecipes()

    // Update the JSON file with the new data
    fs.writeFileSync(recipeJsonFile, JSON.stringify(apiRecipes, null, 2))
    consola.success(`Recipe JSON file updated successfully.`)
  }
  catch (error) {
    consola.error(`Error updating recipe JSON file: ${error.message}`)
  }
}

run()
