"use client"

import { useState } from "react"

function TokenCard({ token, votes, onVote }) {
  const [addressCopied, setAddressCopied] = useState(false)

  const formatPrice = (price) => {
    if (price < 0.001) return `$${price.toFixed(8)}`
    if (price < 1) return `$${price.toFixed(6)}`
    return `$${price.toFixed(4)}`
  }

  const formatVolume = (volume) => {
    if (volume >= 1000000) return `$${(volume / 1000000).toFixed(1)}M`
    if (volume >= 1000) return `$${(volume / 1000).toFixed(1)}K`
    return `$${volume.toFixed(0)}`
  }

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num?.toString() || "0"
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setAddressCopied(true)
      setTimeout(() => setAddressCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const truncateAddress = (address) => {
    if (!address || address === "N/A") return "N/A"
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getTimeAgo = (dateString) => {
    if (!dateString) return "Unknown"
    const now = new Date()
    const created = new Date(dateString)
    const diffInHours = Math.floor((now - created) / (1000 * 60 * 60))

    if (diffInHours < 1) return "< 1h ago"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const total = votes.up + votes.down
  const sentiment = total > 0 ? ((votes.up - votes.down) / total) * 100 : 0

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-purple-500 transition-colors relative">
      {/* New Token Badge */}
      {token.isNew && (
        <div className="absolute top-2 right-2 bg-green-500 text-black text-xs font-bold px-2 py-1 rounded-full">
          NEW
        </div>
      )}

      {/* Header */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            {token.image && (
              <img
                src={token.image || "/placeholder.svg"}
                alt={token.symbol}
                className="w-8 h-8 rounded-full"
                onError={(e) => {
                  e.target.style.display = "none"
                }}
              />
            )}
            <h3 className="text-xl font-bold text-purple-300">{token.symbol}</h3>
          </div>
          <div className={`flex items-center gap-1 ${token.change > 0 ? "text-green-400" : "text-red-400"}`}>
            <span>{token.change > 0 ? "🚀" : "📉"}</span>
            <span className="font-semibold">
              {token.change > 0 ? "+" : ""}
              {token.change.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Token Name */}
        <p className="text-gray-400 text-sm mb-2">{token.name}</p>

        {/* Launch Time */}
        <p className="text-green-400 text-xs mb-2">🕒 Launched {getTimeAgo(token.createdAt)}</p>

        {/* Contract Address - Fixed styling */}
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 mb-2">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400 mb-1 font-medium">Contract Address</p>
              <p className="text-sm font-mono text-gray-200 break-all">
                {token.contractAddress && token.contractAddress !== "N/A"
                  ? truncateAddress(token.contractAddress)
                  : "N/A"}
              </p>
            </div>
            {token.contractAddress && token.contractAddress !== "N/A" && (
              <button
                onClick={() => copyToClipboard(token.contractAddress)}
                className="ml-3 px-2 py-1 bg-purple-600 hover:bg-purple-500 rounded text-xs transition-colors flex-shrink-0"
                title="Copy full address"
              >
                {addressCopied ? "✓" : "📋"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-400">Price</span>
          <span className="font-semibold">{formatPrice(token.price)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">24h Volume</span>
          <span className="font-semibold">{formatVolume(token.volume)}</span>
        </div>
        {token.marketCap > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-400">Market Cap</span>
            <span className="font-semibold">{formatVolume(token.marketCap)}</span>
          </div>
        )}
        {token.liquidity > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-400">Liquidity</span>
            <span className="font-semibold">{formatVolume(token.liquidity)}</span>
          </div>
        )}
        {token.holders > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-400">Holders</span>
            <span className="font-semibold">{formatNumber(token.holders)}</span>
          </div>
        )}
      </div>

      {/* Sentiment */}
      <div className="border-t border-gray-700 pt-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-400">Community Sentiment</span>
          <span
            className={`text-sm font-semibold ${
              sentiment > 0 ? "text-green-400" : sentiment < 0 ? "text-red-400" : "text-gray-400"
            }`}
          >
            {sentiment > 0 ? "+" : ""}
            {sentiment.toFixed(1)}%
          </span>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => onVote(token.id, "up")}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
              votes.userVote === "up"
                ? "bg-green-600 text-white"
                : "bg-gray-700 hover:bg-green-600/20 text-gray-300 hover:text-green-400"
            }`}
          >
            👍 {votes.up}
          </button>

          <button
            onClick={() => onVote(token.id, "down")}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
              votes.userVote === "down"
                ? "bg-red-600 text-white"
                : "bg-gray-700 hover:bg-red-600/20 text-gray-300 hover:text-red-400"
            }`}
          >
            👎 {votes.down}
          </button>
        </div>
      </div>

      {/* External Links */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex gap-2 flex-wrap">
          {token.contractAddress && token.contractAddress !== "N/A" && (
            <>
              <a
                href={`https://solscan.io/token/${token.contractAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-blue-600 hover:bg-blue-500 px-2 py-1 rounded transition-colors"
              >
                Solscan
              </a>
              <a
                href={`https://dexscreener.com/solana/${token.contractAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-green-600 hover:bg-green-500 px-2 py-1 rounded transition-colors"
              >
                DexScreener
              </a>
              
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default TokenCard


