function setTimer(count: number, time: number) {
  console.log('executed');
  let time_element = document?.getElementById('timer');
  if (count > time) return;
  if (time_element != null) {
    time_element.innerText = time.toString();
    setTimeout(() => setTimer(count, time - 1), 1000);
  }
}
