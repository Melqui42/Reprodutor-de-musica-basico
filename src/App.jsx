import React from "react";

import { TbRepeat, TbRepeatOff } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import { BsThreeDots, BsFillVolumeUpFill, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";

import Yesterday from "./Assets/Sound/Yesterday.mp3";
import YesterdayTheBeatles from "./Assets/Yesterday - The Beatles.jpeg";

import "./Style.scss";

function App() {
  const [buttonRepeat, setButtonRepeat] = React.useState(false);

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);

  const audioPlayer = React.useRef();
  const progressBar = React.useRef();
  const animationRef = React.useRef(); // reference the animation

  React.useEffect(() => {
    setDuration(Math.floor(audioPlayer.current.duration));
    progressBar.current.max = Math.floor(audioPlayer.current.duration);
  }, [audioPlayer?.current?.readyState, audioPlayer.current?.loadedmetadata]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty("--seek-before-width", `${(progressBar.current.value / duration) * 100}%`);
    setCurrentTime(progressBar.current.value);
  };

  const backThirty = () => {
    progressBar.current.value = Number(progressBar.current.value - 30);
    changeRange();
  };

  const forwardThirty = () => {
    progressBar.current.value = Number(progressBar.current.value + 30);
    changeRange();
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  return (
    <div className="App">
      <div className="PlayerDeMusica">
        <div className="Title">
          <ul className="List">
            <li className="Item">
              <button>
                <IoIosArrowDown />
              </button>
            </li>
            <li className="Item">
              <p>Now Playing</p>
            </li>
            <li className="Item">
              <button>
                <BsThreeDots />
              </button>
            </li>
          </ul>
        </div>
        <div className="Detalhes">
          <img src={YesterdayTheBeatles} alt="" />
          <div className="Text">
            <h1>Yesterday - The Beatles</h1>
            <p>The Beatles</p>
          </div>
        </div>
        <div className="BarraDaMusica">
          <input type="range" ref={progressBar} name="" id="" defaultValue="0" onChange={changeRange} />
          <div className="TempoDaMusica">
            <div className="TempoDeDuracaoAtual">{calculateTime(currentTime)}</div>
            <div className="TempoDaDuracaoTotal">{duration && !isNaN(duration) ? calculateTime(duration) : "0:00"}</div>
          </div>
          <audio ref={audioPlayer} src={Yesterday}></audio>
        </div>
        <div className="Controles">
          <ul className="List">
            <li className="Item">
              <button onClick={() => setButtonRepeat(!buttonRepeat)}>
                {!buttonRepeat ? <TbRepeat /> : <TbRepeatOff />}
              </button>
            </li>
            <li className="Item">
              <button onClick={backThirty}>
                <MdSkipPrevious />
              </button>
            </li>
            <li className="Item">
              <button
                onClick={() => {
                  setIsPlaying(!isPlaying);

                  if (!isPlaying) {
                    audioPlayer.current.play();
                    animationRef.current = requestAnimationFrame(whilePlaying);
                  } else {
                    audioPlayer.current.pause();
                    cancelAnimationFrame(animationRef.current);
                  }
                }}
              >
                {!isPlaying ? <BsFillPauseFill /> : <BsFillPlayFill />}
              </button>
            </li>
            <li className="Item">
              <button onClick={forwardThirty}>
                <MdSkipNext />
              </button>
            </li>
            <li className="Item">
              <button>
                <BsFillVolumeUpFill />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
