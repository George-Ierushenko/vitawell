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
    gtag('config', 'G-ZG26M5SPN8', {
      user_id: localStorage.getItem('user_email') || undefined
    });

    gtag('event', 'questionnaire_start', {
      event_category: 'Questionnaire',
      event_label: 'Started',
      user_id: localStorage.getItem('user_email') || undefined
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
              localStorage.setItem('user_email', e.target.value);
              window.gtag('set', 'user_properties', {
                user_id: e.target.value
              });
              window.gtag('event', 'email_entered', {
                event_category: 'Questionnaire',
                event_label: 'Email Input',
                user_id: e.target.value
              });
            }
          }}
          className="w-full mb-4"
          style={{ borderColor: theme.secondary, color: theme.primary }}
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
    }
  ];

  const trackEvent = (eventName, data) => {
    const userEmail = localStorage.getItem('user_email');
    window.gtag('event', eventName, {
      event_category: 'Questionnaire',
      event_label: data.question || eventName,
      value: currentStep + 1,
      user_id: userEmail,
      question_number: currentStep + 1,
      ...data
    });

    if (data.answer) {
      window.gtag('event', 'question_response', {
        event_category: 'Questionnaire',
        event_label: `Question ${currentStep + 1}`,
        user_id: userEmail,
        question_text: data.question,
        answer_value: data.answer,
        question_number: currentStep + 1
      });
    }
  };

  const handleAnswer = (answer) => {
    const question = questions[currentStep];
    const newAnswers = { ...answers, [currentStep]: answer };
    setAnswers(newAnswers);

    trackEvent(question.event_name, {
      question: question.text,
      answer: answer,
      step: currentStep + 1
    });

    window.gtag('event', 'questionnaire_progress', {
      event_category: 'Questionnaire',
      event_label: `Step ${currentStep + 1}`,
      user_id: localStorage.getItem('user_email'),
      current_answers: JSON.stringify(newAnswers),
      completion_percentage: ((currentStep + 1) / questions.length) * 100
    });

    handleSubmit();
  };

  const handleSubmit = () => {
    if (currentStep === questions.length - 1) {
      window.gtag('event', 'questionnaire_completed', {
        event_category: 'Questionnaire',
        event_label: 'Completion',
        user_id: localStorage.getItem('user_email'),
        all_answers: JSON.stringify(answers),
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
      <Card className="w-full max-w-md" style={{ borderColor: theme.secondary }}>
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
              style={{ backgroundColor: theme.secondary, color: theme.primary }}
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
