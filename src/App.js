import React from "react"
import './App.css';

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}


class App extends React.Component{
  constructor(){
    super()
    this.state = {
      breakTime: 5,
      sessionTime: 25,
      currentTime: "",
      isSession: true,
      timer: null,
      isStart: false,
      isCompleted: false
    }
    this.breakTimeDecrement = this.breakTimeDecrement.bind(this);
    this.breakTimeIncrement = this.breakTimeIncrement.bind(this);
    this.sessionTimeDecrement = this.sessionTimeDecrement.bind(this);
    this.sessionTimeIecrement = this.sessionTimeIecrement.bind(this);
    this.startOrStop = this.startOrStop.bind(this);
    this.refresh = this.refresh.bind(this);
    this.timerInterval = this.timerInterval.bind(this);
  }
  componentDidMount(){
    let {sessionTime} = this.state;
    this.setState({
      currentTime: sessionTime*60
    })
  }
  breakTimeDecrement(){
    let {breakTime} = this.state;
    this.setState({
      breakTime: breakTime-1
    });
  }
  breakTimeIncrement(){
    let {breakTime} = this.state;
    this.setState({
      breakTime: breakTime+1
    });
  }
  sessionTimeDecrement(){
    let {sessionTime} = this.state
    this.setState({
      sessionTime: sessionTime -1
    });

  }
  sessionTimeIecrement(){
    let {sessionTime} = this.state;
    this.setState({
      sessionTime: sessionTime+1
    });

  }
  startOrStop(){
    let {isStart, timer} = this.state;
    if(isStart === false){
      document.getElementById("start_stop").className ="fa fa-pause fa-2x";
      let timer = setInterval(this.timerInterval, 1000);
      this.setState({
        isStart: true,
        timer:timer
      });
    }else{
      document.getElementById("start_stop").className ="fa fa-play fa-2x";
      this.setState({
        isStart: false,
        timer: clearInterval(timer)
      });
    }
  }
  timerInterval(){
    let {currentTime, isSession, breakTime, sessionTime, isCompleted} = this.state;
    this.setState({
      currentTime : sessionTime*60
    })
    if(isSession && !isCompleted ) { 
      if (currentTime === 0) {
        this.setState({
          isCompleted:true,
          isSession: false,
          currentTime: breakTime*60
        })
        let audio = new Audio("https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav");
        audio.play();
      } else {
        this.setState({
          currentTime: currentTime -1,
        })
      }
    }else {
      if(currentTime === 0){
        this.setState({
          currentTime: sessionTime*60,
          isSession: true,

        })
      }else{
        this.setState({
          currentTime: currentTime- 1
        })
      }
      console.log(currentTime);
  }
  }
  refresh(){
    let {timer, sessionTime} = this.state;
    document.getElementById("start_stop").className ="fa fa-play fa-2x";
    console.log("refresh");
    clearInterval(timer);
    this.setState({
      breakTime: 5,
      sessionTime: 25,
      currentTime: sessionTime*60,
      isSession: true,
      timer: null,
      isStart: false,
      isCompleted: false
    })
  }
  render(){
    let {breakTime, sessionTime, isSession, currentTime} = this.state;
    return (
        <div id="App" className="App">
          <div id="App-title" className="App-title">
            <h1 id="title">Pomodoro Clock</h1>
          </div>
          <section id="control" className="control">
            <div className="session-label-container" style={{display:"flex", flexDirection:"column"}}>
                <div className="session-title">
                    <h3>Session length</h3>
                </div>
                <div id="session-label" className="session-label">
                    <button id="session-decrement" onClick={this.sessionTimeDecrement}>
                    <i className="fa fa-arrow-down fa-2x"></i>
                    </button>
                    <div id="sessionTime" className="sessionTime">{sessionTime}</div>
                    <button id="session-increment" onClick={this.sessionTimeIecrement}>
                    <i className="fa fa-arrow-up fa-2x"></i>
                    </button>
                </div>
            </div>
            <div className="break-label-container">
                <div className="session-title">
                    <h3>Break length</h3>
                </div>
                <div id="break-label" className="break-label">
                    <button id="break-decrement" onClick={this.breakTimeDecrement}>
                        <i className="fa fa-arrow-down fa-2x"></i>
                    </button>
                    <div id="breakTime" className="breakTime" >{breakTime}</div>
                    <button id="break-increment" onClick={this.breakTimeIncrement}>
                        <i className="fa fa-arrow-up fa-2x"></i>
                    </button>
                </div>
            </div>
          </section>
          <section id="display">
            <div className="time-wrapper">
              <div id="timer-label">{isSession ? "Session" : "Break"}</div>
              <div id="time-left">{isSession ? formatTime(currentTime):formatTime(currentTime)}</div>
            </div>
            <div id="timer-control" className="timer-control">
              <button id="startStop" onClick={this.startOrStop}>
                <i className="fa fa-play fa-2x" id="start_stop"></i>
              </button>
              <button id="refresh" onClick={this.refresh}>
                <i className="fas fa-sync"></i>
              </button>
            </div>
          </section>
        </div>
    )
  }
}

export default App;
