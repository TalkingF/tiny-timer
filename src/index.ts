function setTimer(count: number, time: number) {
  console.log('executed');
  let time_element = document?.getElementById('timer');
  if (count > time) return;
  if (time_element != null) {
    time_element.innerText = Math.floor(time / 60) + ":" + time % 60;
    setTimeout(() => setTimer(count, time - 1), 1000);
  }
}

