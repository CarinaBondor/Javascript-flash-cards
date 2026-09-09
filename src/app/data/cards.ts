import type { Flashcard } from '../models/flashcard.model';

export const flashcardsData: Flashcard[] = [
  {
    id: 1,
    question: 'What is Angular?',
    answer: 'A component-based framework for building scalable web applications.',
    category: 'angular',
  },
  {
    id: 2,
    question: 'What is a component?',
    answer:
      'A reusable UI building block combining a TypeScript class, HTML template, and CSS styles.',
    category: 'angular',
  },
  {
    id: 3,
    question: 'What is a service?',
    answer:
      'A class decorated with @Injectable() used to share data and business logic across components.',
    category: 'angular',
  },
  {
    id: 4,
    question: 'What are Angular Signals?',
    answer:
      'A reactive primitive that tracks state and automatically notifies consumers when its value changes.',
    category: 'angular',
  },
  {
    id: 5,
    question: 'What is computed() in Angular?',
    answer:
      'A reactive signal that derives its value from other signals and updates automatically when dependencies change.',
    category: 'angular',
  },
  {
    id: 6,
    question: 'What is effect() in Angular?',
    answer: 'An operation that runs side-effects whenever one or more tracked signals change.',
    category: 'angular',
  },
  {
    id: 7,
    question: 'What is Dependency Injection (DI)?',
    answer:
      'A design pattern where classes receive dependencies from an external source rather than instantiating them directly.',
    category: 'angular',
  },
  {
    id: 8,
    question: 'What are Standalone Components?',
    answer:
      'Components that do not require an NgModule, declaring their dependencies directly in their imports array.',
    category: 'angular',
  },
  {
    id: 9,
    question: 'What is built-in control flow?',
    answer:
      'Angular template syntax (@if, @for, @switch) introduced in Angular 17 that replaces *ngIf and *ngFor.',
    category: 'angular',
  },
  {
    id: 10,
    question: 'What is a Pipe?',
    answer:
      'A function used in templates to transform displayed values, such as currency, uppercase, or date.',
    category: 'angular',
  },
  {
    id: 11,
    question: 'What is the purpose of the input() function?',
    answer:
      'A signal-based way to receive inputs from parent components, replacing the @Input() decorator.',
    category: 'angular',
  },
  {
    id: 12,
    question: 'What is the purpose of the output() function?',
    answer:
      'A function used to emit custom events from child to parent components, replacing @Output().',
    category: 'angular',
  },
  {
    id: 13,
    question: 'What is Content Projection (<ng-content>)?',
    answer:
      'A mechanism to pass HTML elements or components into a child component placeholder from the parent.',
    category: 'angular',
  },
  {
    id: 14,
    question: 'What is a Route Guard?',
    answer:
      'A function that controls navigation permissions, deciding if a route can be activated or deactivated.',
    category: 'angular',
  },
  {
    id: 15,
    question: 'What is ViewEncapsulation in Angular?',
    answer:
      'A feature that scopes component styles to prevent them from leaking into other parts of the DOM.',
    category: 'angular',
  },
  {
    id: 16,
    question: 'What is the difference between Reactive Forms and Template-Driven Forms?',
    answer:
      'Reactive forms are model-driven and explicit in TypeScript, while template-driven forms rely on ngModel and directives in the template.',
    category: 'angular',
  },
  {
    id: 17,
    question: 'What is an Observable in RxJS?',
    answer:
      'A lazy push-based collection that can deliver multiple values over time to subscribers.',
    category: 'angular',
  },
  {
    id: 18,
    question: 'What is provideHttpClient()?',
    answer:
      'The provider function used in app.config.ts to enable HttpClient in modern standalone Angular applications.',
    category: 'angular',
  },
  {
    id: 19,
    question: 'What is the AsyncPipe?',
    answer:
      'A pipe that subscribes to an Observable or Promise and automatically un-subscribes when the component is destroyed.',
    category: 'angular',
  },
  {
    id: 20,
    question: 'What is Change Detection in Angular?',
    answer:
      'The process by which Angular checks whether application state changed and synchronizes the DOM accordingly.',
    category: 'angular',
  },
];
