import TokenCard from "./TokenCard.jsx"
import LoadingCard from "./LoadingCard.jsx"

function TokenGrid({ tokens, votes, onVote, loading }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {loading && tokens.length === 0
        ? Array.from({ length: 8 }).map((_, i) => <LoadingCard key={i} />)
        : tokens.map((token) => (
            <TokenCard
              key={token.id}
              token={token}
              votes={votes[token.id] || { up: 0, down: 0, userVote: null }}
              onVote={onVote}
            />
          ))}
    </div>
  )
}

export default TokenGrid
