import { create } from 'zustand'

interface AccountData {
  total_assets: number
  cash: number
  market_value: number
  profit_loss: number
  profit_loss_percent: number
  buying_power: number
}

interface AccountState {
  account: AccountData | null
  isLoading: boolean
  fetchAccount: () => Promise<void>
  updateAccount: (data: AccountData) => void
}

export const useAccountStore = create<AccountState>()((set) => ({
  account: null,
  isLoading: false,
  fetchAccount: async () => {
    set({ isLoading: true })
    try {
      const response = await fetch('/api/account')
      if (response.ok) {
        const data = await response.json()
        set({ account: data, isLoading: false })
      } else {
        set({ account: null, isLoading: false })
      }
    } catch (error) {
      console.error('获取账户信息失败:', error)
      set({ account: null, isLoading: false })
    }
  },
  updateAccount: (data) => set({ account: data })
}))
