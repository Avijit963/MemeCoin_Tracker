"use client"

import { useState, useEffect } from "react"

export function useVotes() {
  const [votes, setVotes] = useState({})

  // Load votes from localStorage
  useEffect(() => {
    const savedVotes = localStorage.getItem("memecoin-votes")
    if (savedVotes) {
      setVotes(JSON.parse(savedVotes))
    }
  }, [])

  // Save votes to localStorage
  useEffect(() => {
    localStorage.setItem("memecoin-votes", JSON.stringify(votes))
  }, [votes])

  const handleVote = (tokenAddress, voteType) => {
    setVotes((prev) => {
      const currentVotes = prev[tokenAddress] || { upvotes: 0, downvotes: 0, userVote: null }

      // Remove previous vote if exists
      if (currentVotes.userVote === "up") {
        currentVotes.upvotes -= 1
      } else if (currentVotes.userVote === "down") {
        currentVotes.downvotes -= 1
      }

      // Add new vote if different from current
      if (currentVotes.userVote !== voteType) {
        if (voteType === "up") {
          currentVotes.upvotes += 1
        } else {
          currentVotes.downvotes += 1
        }
        currentVotes.userVote = voteType
      } else {
        currentVotes.userVote = null
      }

      return {
        ...prev,
        [tokenAddress]: currentVotes,
      }
    })
  }

  const getSentimentScore = (tokenAddress) => {
    const tokenVotes = votes[tokenAddress] || { upvotes: 0, downvotes: 0 }
    const total = tokenVotes.upvotes + tokenVotes.downvotes
    if (total === 0) return 0
    return (((tokenVotes.upvotes - tokenVotes.downvotes) / total) * 100).toFixed(1)
  }

  return {
    votes,
    handleVote,
    getSentimentScore,
  }
}
