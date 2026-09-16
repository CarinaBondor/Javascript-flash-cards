import type { Flashcard } from '../models/flashcard.model';

export const flashcardsData: Flashcard[] = [
  {
    id: 1,
    question: 'What is Angular?',
    answer: 'A component-based framework for building scalable web applications.',
    category: 'angular',
    editorial:
      'Angular is a TypeScript-based, open-source web application framework developed and maintained by Google. It is a complete development platform designed for building large-scale, high-performance Single-Page Applications (SPAs). Unlike React or Vue (which are technically lightweight libraries focused primarily on rendering the user interface), Angular is a "batteries-included" framework. This means it provides everything a developer needs to build an enterprise web application right out of the box, without forcing them to hunt for third-party tools.',
    level: 'beginner',
  },
  {
    id: 2,
    question: 'What is a component?',
    answer:
      'A reusable UI building block combining a TypeScript class, HTML template, and CSS styles.',
    category: 'angular',
    editorial:
      "Components are the main building blocks of Angular applications. Each component controls a section of the page and combines its data, behavior, markup, and styling. An Angular Component is the primary building block of an Angular application's user interface. It controls a portion of the screen (a view) and consists of three main elements: a TypeScript class (logic), an HTML template (structure), and CSS styles (appearance). In modern Angular, components are typically defined using Standalone Components, which do not require NgModule wrappers.",
    level: 'beginner',
  },
  {
    id: 3,
    question: 'What is a service?',
    answer:
      'A class decorated with @Injectable() used to share data and business logic across components.',
    category: 'angular',
    editorial:
      'Services keep shared logic outside components. Angular can create and provide a service through dependency injection, making the same logic reusable across different parts of the application.',
    level: 'beginner',
  },
  {
    id: 4,
    question: 'What are Angular Signals?',
    answer:
      'A reactive primitive that tracks state and automatically notifies consumers when its value changes.',
    category: 'angular',
    editorial:
      'Signals provide a simple way to represent reactive state. When a signal changes, Angular knows which parts of the application depend on it and can update them efficiently.',
    level: 'beginner',
  },
  {
    id: 5,
    question: 'What is computed() in Angular?',
    answer:
      'A reactive signal that derives its value from other signals and updates automatically when dependencies change.',
    category: 'angular',
    editorial:
      'computed() is useful for values that can be calculated from existing state. It caches the result and recalculates it when one of the signals it reads changes.',
    level: 'beginner',
  },
  {
    id: 6,
    question: 'What is effect() in Angular?',
    answer: 'An operation that runs side-effects whenever one or more tracked signals change.',
    category: 'angular',
    editorial:
      'effect() is intended for side effects such as logging, synchronizing with browser APIs, or saving state. It should not usually be used to calculate values that could be handled by computed().',
    level: 'beginner',
  },
  {
    id: 7,
    question: 'What is Dependency Injection (DI)?',
    answer:
      'A design pattern where classes receive dependencies from an external source rather than instantiating them directly.',
    category: 'angular',
    editorial:
      'Dependency injection reduces coupling between classes. Instead of constructing a dependency manually, a component asks Angular for it and Angular supplies the configured instance.',
    level: 'beginner',
  },
  {
    id: 8,
    question: 'What are Standalone Components?',
    answer:
      'Components that do not require an NgModule, declaring their dependencies directly in their imports array.',
    category: 'angular',
    editorial:
      'Standalone components make dependencies visible where they are used. They simplify application structure by allowing components, directives, pipes, and modules to be imported directly.',
    level: 'beginner',
  },
  {
    id: 9,
    question: 'What is built-in control flow?',
    answer:
      'Angular template syntax (@if, @for, @switch) introduced in Angular 17 that replaces *ngIf and *ngFor.',
    category: 'angular',
    editorial:
      'Built-in control flow keeps common template logic readable and removes the need for structural directive microsyntax in many cases. It also provides clearer blocks for conditions and loops.',
    level: 'beginner',
  },
  {
    id: 10,
    question: 'What is a Pipe?',
    answer:
      'A function used in templates to transform displayed values, such as currency, uppercase, or date.',
    category: 'angular',
    editorial:
      'Pipes transform values for display without changing the original data. Angular includes common pipes, and applications can define custom pipes for domain-specific formatting.',
    level: 'beginner',
  },
  {
    id: 11,
    question: 'What is the purpose of the input() function?',
    answer:
      'A signal-based way to receive inputs from parent components, replacing the @Input() decorator.',
    category: 'angular',
    editorial:
      'The input() function creates a signal that receives a value from a parent component. Reading the input with inputName() makes the value reactive inside the child.',
    level: 'beginner',
  },
  {
    id: 12,
    question: 'What is the purpose of the output() function?',
    answer:
      'A function used to emit custom events from child to parent components, replacing @Output().',
    category: 'angular',
    editorial:
      'The output() function lets a child component notify its parent about an event. The parent listens in the template and decides what action to take when the event occurs.',
    level: 'beginner',
  },
  {
    id: 13,
    question: 'What is Content Projection (<ng-content>)?',
    answer:
      'A mechanism to pass HTML elements or components into a child component placeholder from the parent.',
    category: 'angular',
    editorial:
      'ng-content enables a reusable component to accept content from its parent. The child defines the insertion point, while the parent supplies the projected markup.',
    level: 'beginner',
  },
  {
    id: 14,
    question: 'What is a Route Guard?',
    answer:
      'A function that controls navigation permissions, deciding if a route can be activated or deactivated.',
    category: 'angular',
    editorial:
      'Route guards run during navigation and can allow, cancel, or redirect a transition. They are commonly used for authentication, unsaved changes, or permission checks.',
    level: 'beginner',
  },
  {
    id: 15,
    question: 'What is ViewEncapsulation in Angular?',
    answer:
      'A feature that scopes component styles to prevent them from leaking into other parts of the DOM.',
    category: 'angular',
    editorial:
      'View encapsulation controls how Angular scopes component styles. The default mode gives component styles local behavior while still allowing global styles when needed.',
    level: 'intermediate',
  },
  {
    id: 16,
    question: 'What is the difference between Reactive Forms and Template-Driven Forms?',
    answer:
      'Reactive forms are model-driven and explicit in TypeScript, while template-driven forms rely on ngModel and directives in the template.',
    category: 'angular',
    editorial:
      'Reactive forms provide explicit form models and validation in TypeScript, which suits complex forms. Template-driven forms are often simpler for small forms whose behavior is mostly defined in HTML.',
    level: 'intermediate',
  },
  {
    id: 17,
    question: 'What is an Observable in RxJS?',
    answer:
      'A lazy push-based collection that can deliver multiple values over time to subscribers.',
    category: 'angular',
    editorial:
      'An Observable represents a stream of values that can arrive over time. Consumers subscribe to receive values and should manage subscriptions when they are not handled automatically.',
    level: 'beginner',
  },
  {
    id: 18,
    question: 'What is provideHttpClient()?',
    answer:
      'The provider function used in app.config.ts to enable HttpClient in modern standalone Angular applications.',
    category: 'angular',
    editorial:
      'provideHttpClient() registers Angular HTTP services with the application injector. After it is configured, components and services can inject HttpClient to make requests.',
    level: 'beginner',
  },
  {
    id: 19,
    question: 'What is the AsyncPipe?',
    answer:
      'A pipe that subscribes to an Observable or Promise and automatically un-subscribes when the component is destroyed.',
    category: 'angular',
    editorial:
      'AsyncPipe connects asynchronous data to a template declaratively. It updates the view as values arrive and handles subscription cleanup when the component is destroyed.',
    level: 'beginner',
  },
  {
    id: 20,
    question: 'What is Change Detection in Angular?',
    answer:
      'The process by which Angular checks whether application state changed and synchronizes the DOM accordingly.',
    category: 'angular',
    editorial:
      'Change detection is how Angular keeps the rendered page synchronized with component state. Angular checks bindings and updates only the DOM values affected by changed data.',
    level: 'beginner',
  },
];
