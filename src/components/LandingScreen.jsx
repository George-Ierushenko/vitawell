import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import BalanceWheelSVG from '@/assets/svg/balance-wheel.svg'

export const LandingScreen = ({ onStart }) => {
  const { t } = useTranslation()

  return (
    <motion.div
      className="h-screen w-full flex flex-col justify-center items-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full max-w-2xl flex flex-col items-center gap-4 md:gap-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">
          {t('Створи своє персональне Колесо Балансу!')}
        </h1>

        {/* Wheel container */}
        <div className="relative w-full max-w-md flex items-center justify-center overflow-hidden">
          <BalanceWheelSVG style={{ marginLeft: '-40px' }} className="w-full h-full" />
        </div>

        <p className="text-center text-gray-600 text-sm sm:text-base max-w-sm">
          {t('Дай відповідь на декілька питань, щоб визначити, де твій дизбаланс, та точки росту')}
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="w-full max-w-sm bg-gradient-to-r from-teal-400 to-blue-500 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-bold text-lg sm:text-xl md:text-2xl shadow-lg hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400"
          aria-label={t('Продовжити')}
        >
          {t('Продовжити')}
        </motion.button>
      </div>
    </motion.div>
  )
}
