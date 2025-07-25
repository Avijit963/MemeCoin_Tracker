"use client"

import { useEffect } from "react"
import Header from "./components/Header.jsx"
import MostLiked from "./components/MostLiked.jsx"
import TokenGrid from "./components/TokenGrid.jsx"
import ApiStatus from "./components/ApiStatus.jsx"
import { useMemecoins } from "./hooks/useMemecoins.jsx"
import { useVotes } from "./hooks/useVotes.jsx"

function App() {
  const { tokens, loading, error, refresh, lastUpdate } = useMemecoins()
  const { votes, vote, getMostLiked } = useVotes(tokens)

  // Auto refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(refresh, 30000)
    return () => clearInterval(interval)
  }, [refresh])

  return (
    <div className="min-h-screen bg-black text-white">
      <Header onRefresh={refresh} loading={loading} lastUpdate={lastUpdate} />

      <div className="max-w-6xl mx-auto p-6">
        <MostLiked tokens={getMostLiked()} />

        <ApiStatus error={error} onRetry={refresh} loading={loading} />

        <TokenGrid tokens={tokens} votes={votes} onVote={vote} loading={loading} />

        {/* Footer */}
        <div className="text-center mt-12 py-8 border-t border-gray-800">
          <p className="text-gray-400">
            Data sources: DexScreener • Jupiter •
          </p>
          <p className="text-sm text-gray-500 mt-2">
  <a href="https://x.com/AvijitB13" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
    Follow on X
  </a>
</p>
          {lastUpdate && <p className="text-xs text-gray-600 mt-1">Last updated: {lastUpdate.toLocaleTimeString()}</p>}
        </div>
      </div>
    </div>
  )
}

export default App
