"use client"

import { TrendingUp, TrendingDown, ThumbsUp, ThumbsDown, Eye, DollarSign } from "lucide-react"

export default function TokenCard({ token, votes, onVote, sentimentScore }) {
  const tokenVotes = votes[token.address] || { upvotes: 0, downvotes: 0, userVote: null }
  const isPositive = token.priceChange24hPercent > 0

  const formatPrice = (price) => {
    if (price < 0.001) {
      return `$${price.toFixed(8)}`
    } else if (price < 1) {
      return `$${price.toFixed(6)}`
    } else {
      return `$${price.toFixed(4)}`
    }
  }

  const formatVolume = (volume) => {
    if (volume >= 1000000) {
      return `$${(volume / 1000000).toFixed(1)}M`
    } else if (volume >= 1000) {
      return `$${(volume / 1000).toFixed(1)}K`
    }
    return `$${volume.toFixed(0)}`
  }

  const formatMarketCap = (mc) => {
    if (mc >= 1000000000) {
      return `$${(mc / 1000000000).toFixed(1)}B`
    } else if (mc >= 1000000) {
      return `$${(mc / 1000000).toFixed(1)}M`
    }
    return `$${mc?.toFixed(0) || "N/A"}`
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-purple-500 transition-colors">
      {/* Token Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-purple-300">{token.symbol}</h3>
          <div className={`flex items-center gap-1 ${isPositive ? "text-green-400" : "text-red-400"}`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="font-semibold">
              {isPositive ? "+" : ""}
              {token.priceChange24hPercent?.toFixed(2) || "0.00"}%
            </span>
          </div>
        </div>
        <p className="text-gray-400 text-sm truncate">{token.name}</p>
      </div>

      {/* Price and Stats */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            Price
          </span>
          <span className="font-semibold">{formatPrice(token.price)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400 flex items-center gap-1">
            <Eye className="w-4 h-4" />
            24h Volume
          </span>
          <span className="font-semibold">{formatVolume(token.v24hUSD)}</span>
        </div>
        {token.mc && (
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Market Cap</span>
            <span className="font-semibold">{formatMarketCap(token.mc)}</span>
          </div>
        )}
      </div>

      {/* Sentiment Section */}
      <div className="border-t border-gray-700 pt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-400">Community Sentiment</span>
          <span
            className={`text-sm font-semibold ${
              Number.parseFloat(sentimentScore) > 0
                ? "text-green-400"
                : Number.parseFloat(sentimentScore) < 0
                  ? "text-red-400"
                  : "text-gray-400"
            }`}
          >
            {sentimentScore > 0 ? "+" : ""}
            {sentimentScore}%
          </span>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => onVote(token.address, "up")}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
              tokenVotes.userVote === "up"
                ? "bg-green-600 text-white"
                : "bg-gray-700 hover:bg-green-600/20 text-gray-300 hover:text-green-400"
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
            <span>{tokenVotes.upvotes}</span>
          </button>

          <button
            onClick={() => onVote(token.address, "down")}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
              tokenVotes.userVote === "down"
                ? "bg-red-600 text-white"
                : "bg-gray-700 hover:bg-red-600/20 text-gray-300 hover:text-red-400"
            }`}
          >
            <ThumbsDown className="w-4 h-4" />
            <span>{tokenVotes.downvotes}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
