import * as React from "react";
import {
  Action,
  CountProvider,
  useCountState,
  useCountDispatch
} from "./app-context";

function CountDisplay() {
  const { count } = useCountState();

  const [renderizou, setRenderizou] = React.useState(0);

  function handleRenderizou() {
    setRenderizou(renderizou + 1);
  }

  React.useEffect(handleRenderizou, [count]);

  return (
    <>
      <div>{`The current count is ${count}`}</div>
      <div>Renderizou {renderizou} vezes</div>
    </>
  );
}

function Counter() {
  const dispatch = useCountDispatch();

  return (
    <>
      <button onClick={() => dispatch(Action.increment)}>
        Increment count
      </button>
    </>
  );
}

const App: React.FC = () => {
  return (
    <>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </>
  );
};

export default App;
