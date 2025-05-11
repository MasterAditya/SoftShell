import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  messages: [],
  isOpen: false,
  loading: false,
  error: null,
  conversationId: null,
  unreadCount: 0,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload)
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    toggleChat: (state) => {
      state.isOpen = !state.isOpen
    },
    setConversationId: (state, action) => {
      state.conversationId = action.payload
    },
    setUnreadCount: (state, action) => {
      state.unreadCount = action.payload
    },
    clearChat: () => initialState,
  },
})

export const {
  setMessages,
  addMessage,
  setLoading,
  setError,
  toggleChat,
  setConversationId,
  setUnreadCount,
  clearChat,
} = chatSlice.actions

export const selectMessages = (state) => state.chat.messages
export const selectIsOpen = (state) => state.chat.isOpen
export const selectLoading = (state) => state.chat.loading
export const selectError = (state) => state.chat.error
export const selectConversationId = (state) => state.chat.conversationId
export const selectUnreadCount = (state) => state.chat.unreadCount

export default chatSlice.reducer
