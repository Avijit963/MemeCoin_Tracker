"use client"

import { RefreshCw } from "lucide-react"

export default function Header({ onRefresh, loading, lastUpdate }) {
  return (
    <div className="bg-gradient-to-r from-purple-900 to-purple-700 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">🚀 Solana Memecoin Sentiment Dashboard</h1>
            <p className="text-purple-200">Track trending memecoins and community sentiment in real-time</p>
          </div>
          <div className="text-right">
            <button
              onClick={onRefresh}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 px-4 py-2 rounded-lg flex items-center gap-2 mb-2 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            {lastUpdate && <p className="text-sm text-purple-200">Last updated: {lastUpdate.toLocaleTimeString()}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
