
import React from 'react'

import { useAuth0 } from '@auth0/auth0-react'

export const useApi = () => {
  const { getAccessTokenSilently } = useAuth0()

  const callApi = async (endpoint, options = {}) => {
    try {
      const token = await getAccessTokenSilently()  // silent JWT fetch

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}${endpoint}`,
        {
          ...options,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            ...options.headers
          }
        }
      )

      if (!response.ok) throw new Error(`API error: ${response.status}`)
      return await response.json()

    } catch (err) {
      console.error('API call failed:', err)
      throw err
    }
  }

  return { callApi }
}
