import { useCallback, useEffect, useState } from 'react'

import { useQuestions } from './useQuestions'

const STORAGE_KEY = 'questionnaire_state'

const initialState = {
  stage: 'landing',
  currentQuestionIndex: 0,
  answers: {},
  email: '',
}

export const useQuestionnaire = () => {
  const { questions, getQuestionByIndex, getTotalQuestions } = useQuestions()

  const [state, setState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : initialState
    }
    return initialState
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    }
  }, [state])

  const updateState = useCallback((updates) => {
    setState((current) => ({
      ...current,
      ...updates,
    }))
  }, [])

  const resetQuestionnaire = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setState(initialState)
    return true
  }, [])

  const getCurrentQuestion = useCallback(
    () => getQuestionByIndex(state.currentQuestionIndex),
    [state.currentQuestionIndex, getQuestionByIndex],
  )

  const progress = (state.currentQuestionIndex / questions.length) * 100

  return {
    state,
    updateState,
    resetQuestionnaire,
    getCurrentQuestion,
    progress,
    isCompleted: state.currentQuestionIndex === questions.length,
    isLastQuestion: state.currentQuestionIndex === questions.length - 1,
    hasProgress: Object.keys(state.answers).length > 0,
    totalQuestions: getTotalQuestions(),
  }
}
