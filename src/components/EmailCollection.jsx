import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/cn'
import { validateEmail } from '@/lib/validation'

import { useAnimations } from '../hooks/useAnimations'

export const EmailCollection = ({ onSubmit }) => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState(false)
  const [validation, setValidation] = useState({ isValid: false, error: null })
  const { fadeInUp } = useAnimations()

  useEffect(() => {
    if (email) {
      setValidation(validateEmail(email))
    } else {
      setValidation({ isValid: false, error: touched ? 'email.errors.required' : null })
    }
  }, [email, touched])

  const handleSubmit = () => {
    if (validation.isValid) {
      onSubmit(email)
    } else {
      setTouched(true)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && validation.isValid) {
      handleSubmit()
    }
  }

  return (
    <motion.div variants={fadeInUp} initial="initial" animate="animate" exit="exit" className="w-full">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">{t('email.title')}</h2>

      {/* Fixed height container to prevent layout shifts */}
      <div className="space-y-2 min-h-[160px]">
        <div className="relative">
          <Input
            type="email"
            placeholder={t('email.placeholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched(true)}
            onKeyPress={handleKeyPress}
            className={cn(
              'w-full mb-1 pl-12 py-6 text-lg rounded-2xl border-2 transition-all duration-300 placeholder:text-teal-300 shadow-sm',
              !touched || validation.isValid
                ? 'border-teal-400 hover:border-teal-500 focus:border-teal-500'
                : 'border-red-400 hover:border-red-500 focus:border-red-500',
            )}
            aria-invalid={touched && !validation.isValid}
            aria-describedby="email-error"
          />
          <Send
            className={cn(
              'absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-300',
              !touched || validation.isValid ? 'text-teal-400' : 'text-red-400',
            )}
          />
        </div>

        {/* Fixed height error container */}
        <div className="h-6">
          <AnimatePresence mode="wait">
            {touched && validation.error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 text-red-500 text-sm px-2"
                id="email-error"
              >
                <AlertCircle className="h-4 w-4" />
                <span>{t(validation.error)}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Button container with AnimatePresence */}
        <AnimatePresence mode="wait">
          {validation.isValid && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <motion.button
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                exit={{ y: 20 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white py-4 rounded-xl font-bold text-lg md:text-xl transition-all duration-300 shadow-md hover:shadow-lg"
                onClick={handleSubmit}
              >
                {t('email.button')}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
