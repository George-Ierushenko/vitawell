export const getQuestions = (t) => {
  return [
    {
      text: t('I think about money all the time'),
      event_name: 'financial_mindset_question',
      options: [
        { text: t('This is so me 😂'), value: 'always' },
        { text: t('Almost there 😊'), value: 'almost' },
        { text: t('Not always 😕'), value: 'sometimes' },
        { text: t('Rarely 😭'), value: 'rarely' },
      ],
    },
    {
      text: t('My financial situation is stable'),
      event_name: 'financial_stability_question',
      options: [
        { text: t('This is so me 😂'), value: 'always' },
        { text: t('Almost there 😊'), value: 'almost' },
        { text: t('Not always 😕'), value: 'sometimes' },
        { text: t('Rarely 😭'), value: 'rarely' },
      ],
    },
    {
      text: t('I save money regularly'),
      event_name: 'savings_habits_question',
      options: [
        { text: t('This is so me 😂'), value: 'always' },
        { text: t('Almost there 😊'), value: 'almost' },
        { text: t('Not always 😕'), value: 'sometimes' },
        { text: t('Rarely 😭'), value: 'rarely' },
      ],
    },
    {
      text: t('I feel confident about investing'),
      event_name: 'investment_confidence_question',
      options: [
        { text: t('This is so me 😂'), value: 'always' },
        { text: t('Almost there 😊'), value: 'almost' },
        { text: t('Not always 😕'), value: 'sometimes' },
        { text: t('Rarely 😭'), value: 'rarely' },
      ],
    },
  ]
}
