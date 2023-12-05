let pause = false;
this.addEventListener('keypress', event => {
  if (event.key === ' ' || event.key === 'Enter') {
    if (pause)
    pause = !pause;
  }
})

async function setTimer(time: number) {
  let time_element = document?.getElementById('time-text');
  if (time_element != null) {
    let i = 0;
    while (i < time) {
      time_element.innerText = Math.floor((time - i) / 60)
      .toLocaleString('en-Us' , {minimumIntegerDigits: 2})
      + ':' + ((time - i) % 60).toLocaleString('en-Us' , {minimumIntegerDigits: 2});
      const timer = new Promise(res => setTimeout(res, 1000));
      await timer;
      i++;
    }
  }
}

