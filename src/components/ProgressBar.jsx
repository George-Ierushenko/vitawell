// components/ProgressBar.jsx
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export const ProgressBar = ({ progress }) => (
  <div className="fixed top-0 left-0 right-0 pt-8 px-4 z-10 bg-gradient-to-b from-white via-white to-transparent pb-8">
    <div className="w-full max-w-md mx-auto">
      <div className="w-full h-2 bg-teal-100 rounded-full overflow-hidden relative">
        <AnimatePresence initial={false}>
          <motion.div
            key="progress-bar"
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-400 to-blue-500"
            layoutId="progress"
            style={{ width: `${progress}%` }}
            transition={{
              duration: 0.5,
              ease: 'easeOut',
              type: 'tween',
            }}
          />
        </AnimatePresence>
      </div>
      <p className="text-center mt-2 text-sm text-teal-600 font-medium">{Math.round(progress)}% Complete</p>
    </div>
  </div>
)
