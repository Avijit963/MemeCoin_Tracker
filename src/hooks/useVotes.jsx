"use client"

import { useState, useEffect } from "react"

export function useVotes(tokens) {
  const [votes, setVotes] = useState({})

  // Load votes from localStorage
  useEffect(() => {
    try {
      const savedVotes = localStorage.getItem("memecoin-votes")
      if (savedVotes) {
        setVotes(JSON.parse(savedVotes))
      }
    } catch (error) {
      console.error("Error loading votes from localStorage:", error)
    }
  }, [])

  // Save votes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("memecoin-votes", JSON.stringify(votes))
    } catch (error) {
      console.error("Error saving votes to localStorage:", error)
    }
  }, [votes])

  const vote = (tokenId, type) => {
    setVotes((prev) => {
      const currentVotes = prev[tokenId] || { up: 0, down: 0, userVote: null }

      // Remove previous vote
      if (currentVotes.userVote === "up") currentVotes.up--
      if (currentVotes.userVote === "down") currentVotes.down--

      // Add new vote or toggle off
      if (currentVotes.userVote !== type) {
        if (type === "up") currentVotes.up++
        if (type === "down") currentVotes.down++
        currentVotes.userVote = type
      } else {
        currentVotes.userVote = null
      }

      return {
        ...prev,
        [tokenId]: currentVotes,
      }
    })
  }

  const getSentimentScore = (tokenId) => {
    const tokenVotes = votes[tokenId] || { up: 0, down: 0 }
    const total = tokenVotes.up + tokenVotes.down
    if (total === 0) return 0
    return (((tokenVotes.up - tokenVotes.down) / total) * 100).toFixed(1)
  }

  const getMostLiked = () => {
    return tokens
      .map((token) => {
        const tokenVotes = votes[token.id] || { up: 0, down: 0 }
        const total = tokenVotes.up + tokenVotes.down
        const score = total > 0 ? ((tokenVotes.up - tokenVotes.down) / total) * 100 : 0
        return { ...token, score, totalVotes: total }
      })
      .filter((token) => token.totalVotes > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
  }

  return {
    votes,
    vote,
    getSentimentScore,
    getMostLiked,
  }
}
