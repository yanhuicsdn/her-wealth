import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WatchlistItem {
  id: string
  symbol: string
  name: string
  sort_order: number
}

interface WatchlistState {
  items: WatchlistItem[]
  isLoading: boolean
  fetchWatchlist: () => Promise<void>
  addItem: (symbol: string, name: string) => Promise<void>
  removeItem: (symbol: string) => Promise<void>
  reorderItems: (items: WatchlistItem[]) => void
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      fetchWatchlist: async () => {
        set({ isLoading: true })
        try {
          const response = await fetch('/api/watchlist')
          if (!response.ok) throw new Error('获取自选股失败')
          const data = await response.json()
          set({ items: data, isLoading: false })
        } catch (error) {
          console.error('获取自选股失败:', error)
          set({ items: [], isLoading: false })
        }
      },
      addItem: async (symbol, name) => {
        try {
          const response = await fetch('/api/watchlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ symbol, name })
          })
          if (!response.ok) throw new Error('添加失败')
          await get().fetchWatchlist()
        } catch (error) {
          console.error('添加自选股失败:', error)
          throw error
        }
      },
      removeItem: async (symbol) => {
        try {
          const response = await fetch(`/api/watchlist/${symbol}`, {
            method: 'DELETE'
          })
          if (!response.ok) throw new Error('删除失败')
          await get().fetchWatchlist()
        } catch (error) {
          console.error('删除自选股失败:', error)
          throw error
        }
      },
      reorderItems: (items) => set({ items })
    }),
    {
      name: 'her-wealth-watchlist'
    }
  )
)
