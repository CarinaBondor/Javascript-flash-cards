export interface Flashcard {
  id: number;
  question: string;
  answer: string;
  category?: string;
  editorial?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}
