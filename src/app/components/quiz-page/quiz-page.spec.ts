import { pickDistractors } from './quiz-page';
import { Flashcard } from '../../models/flashcard.model';

const card = (id: number, category: string, answer: string): Flashcard => ({
  id,
  question: `Question ${id}`,
  answer,
  category,
  level: 'beginner',
});

describe('pickDistractors', () => {
  const question = card(1, 'typescript', 'Correct');

  it('prefers answers from the same category', () => {
    const cards = [
      question,
      card(2, 'typescript', 'TS 1'),
      card(3, 'typescript', 'TS 2'),
      card(4, 'typescript', 'TS 3'),
      card(5, 'angular', 'NG 1'),
      card(6, 'angular', 'NG 2'),
    ];

    expect(pickDistractors(question, cards).sort()).toEqual(['TS 1', 'TS 2', 'TS 3']);
  });

  it('fills up from other categories when the category is small', () => {
    const cards = [question, card(2, 'typescript', 'TS 1'), card(3, 'angular', 'NG 1'), card(4, 'angular', 'NG 2')];

    const result = pickDistractors(question, cards);
    expect(result).toHaveLength(3);
    expect(result).toContain('TS 1');
  });

  it('never repeats an answer or repeats the correct one', () => {
    const cards = [
      question,
      card(2, 'typescript', 'Correct'),
      card(3, 'typescript', 'Same'),
      card(4, 'typescript', 'Same'),
      card(5, 'angular', 'Other'),
    ];

    const result = pickDistractors(question, cards);
    expect(result).not.toContain('Correct');
    expect(new Set(result).size).toBe(result.length);
  });
});
