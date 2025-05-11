import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { ChatBubbleLeftIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { chatService } from '../chatService'
import {
  toggleChat,
  setMessages,
  addMessage,
  setLoading,
  setError,
  setConversationId,
  setUnreadCount,
  selectMessages,
  selectIsOpen,
  selectLoading,
  selectConversationId,
  selectUnreadCount,
} from '../chatSlice'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'

export function ChatWidget() {
  const dispatch = useDispatch()
  const messages = useSelector(selectMessages)
  const isOpen = useSelector(selectIsOpen)
  const isLoading = useSelector(selectLoading)
  const conversationId = useSelector(selectConversationId)
  const unreadCount = useSelector(selectUnreadCount)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const initializeChat = async () => {
      try {
        dispatch(setLoading(true))
        const { id } = await chatService.createConversation()
        dispatch(setConversationId(id))
        const { messages } = await chatService.getMessages(id)
        dispatch(setMessages(messages))
        const { count } = await chatService.getUnreadCount()
        dispatch(setUnreadCount(count))
      } catch (error) {
        dispatch(setError(error.message))
      } finally {
        dispatch(setLoading(false))
      }
    }

    if (!conversationId) {
      initializeChat()
    }
  }, [dispatch, conversationId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const message = inputRef.current.value.trim()
    if (!message) return

    try {
      dispatch(setLoading(true))
      const response = await chatService.sendMessage(conversationId, message)
      dispatch(addMessage(response))
      inputRef.current.value = ''
    } catch (error) {
      dispatch(setError(error.message))
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-4 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Support Chat</h3>
              <button
                onClick={() => dispatch(toggleChat())}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.isUser ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[75%] rounded-lg px-4 py-2 ${
                      message.isUser
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-75">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading}>
                  Send
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => dispatch(toggleChat())}
        className="fixed bottom-4 right-4 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <ChatBubbleLeftIcon className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
    </>
  )
}
