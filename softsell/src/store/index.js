import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import licenseReducer from '../features/licenses/licenseSlice'
import chatReducer from '../features/chat/chatSlice'
import themeReducer from './themeSlice'
import adminReducer from '../features/admin/adminSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    licenses: licenseReducer,
    chat: chatReducer,
    theme: themeReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['auth/setCredentials', 'auth/logout'],
      },
    }),
})
