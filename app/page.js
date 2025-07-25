"use client"

import { useEffect } from "react"
import Header from "../components/Header"
import MostLikedSection from "../components/MostLikedSection"
import TokenCard from "../components/TokenCard"
import LoadingCard from "../components/LoadingCard"
import { useMemecoins } from "../hooks/useMemecoins"
import { useVotes } from "../hooks/useVotes"
import { RefreshCw } from "lucide-react"

export default function MemecoinsApp() {
  const { memecoins, loading, error, lastUpdate, fetchMemecoins } = useMemecoins()
  const { votes, handleVote, getSentimentScore } = useVotes()

  // Auto-refresh every 30 seconds
  useEffect(() => {
    fetchMemecoins()
    const interval = setInterval(fetchMemecoins, 30000)
    return () => clearInterval(interval)
  }, [fetchMemecoins])

  const getMostLikedTokens = () => {
    return memecoins
      .map((token) => ({
        ...token,
        sentimentScore: Number.parseFloat(getSentimentScore(token.address)),
        totalVotes: (votes[token.address]?.upvotes || 0) + (votes[token.address]?.downvotes || 0),
      }))
      .filter((token) => token.totalVotes > 0)
      .sort((a, b) => b.sentimentScore - a.sentimentScore)
      .slice(0, 3)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header onRefresh={fetchMemecoins} loading={loading} lastUpdate={lastUpdate} />

      <div className="max-w-7xl mx-auto p-6">
        {/* Most Liked Section */}
        <MostLikedSection tokens={getMostLikedTokens()} />

        {/* Error Message */}
        {error && (
          <div className="bg-purple-900/50 border border-purple-500 rounded-lg p-4 mb-6">
            <p className="text-purple-300">⚠️ {error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && memecoins.length === 0 && (
          <div className="text-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-400" />
            <p className="text-purple-300">Loading trending memecoins...</p>
          </div>
        )}

        {/* Memecoins Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading && memecoins.length === 0
            ? Array.from({ length: 8 }).map((_, index) => <LoadingCard key={index} />)
            : memecoins.map((token) => (
                <TokenCard
                  key={token.address}
                  token={token}
                  votes={votes}
                  onVote={handleVote}
                  sentimentScore={getSentimentScore(token.address)}
                />
              ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 py-8 border-t border-gray-800">
          <p className="text-gray-400">Data refreshes every 30 seconds • Powered by Birdeye API</p>
          <p className="text-sm text-gray-500 mt-2">⚠️ This is for educational purposes only. Not financial advice.</p>
        </div>
      </div>
    </div>
  )
}

