import React from 'react'

import { CompletionScreen } from '../components/CompletionScreen'
import { EmailCollection } from '../components/EmailCollection'
import { LandingScreen } from '../components/LandingScreen'
import { ProgressBar } from '../components/ProgressBar'
import { QuestionCard } from '../components/QuestionCard'

export const STAGES = {
  LANDING: 'landing',
  QUESTIONS: 'questions',
  EMAIL: 'email',
  COMPLETION: 'completion',
}

export const useQuestionnaireStage = ({ questionnaire, handlers }) => {
  const stageComponents = {
    [STAGES.LANDING]: () => <LandingScreen onStart={handlers.handleStart} hasProgress={questionnaire.hasProgress} />,

    [STAGES.QUESTIONS]: () => (
      <>
        <ProgressBar progress={questionnaire.progress} />
        <QuestionCard
          question={questionnaire.getCurrentQuestion()}
          onAnswer={handlers.handleAnswer}
          onReset={handlers.resetQuestionnaire}
        />
      </>
    ),

    [STAGES.EMAIL]: () => (
      <EmailCollection
        onSubmit={handlers.handleEmailSubmit}
        onBack={() =>
          questionnaire.updateState({
            stage: STAGES.QUESTIONS,
            currentQuestionIndex: questionnaire.totalQuestions - 1,
          })
        }
      />
    ),

    [STAGES.COMPLETION]: () => <CompletionScreen onComplete={handlers.handleComplete} />,
  }

  const CurrentComponent = React.useMemo(() => {
    const component = stageComponents[questionnaire.state.stage]
    if (!component) {
      console.error(`No component found for stage: ${questionnaire.state.stage}`)
      return stageComponents[STAGES.LANDING]
    }
    return component
  }, [questionnaire.state.stage, questionnaire.state.currentQuestionIndex])

  return {
    CurrentComponent,
    currentStage: questionnaire.state.stage,
  }
}
