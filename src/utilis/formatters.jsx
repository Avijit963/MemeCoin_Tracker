export const formatPrice = (price) => {
  if (price < 0.001) {
    return `$${price.toFixed(8)}`
  } else if (price < 1) {
    return `$${price.toFixed(6)}`
  } else {
    return `$${price.toFixed(4)}`
  }
}

export const formatVolume = (volume) => {
  if (volume >= 1000000) {
    return `$${(volume / 1000000).toFixed(1)}M`
  } else if (volume >= 1000) {
    return `$${(volume / 1000).toFixed(1)}K`
  }
  return `$${volume.toFixed(0)}`
}

export const formatMarketCap = (mc) => {
  if (mc >= 1000000000) {
    return `$${(mc / 1000000000).toFixed(1)}B`
  } else if (mc >= 1000000) {
    return `$${(mc / 1000000).toFixed(1)}M`
  }
  return `$${mc?.toFixed(0) || "N/A"}`
}

export const formatTimeAgo = (date) => {
  const now = new Date()
  const diffInSeconds = Math.floor((now - date) / 1000)

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s ago`
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}m ago`
  } else {
    return `${Math.floor(diffInSeconds / 3600)}h ago`
  }
}
