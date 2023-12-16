enum State {
  Timer,
  Tasks,
}

//global variables
let current_state = State.Timer; //state of application
let pause = true; //pause state
let time = 0; //time (stored in seconds)

//function to modify appearance of webpage when the pause state is changed.
function renderPause() {
  const play_element = document.getElementById('play-pause');
  if (pause === true && play_element != null) {
    play_element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="mx-auto" width="46" height="46" viewBox="0 0 24 24" stroke-width="2" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" stroke-width="0" fill="#ffffff" /></svg>`;
  } else if (pause === false && play_element != null) {
    play_element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="mx-auto" width="46" height="46" viewBox="0 0 24 24" stroke-width="2" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" stroke-width="0" fill="#ffffff" /><path d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" stroke-width="0" fill="#ffffff" /></svg>`;
  }
}

/*Changes pause and stores time when paused. Will create a new timer when unpaused
using existing time stored in global variables.*/
function changePauseState() {
  if (pause) {
    pause = false;
    setTimer(time);
  } else pause = true;
  renderPause();
}

/*async function that decreases time by 1 every second and calls renderTime.
Function aslso checks pause global variable as changed in changePauseState.*/
async function setTimer(time_length: number) {
  time = time_length;
  let time_element = document?.getElementById('time-text');
  if (time_element != null) {
    while (time > 0 && !pause) {
      renderTime();
      const timer = new Promise((res) => setTimeout(res, 1000));
      await timer;
      time--;
    }
  }
}

//function to be called when time is finished to handle future events.
function endTime() {
  time = 0;
  renderTime();
  pause = true;
}

/*renders the value of (global variable) to DOM in correct time format.
Returns false if div containing time can not be found.*/
function renderTime() {
  let time_element = document?.getElementById('time-text');
  if (time_element != null) {
    time_element.innerText =
      Math.floor(time / 60).toLocaleString('en-Us', {
        minimumIntegerDigits: 2,
      }) +
      ':' +
      (time % 60).toLocaleString('en-Us', { minimumIntegerDigits: 2 });
    return true;
  }
  return false;
}

/*onlcick function for setting length of timer, ensures that time stays within bounds.
Calls renderTimer for visual feedback after updating time.*/
function changeTime(magnitude: number) {
  //will only change time while timer is paused
  if (pause === true) {
    if (time + magnitude > 5999) {
      //max time supported (99:59)
      time = 5999;
    } else if (time + magnitude < 0) {
      //minimum time supported (00:00)
      time = 0;
    } else time += magnitude;
    renderTime();
  }
}

//onclick function similar to changeTime but sets time to value rather than changing by value.
function setTime(value: number) {
  //set time only if timer is paused
  if (pause === true) {
    time = value;
    renderTime();
  }
}

//Switch state function responsible for switching between time buttons and categories.
function switchChangeTimeandCategory() {
  //creates an array of HTMLElements corresponding to buttons being targeted.
  const components = [
    document?.getElementById('um-cat1'),
    document?.getElementById('us-cat2'),
    document?.getElementById('dm-cat3'),
    document?.getElementById('ds-cat4'),
  ];

  let index = 0; //index for array elements and category names.

  //creates time buttons to default categories.
  if (current_state === State.Tasks) {
    for (let component of components) {
      if (component != null) {
        index++;
        component.innerHTML = `<p>Category ${index}<p>`;
      }
    }
  }
  //inserts arrow svg's.
  else if (current_state === State.Timer) {
    //array of svg icons used for minute and second buttons.
    const svg = [
      `<svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="#a5f4fc" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.586 3l-6.586 6.586a2 2 0 0 0 -.434 2.18l.068 .145a2 2 0 0 0 1.78 1.089h2.586v5a1 1 0 0 0 1 1h6l.117 -.007a1 1 0 0 0 .883 -.993l-.001 -5h2.587a2 2 0 0 0 1.414 -3.414l-6.586 -6.586a2 2 0 0 0 -2.828 0z" stroke-width="0" fill="#a5f4fc" /><path d="M15 20a1 1 0 0 1 .117 1.993l-.117 .007h-6a1 1 0 0 1 -.117 -1.993l.117 -.007h6z" stroke-width="0" fill="#a5f4fc" /></svg> `,
      `<svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="#a5f4fc" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.586 3l-6.586 6.586a2 2 0 0 0 -.434 2.18l.068 .145a2 2 0 0 0 1.78 1.089h2.586v5a1 1 0 0 0 1 1h6l.117 -.007a1 1 0 0 0 .883 -.993l-.001 -5h2.587a2 2 0 0 0 1.414 -3.414l-6.586 -6.586a2 2 0 0 0 -2.828 0z" stroke-width="0" fill="#a5f4fc" /><path d="M15 20a1 1 0 0 1 .117 1.993l-.117 .007h-6a1 1 0 0 1 -.117 -1.993l.117 -.007h6z" stroke-width="0" fill="#a5f4fc" /></svg>`,
      `<svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-big-down-line-filled" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="#a5f4fc" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 5l-.117 .007a1 1 0 0 0 -.883 .993v4.999l-2.586 .001a2 2 0 0 0 -1.414 3.414l6.586 6.586a2 2 0 0 0 2.828 0l6.586 -6.586a2 2 0 0 0 .434 -2.18l-.068 -.145a2 2 0 0 0 -1.78 -1.089l-2.586 -.001v-4.999a1 1 0 0 0 -1 -1h-6z" stroke-width="0" fill="#a5f4fc" /><path d="M15 2a1 1 0 0 1 .117 1.993l-.117 .007h-6a1 1 0 0 1 -.117 -1.993l.117 -.007h6z" stroke-width="0" fill="#a5f4fc" /></svg>`,
      `<svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-big-down-line-filled" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="#a5f4fc" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 5l-.117 .007a1 1 0 0 0 -.883 .993v4.999l-2.586 .001a2 2 0 0 0 -1.414 3.414l6.586 6.586a2 2 0 0 0 2.828 0l6.586 -6.586a2 2 0 0 0 .434 -2.18l-.068 -.145a2 2 0 0 0 -1.78 -1.089l-2.586 -.001v-4.999a1 1 0 0 0 -1 -1h-6z" stroke-width="0" fill="#a5f4fc" /><path d="M15 2a1 1 0 0 1 .117 1.993l-.117 .007h-6a1 1 0 0 1 -.117 -1.993l.117 -.007h6z" stroke-width="0" fill="#a5f4fc" /></svg>`,
    ];

    //changes category buttons to svg's.
    for (let component of components) {
      if (component != null) {
        component.innerHTML = svg[index];
        index++;
      }
    }
  }
}

/*switchState is responsible for switching state betweeb timer and tasks and is an onclick function.
The function dispatches several functions responsible for changing the state of each component.*/
function switchState() {
  current_state = (current_state + 1) % 2;
  console.log(current_state);
  switchChangeTimeandCategory();
}
