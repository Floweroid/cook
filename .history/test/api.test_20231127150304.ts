// apiService.test.ts
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { fetchRecipes } from './apiService'

const mock = new MockAdapter(axios)

describe('fetchRecipes', () => {
  afterEach(() => {
    mock.reset()
  })

  it('fetches successfully data from an API', async () => {
    const mockData = { /* your mocked data */ }
    mock.onGet('http://127.0.0.1:8000/api/recipes/').reply(200, mockData)

    const data = await fetchRecipes()

    expect(data).toEqual(mockData)
  })

  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error'
    mock.onGet('http://127.0.0.1:8000/api/recipes/').networkErrorOnce()

    await expect(fetchRecipes()).rejects.toThrow(errorMessage)
  })
})
