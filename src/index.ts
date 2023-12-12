let pause = false;
let time = 0;
function changePauseState() {
  if (pause) {
    pause = false;
    setTimer(time);
  } 
  else pause = true;
  
}

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

