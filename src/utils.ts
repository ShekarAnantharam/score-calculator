// utils.ts
export const calculateScore = (answers: string[]): number => {
    const yesCount: number = answers.filter((answer) => answer === 'Yes').length;
    return answers.length > 0 ? (yesCount / answers.length) * 100 : 0;
  };
  
  export const calculateAverage = (scores: number[]): number | null => {
    if (scores.length === 0) return null;
    const totalScore: number = scores.reduce((acc, score) => acc + score, 0);
    return totalScore / scores.length;
  };
  