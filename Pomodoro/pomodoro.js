var count = 0;

startStudySession = function (studyTime, restTime) {
  const studyAnimationDuration = studyTime * 60;
  const restAnimationDuration = restTime * 60;
  element = document.querySelector("#form");
  element.setAttribute("hidden", "hidden");
       

  const styleSheet = document.createElement("style");
  styleSheet.innerText = `
    .studyBlob{
      animation: study${count} ${studyAnimationDuration}s linear;
    }
    .restBlob {
      animation: rest${count} ${restAnimationDuration}s linear ${studyAnimationDuration}s;
    }
    @keyframes rest${count} {
      from {
          background-color: red;
          height: 0%;
      }
      to {
          background-color: greenyellow;
          height: 100%;
      }
    }
    @keyframes study${count} {
        from {
            background-color: greenyellow;
            height: 100%;
        }
        to {
            background-color: red;
            height: 0%;
        }
    }
  `;
  count++;
  document.head.appendChild(styleSheet);
}


document.getElementById('studyForm').addEventListener('submit', function (event) {
  event.preventDefault();


  let studyTime = parseInt(document.getElementById('studyTime').value, 10);
  let restTime = parseInt(document.getElementById('restTime').value, 10);
  let studyCycle = parseInt(document.getElementById('studyCycle').value, 10);

  for (let i = 0; i < studyCycle; i++) {
    setTimeout(function () {
      startStudySession(studyTime, restTime);
    }, (studyTime + restTime) * 60000 * i);
  }
  document.getElementById('timerTitle').textContent = "Study time!";
  let studyCycleIndex = 0;
  const endTime = Date.now() + (studyTime+restTime)*studyCycle * 60000;
  let nextbreak = Date.now() + studyTime * 60000;
  let wasStuding = true;
  const interval = setInterval(function () {
    console.log("interval");
    const now = Date.now();
    const difference = endTime - now;
    const breakdifference = nextbreak - now;
    if (difference <= 0) {
      clearInterval(interval);
      document.getElementById('timerDisplay').textContent = "";
      document.getElementById('timerTitle').textContent = "";
      element.removeAttribute("hidden");
      return;
    }
    if (breakdifference <= 0) {
      if (wasStuding) {
        wasStuding = false;
        nextbreak = Date.now() + restTime * 60000;
        document.getElementById('timerTitle').textContent = "Break time!";
      }else{
        wasStuding = true;
        nextbreak = Date.now() + studyTime * 60000;
        document.getElementById('timerTitle').textContent = "Study time!";

      }
    }
    else {
      const minutes = Math.floor((breakdifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((breakdifference % (1000 * 60)) / 1000);
      document.getElementById('timerDisplay').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
  }, 1000);
});

