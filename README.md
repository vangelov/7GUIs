# 7GUIs in React with Signals

[Live Demo](https://relaxed-kheer-f381d1.netlify.app/)

An implementation of the [7GUIs challenge](https://eugenkiss.github.io/7guis/) in React using [Signals](https://preactjs.com/guide/v10/signals/) for managing the application state.

## Why Signals

Signals are not really a new approach to state management. MobX already did something similar years ago. What got my attention is how simple the core API is. What's more, the integration with React is (almost) completely transparent. You just access a signal's value from a React component and it will re-render every time the value changes. The only caveat is Signals does not yet support fast-refresh and concurrent rendering. Both are not really significant downsides to me. The advantages of Signals are well explained in the [Preact blog](https://preactjs.com/blog/introducing-signals).

## Signals vs Jotai

Although Jotai solves the same problem as Signals, it makes the state-related logic non-idiomatic. Take a look at the Jotai author's implementation for the [7GUIs tasks](https://blog.axlight.com/posts/learning-react-state-manager-jotai-with-7guis-tasks/). It works well, but the code doesn't really look like normal JavaScript you would write if you weren't concerned about updating the UI. This is where Signals shine in my opinion. Other that having to set the `value` property of the signal instance, everything else is just your everyday JavaScript data manipulation.

## General Approach

Each task is implemented with the following rules in mind:

- All the state is contained in a single object

- All state updates are done by executing an action. An action is just a function that takes the state as a first parameter and updates it.

- All views are dumb. They don't know where their data comes from, nor how to update the state.

- In order to access or update the state there are controller components whose sole purpose is to mediate between the view and the state. They are similar to the connected components in Redux or view controllers in iOS.

- Unidirectional flow:
  ```
  View -> Controller -> Action -> State
   ^                                |
   |________________________________|
  ```
