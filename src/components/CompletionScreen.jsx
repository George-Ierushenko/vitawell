import React from 'react'
import { motion } from 'framer-motion'
import { Rocket } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { useAnimations } from '../hooks/useAnimations'

export const CompletionScreen = ({ onComplete }) => {
  const { t } = useTranslation()
  const { buttonAnimation } = useAnimations()

  return (
    <motion.div
      className="text-center space-y-8"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-6">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 text-transparent bg-clip-text">
            {t('completion.title')}
          </h2>
        </motion.div>
        <p className="text-xl md:text-2xl text-gray-600 font-medium">
          {t('completion.subtitle')}
          <span className="block mt-2 text-lg text-gray-500">{t('completion.ready')}</span>
        </p>
      </div>

      <motion.button
        {...buttonAnimation}
        onClick={onComplete}
        className="group relative w-full max-w-sm mx-auto bg-gradient-to-r from-teal-400 to-blue-500 text-white py-6 px-8 rounded-2xl font-bold text-xl md:text-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        <span className="relative z-10 flex items-center justify-center gap-3">
          {t('completion.button')} <Rocket className="inline-block h-6 w-6" />
        </span>
      </motion.button>
    </motion.div>
  )
}
