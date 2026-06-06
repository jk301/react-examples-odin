import { useState } from 'react';
import './App.css';

const COLORS = ['pink', 'green', 'blue', 'yellow', 'purple', 'magenta'];

function App() {
  const [backgroundColor, setBackgroundColor] = useState(COLORS[2]);
  const [count, setCount] = useState(0)

  const onButtonClick = (color) => () => {
    setBackgroundColor(color);
    setCount(count => count + 1)
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor,
      }}
    >
      {COLORS.map((color) => (
        <button
          type="button"
          key={color}
          onClick={onButtonClick(color)}
          className={backgroundColor === color ? 'selected' : ''}
        >
          {color}
        </button>
      ))}
      <p style={{
        fontSize: "35px",
        fontWeight: 900
      }}>Background changes: {count}</p>
    </div>
  );
}

export default App;
