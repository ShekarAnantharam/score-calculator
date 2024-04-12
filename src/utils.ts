
export const calculateScore = (answers: string[]): number => {
  const yesCount: number = answers.filter((answer) => answer === 'Yes').length;
  return answers.length > 0 ? (yesCount / answers.length) * 100 : 0;
};

export const calculateAverage = (scores: number[]): number => {
  const totalScore = scores.reduce((sum, score) => sum + score, 0);
  return scores.length > 0 ? totalScore / scores.length : 0;
};
