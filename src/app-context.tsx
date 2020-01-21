import React from "react";

export enum Action {
  "increment",
  "decrement"
}

type Dispatch = (action: Action) => void;
type State = { count: number };
type CountProviderProps = { children: React.ReactNode };

const CountStateContext = React.createContext<State | undefined>(undefined);
const CountDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

function CountProvider({ children }: CountProviderProps) {
  //const [state, dispatch] = React.useState({ count: 0 });
  const [state, dispatch] = React.useReducer(handleCount, { count: 0 });

  function handleCount(state: State, action: Action) {
    switch (action) {
      case Action.increment: {
        return { count: state.count + 1 };
      }
      case Action.decrement: {
        return { count: state.count - 1 };
      }
      default: {
        throw new Error(`Unhandled action type: ${action}`);
      }
    }
  }

  return (
    <CountStateContext.Provider value={state}>
      <CountDispatchContext.Provider value={dispatch}>
        {children}
      </CountDispatchContext.Provider>
    </CountStateContext.Provider>
  );
}

function useCountState() {
  const context = React.useContext(CountStateContext);
  if (context === undefined) {
    throw new Error("useCountState must be used within a CountProvider");
  }
  return context;
}

function useCountDispatch() {
  const context = React.useContext(CountDispatchContext);
  if (context === undefined) {
    throw new Error("useCountDispatch must be used within a CountProvider");
  }
  return context;
}

export { CountProvider, useCountState, useCountDispatch };
