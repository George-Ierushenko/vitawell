import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import { useAnimations } from '../hooks/useAnimations'

export const QuestionCard = ({ question, onAnswer }) => {
  const { t } = useTranslation()
  const { fadeInUp } = useAnimations()

  if (!question) return null

  return (
    <motion.div variants={fadeInUp} initial="initial" animate="animate" exit="exit" className="w-full">
      <div className="relative mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">{t(question.text)}</h2>
      </div>

      <div className="grid gap-4">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white border-2 border-teal-400 text-gray-700 py-4 px-6 rounded-xl font-medium text-lg md:text-xl transition-all duration-300 hover:bg-teal-50 hover:border-teal-500 hover:text-teal-600 shadow-md hover:shadow-lg"
            onClick={() => onAnswer(option.value)}
          >
            {t(option.text)}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
