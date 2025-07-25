"use client"

function Header({ onRefresh, loading, lastUpdate }) {
  return (
    <div className="bg-gradient-to-r from-purple-900 to-purple-700 p-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Solana Memecoin Scanner</h1>
          <p className="text-purple-200">Track newly launched trending tokens on solana </p>
          <p className="text-purple-300 text-sm mt-1">
            
          </p>
        </div>
        <div className="text-right">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 mb-2"
          >
            <span className={loading ? "animate-spin" : ""}>{loading ? "🔄" : "🔍"}</span>
            {loading ? "Scanning..." : "Scan New Tokens"}
          </button>
          {lastUpdate && <p className="text-sm text-purple-200">Last scan: {lastUpdate.toLocaleTimeString()}</p>}
          <p className="text-xs text-purple-300 mt-1">Auto-scan every 30s</p>
        </div>
      </div>
    </div>
  )
}

export default Header
