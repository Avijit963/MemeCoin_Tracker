"use client"

export default function LoadingCard() {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 animate-pulse">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="h-6 bg-gray-700 rounded w-16 shimmer"></div>
          <div className="h-5 bg-gray-700 rounded w-12 shimmer"></div>
        </div>
        <div className="h-4 bg-gray-700 rounded w-24 shimmer"></div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-700 rounded w-12 shimmer"></div>
          <div className="h-4 bg-gray-700 rounded w-16 shimmer"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-700 rounded w-16 shimmer"></div>
          <div className="h-4 bg-gray-700 rounded w-12 shimmer"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-700 rounded w-20 shimmer"></div>
          <div className="h-4 bg-gray-700 rounded w-14 shimmer"></div>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-4">
        <div className="flex items-center justify-between mb-3">
          <div className="h-4 bg-gray-700 rounded w-24 shimmer"></div>
          <div className="h-4 bg-gray-700 rounded w-8 shimmer"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-700 rounded w-16 shimmer"></div>
          <div className="h-8 bg-gray-700 rounded w-16 shimmer"></div>
        </div>
      </div>
    </div>
  )
}
