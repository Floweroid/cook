// Your store or component file

import { db } from '../../utils/db'
import { fetchRecipes } from '~/api/index'

// ... other imports ...

export const useRecipeStore = defineStore('recipe', () => {
  // ... other store code ...

  async function reset() {
    try {
      // Fetch data from the API
      const apiRecipes = await fetchRecipes()

      // Use Dexie to update the database with the new data
      await db.transaction('rw', db.recipes, async () => {
        // Clear existing data in the 'recipes' table
        await db.recipes.clear()

        // Insert the new data from the API into the 'recipes' table
        await db.recipes.bulkPut(
          apiRecipes.map((item, i) => ({
            id: i + 1, // Assuming your API returns data without an 'id'
            ...item,
          })),
        )
      })

      // You may also update your local state with the new data if needed
      recipes.value = apiRecipes
    }
    catch (error) {
      console.error('Error resetting recipes:', error)
    }
  }

  // ... other store code ...
})
