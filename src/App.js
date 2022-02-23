import React, { useEffect, useState, useRef } from "react";
import classNames from "classnames";
import "./App.css";

const App = () => {
  const [side, _setSide] = useState(null);
  const [result, setResult] = useState();
  const playRef = useRef(null);
  const sideRef = useRef(null);
  const timeoutRef = useRef(null);

  const setSide = (s) => {
    sideRef.current = s;
    _setSide(s);
  };

  const show = () => {
    setSide(Math.round(Math.random()));
    timeoutRef.current = setTimeout(() => {
      notify("fail");
    }, 1000);
  };

  const notify = (res) => {
    setSide(null);
    setResult(res);
    playRef.current = null;
    setTimeout(() => {
      setResult("");
      play();
    }, 300);
  };

  const checkResult = (e) => {
    clearTimeout(timeoutRef.current);
    clearTimeout(playRef.current);
    switch (e.keyCode) {
      case 70:
        notify(sideRef.current === 0 ? "success" : "fail");
        break;
      case 74:
        notify(sideRef.current === 1 ? "success" : "fail");
        break;
      default:
        notify("fail");
    }
  };

  const play = () =>
    !playRef.current &&
    (playRef.current = setTimeout(show, Math.random() * (3000 - 500) + 500));

  useEffect(() => {
    document.addEventListener("keydown", checkResult);
    play();
    return () => {
      document.removeEventListener("keydown");
    };
  }, []);

  return (
    <div className={classNames("game", result)}>
      <div className="container">
        {side === 0 && <div className="box">F</div>}
      </div>
      <div className="container">
        {side === 1 && <div className="box">J</div>}
      </div>
    </div>
  );
};

export default App;
