"use client"

export default function ApiStatus({ error, onRetry, loading }) {
  if (!error) return null

  const isUsingDemoData = error.includes("demo data") || error.includes("Live APIs")

  return (
    <div
      className={`rounded-lg p-4 mb-6 ${
        isUsingDemoData ? "bg-yellow-900/50 border border-yellow-500" : "bg-red-900/50 border border-red-500"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={isUsingDemoData ? "text-yellow-300" : "text-red-300"}>
            {isUsingDemoData ? "⚠️" : "❌"} {error}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onRetry}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 px-3 py-1 rounded text-sm transition-colors"
          >
            {loading ? "🔄 Scanning..." : "🔄 Retry APIs"}
          </button>
        </div>
      </div>
      {isUsingDemoData && (
        <div className="mt-3 text-sm text-yellow-200 space-y-1">
          <p>
            • <strong>APIs Attempted:</strong> CoinGecko, DexScreener, Pump.fun with multiple proxy services
          </p>
          <p>
            • <strong>Demo Features:</strong> Real Solana contract addresses, realistic price data, functional external
            links
          </p>
          <p>
            • <strong>Fully Functional:</strong> Voting, sentiment tracking, copy addresses, external links work
          </p>
          <p>
            • <strong>Auto-Retry:</strong> APIs will be retried automatically every 30 seconds
          </p>
          <div className="mt-2 p-2 bg-yellow-800/30 rounded text-xs">
            <strong>💡 Tip:</strong> The contract addresses shown are real and can be verified on Solscan. All external
            links are functional even in demo mode!
          </div>
        </div>
      )}
    </div>
  )
}
