function setTimer(count: number, time: number) {
  console.log('executed');
  let time_element = document?.getElementById('time-text');
  if (count > time) return;
  if (time_element != null) {
    time_element.innerText = Math.floor(time / 60).toLocaleString('en-Us' , {minimumIntegerDigits: 2})
     + ':' + (time % 60).toLocaleString('en-Us' , {minimumIntegerDigits: 2});
    setTimeout(() => setTimer(count, time - 1), 1000);
  }
}

