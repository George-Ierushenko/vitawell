// containers/Questionnaire.jsx
import React from 'react'
import Confetti from 'react-confetti'

import { useAnalytics } from '../hooks/useAnalytics'
import { useQuestionnaire } from '../hooks/useQuestionnaire'
import { STAGES, useQuestionnaireStage } from '../hooks/useQuestionnaireStage'
import { useWindowSize } from '../hooks/useWindowSize'

const Questionnaire = () => {
  const windowSize = useWindowSize()
  const { trackEvent } = useAnalytics()
  const [showConfetti, setShowConfetti] = React.useState(false)

  const questionnaire = useQuestionnaire()

  const handlers = React.useMemo(
    () => ({
      handleStart: () => {
        trackEvent('questionnaire_started', {
          timestamp: new Date().toISOString(),
          resumed: questionnaire.hasProgress,
        })
        questionnaire.updateState({ stage: STAGES.QUESTIONS })
      },

      handleAnswer: (answer) => {
        const currentQuestion = questionnaire.getCurrentQuestion()
        const newAnswers = {
          ...questionnaire.state.answers,
          [questionnaire.state.currentQuestionIndex]: answer,
        }

        trackEvent('question_answered', {
          question: currentQuestion.text,
          answer,
          questionIndex: questionnaire.state.currentQuestionIndex,
        })

        if (questionnaire.isLastQuestion) {
          questionnaire.updateState({
            answers: newAnswers,
            stage: STAGES.EMAIL,
          })
        } else {
          questionnaire.updateState({
            answers: newAnswers,
            currentQuestionIndex: questionnaire.state.currentQuestionIndex + 1,
          })
        }
      },

      handleEmailSubmit: (email) => {
        trackEvent('email_submitted', {
          email,
          answers: questionnaire.state.answers,
        })

        questionnaire.updateState({
          email,
          stage: STAGES.COMPLETION,
        })

        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 5000)
      },

      handleComplete: () => {
        trackEvent('questionnaire_completed', {
          email: questionnaire.state.email,
          answers: questionnaire.state.answers,
        })

        questionnaire.resetQuestionnaire()
        // window.location.href = '/paywall'
      },

      resetQuestionnaire: () => {
        const didReset = questionnaire.resetQuestionnaire()
        if (didReset) {
          trackEvent('questionnaire_reset')
        }
      },
    }),
    [questionnaire, trackEvent],
  )

  const { CurrentComponent } = useQuestionnaireStage({
    questionnaire,
    handlers,
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-teal-50">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={200}
          recycle={false}
          colors={['#2DD4BF', '#0EA5E9', '#818CF8', '#34D399']}
        />
      )}

      <div className="flex flex-col min-h-screen px-4">
        <div className="flex-grow flex flex-col justify-center w-full max-w-md mx-auto">
          <CurrentComponent />
        </div>
      </div>
    </div>
  )
}

export default Questionnaire
