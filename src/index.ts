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

/*async function that decreases time by 1 every second and renders to DOM.
Function aslso checks pause global variable as changed in changePauseState*/ 
async function setTimer(time_length: number) {
  time = time_length;
  let time_element = document?.getElementById('time-text');
  if (time_element != null) {
    while (time > 0 && !pause) {
      time_element.innerText = Math.floor((time) / 60)
      .toLocaleString('en-Us' , {minimumIntegerDigits: 2})
      + ':' + ((time) % 60).toLocaleString('en-Us' , {minimumIntegerDigits: 2});
      const timer = new Promise(res => setTimeout(res, 1000));
      await timer;
      time--;
    }
  }
}



