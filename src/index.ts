//global variables
let pause = false; //pause state
let time = 0; //time (stored in seconds)

/*Changes pause and stores time when paused. Will create a new timer when unpaused
using existing time stored in global variables.*/
function changePauseState() {
  if (pause) {
    pause = false;
    setTimer(time);
  } 
  else pause = true;
  
}

/*async function that decreases time by 1 every second and calls renderTime.
Function aslso checks pause global variable as changed in changePauseState*/ 
async function setTimer(time_length: number) {
  time = time_length;
  let time_element = document?.getElementById('time-text');
  if (time_element != null) {
    while (time > 0 && !pause) {
      renderTime();
      const timer = new Promise(res => setTimeout(res, 1000));
      await timer;
      time--;
    }
  }
}

//function to be called when time is finished to handle future events
function endTime() {
  time = 0;
  renderTime();
}

/*renders the value of (global variable) to DOM in correct time format.
Returns false if div containing time can not be found*/
function renderTime() {
  let time_element = document?.getElementById('time-text');
  if (time_element != null) {
    time_element.innerText = Math.floor((time) / 60)
    .toLocaleString('en-Us' , {minimumIntegerDigits: 2})
    + ':' + ((time) % 60).toLocaleString('en-Us' , {minimumIntegerDigits: 2});
    return true;
  }
  return false;
}

