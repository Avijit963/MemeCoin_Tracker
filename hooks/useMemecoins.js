"use client"

import { useState, useCallback } from "react"

export function useMemecoins() {
  const [memecoins, setMemecoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)

  const fetchMemecoins = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Using a CORS proxy for the Birdeye API
      const response = await fetch(
        "https://api.allorigins.win/get?url=" +
          encodeURIComponent(
            "https://public-api.birdeye.so/defi/tokenlist?sort_by=v24hUSD&sort_type=desc&offset=0&limit=20",
          ),
      )

      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }

      const data = await response.json()
      const parsedData = JSON.parse(data.contents)

      if (parsedData.success && parsedData.data) {
        // Filter for potential memecoins
        const filteredTokens = parsedData.data.tokens
          .filter(
            (token) => token.symbol && token.name && token.v24hUSD > 10000 && Math.abs(token.priceChange24hPercent) > 5,
          )
          .slice(0, 12)

        setMemecoins(filteredTokens)
        setLastUpdate(new Date())
      } else {
        throw new Error("Invalid API response")
      }
    } catch (err) {
      console.error("Error fetching memecoins:", err)
      setError("Failed to fetch memecoin data. Using demo data.")

      // Fallback demo data
      setMemecoins([
        {
          address: "demo1",
          symbol: "BONK",
          name: "Bonk",
          price: 0.000012,
          priceChange24hPercent: 15.67,
          v24hUSD: 2500000,
          mc: 850000000,
        },
        {
          address: "demo2",
          symbol: "WIF",
          name: "dogwifhat",
          price: 2.45,
          priceChange24hPercent: -8.23,
          v24hUSD: 1800000,
          mc: 2400000000,
        },
        {
          address: "demo3",
          symbol: "PEPE",
          name: "Pepe",
          price: 0.0000089,
          priceChange24hPercent: 22.45,
          v24hUSD: 3200000,
          mc: 3700000000,
        },
      ])
      setLastUpdate(new Date())
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    memecoins,
    loading,
    error,
    lastUpdate,
    fetchMemecoins,
  }
}
