import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Questionnaire = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState('');
  const [answers, setAnswers] = useState({});

  const theme = {
    primary: '#1B3B5F',
    secondary: '#47B5BE',
    accent: '#87D5DB',
    background: '#F0F4F4'
  };

  // Initialize Google Analytics
  useEffect(() => {
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-ZG26M5SPN8';
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-ZG26M5SPN8');

    gtag('event', 'questionnaire_start', {
      event_category: 'Questionnaire',
      event_label: 'Started'
    });

    return () => {
      document.head.removeChild(gaScript);
    };
  }, []);

  const questions = [
    {
      type: 'email',
      text: 'Please enter your email address:',
      event_name: 'email_input',
      component: (
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (e.target.value.includes('@')) {
              window.gtag('event', 'email_entered', {
                event_category: 'Questionnaire',
                event_label: 'Email Input',
                value: 1
              });
            }
          }}
          className="w-full mb-4"
        />
      )
    },
    {
      type: 'choice',
      text: 'Я не думаю про гроші та мені завжди достатньо',
      event_name: 'financial_mindset',
      options: [
        { text: 'Це про мене 😅', value: 'always' },
        { text: 'Вже майже так 😊', value: 'almost' },
        { text: 'Не завжди 🙂', value: 'sometimes' },
        { text: 'Дуже мало :( 😢', value: 'rarely' }
      ]
    },
    {
      type: 'choice',
      text: 'How satisfied are you with your current work-life balance?',
      event_name: 'work_life_balance',
      options: [
        { text: 'Very satisfied 😊', value: 'very_satisfied' },
        { text: 'Somewhat satisfied 🙂', value: 'somewhat_satisfied' },
        { text: 'Needs improvement 😐', value: 'needs_improvement' },
        { text: 'Not satisfied at all 😕', value: 'not_satisfied' }
      ]
    },
    {
      type: 'choice',
      text: 'What area of your life needs the most guidance right now?',
      event_name: 'guidance_area',
      options: [
        { text: 'Career Development 💼', value: 'career' },
        { text: 'Personal Growth 🌱', value: 'personal' },
        { text: 'Relationships 💕', value: 'relationships' },
        { text: 'Financial Planning 💰', value: 'financial' }
      ]
    },
    {
      type: 'choice',
      text: 'How often do you feel stressed or overwhelmed?',
      event_name: 'stress_level',
      options: [
        { text: 'Rarely 😌', value: 'rarely' },
        { text: 'Sometimes 😊', value: 'sometimes' },
        { text: 'Often 😓', value: 'often' },
        { text: 'Very frequently 😰', value: 'very_frequently' }
      ]
    },
    {
      type: 'choice',
      text: 'Are you ready to take the next step in your personal development?',
      event_name: 'readiness',
      options: [
        { text: "Yes, I'm excited! 🎯", value: 'ready' },
        { text: 'Need more information 🤔', value: 'need_info' },
        { text: 'Still thinking about it 💭', value: 'thinking' },
        { text: 'Not sure yet 🌱', value: 'unsure' }
      ]
    }
  ];

  const trackEvent = (eventName, data) => {
    window.gtag('event', eventName, {
      event_category: 'Questionnaire',
      event_label: data.question || eventName,
      value: currentStep + 1,
      ...data
    });
  };

  const handleAnswer = (answer) => {
    const question = questions[currentStep];
    setAnswers({ ...answers, [currentStep]: answer });

    trackEvent(question.event_name, {
      question: question.text,
      answer: answer,
      step: currentStep + 1
    });

    handleSubmit();
  };

  const handleSubmit = () => {
    if (currentStep === questions.length - 1) {
      trackEvent('questionnaire_completed', {
        email: email,
        total_steps: questions.length,
        completion_time: new Date().toISOString()
      });

      window.location.href = '/paywall';
    } else {
      trackEvent('question_answered', {
        current_step: currentStep + 1,
        next_step: currentStep + 2,
        question: questions[currentStep].text
      });

      setCurrentStep(currentStep + 1);
    }
  };

  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: theme.background }}>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <svg viewBox="0 0 50 50" className="w-16 h-16">
              <circle cx="25" cy="25" r="24" fill={theme.primary} />
              <path d="M25 5 L30 20 L45 25 L30 30 L25 45 L20 30 L5 25 L20 20 Z" fill="white" />
              <path d="M15 20 Q25 15 35 30" fill="none" stroke={theme.secondary} strokeWidth="2" />
              <path d="M15 25 Q25 20 35 35" fill="none" stroke={theme.accent} strokeWidth="2" />
            </svg>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%`, background: theme.secondary }}
            />
          </div>
        </CardHeader>

        <CardContent>
          {/* Question */}
          <div className="space-y-6">
            <CardTitle className="text-center" style={{ color: theme.primary }}>
              {questions[currentStep].text}
            </CardTitle>

            {questions[currentStep].type === 'email' ? (
              questions[currentStep].component
            ) : (
              <div className="space-y-3">
                {questions[currentStep].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full p-4 flex items-center justify-center text-lg hover:bg-accent/10"
                    style={{
                      '--tw-border-opacity': '1',
                      borderColor: theme.secondary,
                      color: theme.primary
                    }}
                    onClick={() => handleAnswer(option.value)}
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          {questions[currentStep].type === 'email' && (
            <Button
              className="w-full mt-6"
              style={{ backgroundColor: theme.secondary }}
              onClick={handleSubmit}
              disabled={!email.includes('@')}
            >
              Continue
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Questionnaire;