function MostLiked({ tokens }) {
  if (tokens.length === 0) return null

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-purple-400">🏆 Most Liked Memecoins</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tokens.map((token, index) => (
          <div key={token.id} className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}</span>
              <div>
                <h3 className="font-bold text-purple-300">{token.symbol}</h3>
                <p className="text-sm text-gray-400">{token.name}</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {token.score > 0 ? "+" : ""}
                {token.score.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-400">{token.totalVotes} votes</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MostLiked
