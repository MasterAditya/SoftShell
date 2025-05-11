import { motion } from 'framer-motion'

export function Logo() {
  return (
    <motion.div
      className="flex items-center gap-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-xl">S</span>
      </div>
      <span className="text-xl font-bold text-gray-900 dark:text-white">
        Soft<span className="text-blue-600">Sell</span>
      </span>
    </motion.div>
  )
}
