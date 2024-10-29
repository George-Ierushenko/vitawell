import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import { Sparkles, Send, Rocket } from 'lucide-react';

const Questionnaire = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState('');
  const [answers, setAnswers] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        <div className="relative">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 pl-12 py-6 text-lg rounded-2xl border-2 border-teal-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 placeholder:text-teal-300"
          />
          <Send className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400 h-5 w-5" />
        </div>
      )
    },
    {
      type: 'choice',
      text: 'Я не думаю про гроші та мені завжди достатньо',
      event_name: 'financial_mindset',
      options: [
        { text: 'Це про мене 😂', value: 'always' },
        { text: 'Вже майже так 😊', value: 'almost' },
        { text: 'Не завжди 😕', value: 'sometimes' },
        { text: 'Дуже мало :(😭', value: 'rarely' }
      ]
    },
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

    if (currentStep === questions.length - 1) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 5 seconds
    }

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
      setCurrentStep(currentStep + 1); // Move to congratulations step
    } else {
      trackEvent('question_answered', {
        current_step: currentStep + 1,
        next_step: currentStep + 2,
        question: questions[currentStep].text
      });

      setCurrentStep(currentStep + 1);
    }
  };

  const handleSignUp = () => {
    window.location.href = '/paywall';
  };

  const progress = ((currentStep) / (questions.length)) * 100;

  const renderContent = () => {
    if (currentStep === questions.length) {
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
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block"
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 text-transparent bg-clip-text">
                🎉 Woohoo! 🎉
              </h2>
            </motion.div>
            <p className="text-xl md:text-2xl text-gray-600 font-medium">
              You're absolutely amazing!
              <span className="block mt-2 text-lg text-gray-500">
                Ready to start your journey?
              </span>
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSignUp}
            className="group relative w-full max-w-sm mx-auto bg-gradient-to-r from-teal-400 to-blue-500 text-white py-6 px-8 rounded-2xl font-bold text-xl md:text-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              Let's Go! <Rocket className="inline-block h-6 w-6" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </motion.button>
        </motion.div>
      );
    }

    return (
      <motion.div
        key={currentStep}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeInUp}
        className="w-full"
      >
        <div className="relative mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
            {questions[currentStep].text}
          </h2>
          <Sparkles className="absolute -right-8 -top-4 text-yellow-400 h-6 w-6" />
        </div>

        <div className="space-y-4">
          {questions[currentStep].type === 'email' ? (
            <div className="space-y-4">
              {questions[currentStep].component}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white py-4 rounded-xl font-bold text-lg md:text-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                onClick={handleSubmit}
                disabled={!email.includes('@')}
              >
                Let's Begin! ✨
              </motion.button>
            </div>
          ) : (
            <div className="grid gap-4">
              {questions[currentStep].options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white border-2 border-teal-400 text-gray-700 py-4 px-6 rounded-xl font-medium text-lg md:text-xl transition-all duration-300 hover:bg-teal-50 hover:border-teal-500 hover:text-teal-600 shadow-md hover:shadow-lg"
                  onClick={() => handleAnswer(option.value)}
                >
                  {option.text}
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-teal-50">
      <style jsx global>{`
            input:focus {
              outline: none !important;
              box-shadow: 0 0 0 2px rgba(45, 212, 191, 0.2) !important;
              border-color: #2DD4BF !important;
            }
          `}</style>

      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={200}
          recycle={false}
          colors={['#2DD4BF', '#0EA5E9', '#818CF8', '#34D399']}
        />
      )}

      <div className="fixed top-0 left-0 right-0 pt-8 px-4 z-10 bg-gradient-to-b from-white via-white to-transparent pb-8">
        <div className="w-full max-w-md mx-auto">
          <div className="w-full h-2 bg-teal-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-teal-400 to-blue-500"
              style={{ width: `${progress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-center mt-2 text-sm text-teal-600 font-medium">
            {Math.round(progress)}% Complete
          </p>
        </div>
      </div>

      <div className="flex flex-col min-h-screen pt-32 px-4 pb-16">
        <div className="flex-grow flex flex-col justify-center w-full max-w-md mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );

};

export default Questionnaire;