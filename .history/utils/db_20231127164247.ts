import type { Table } from 'dexie'
import Dexie from 'dexie'
import { fetchRecipes } from '~/api'

import type { RecipeItem } from '~/types'

export interface DbRecipeItem extends RecipeItem {
  id?: number
}

export class MySubClassedDexie extends Dexie {
  recipes!: Table<DbRecipeItem>

  constructor() {
    super('cook-db')
    this.version(1).stores({
      recipes: '++id, name, stuff, bv, difficulty, tags, methods, tools, link, description', // Primary key and indexed props
    })
  }
}

export const db = new MySubClassedDexie()

export async function initDb() {
  const { default: recipeData } = await import('../data/recipe.json')

  return db.recipes.bulkPut(
    (recipeData as RecipeItem[]).map((item, i) => ({
      id: i,
      ...item,
    })),
  )
}

// db.ts

// export async function initDb() {
//   try {
//     // Fetch data from the API
//     const apiRecipes = await fetchRecipes()

//     // Transaction to update the 'recipes' table
//     await db.transaction('rw', db.recipes, async () => {
//       // Clear existing data in the 'recipes' table
//       await db.recipes.clear()

//       // Insert the new data from the API into the 'recipes' table
//       await db.recipes.bulkPut(
//         apiRecipes.map((item, i) => ({
//           id: i + 1, // Assuming your API returns data without an 'id'
//           ...item,
//         })),
//       )
//     })

//     console.log('Database initialized successfully with API data.')
//   }
//   catch (error) {
//     console.error('Error initializing the database:', error)
//   }
// }
