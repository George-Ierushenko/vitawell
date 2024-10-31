import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { getQuestions } from '../config/questions'

export const useQuestions = () => {
  const { t } = useTranslation()

  const questions = useMemo(() => getQuestions(t), [t])

  const getQuestionByIndex = (index) => questions[index]

  const getTotalQuestions = () => questions.length

  return {
    questions,
    getQuestionByIndex,
    getTotalQuestions,
  }
}
