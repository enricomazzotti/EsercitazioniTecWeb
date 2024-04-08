var count = 0;

startStudySession = function (studyTime, restTime) {
  const studyAnimationDuration = studyTime * 60;
  const restAnimationDuration = restTime * 60;
  element = document.querySelector("#form");
  element.setAttribute("hidden", "hidden");
       

  /*
  document.querySelector(".studyBlob").style.animation = 'none';
  document.querySelector(".restBlob").style.animation = 'none';
  */

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

// Aggiunge un listener per l'evento di submit al form con id 'studyForm'
document.getElementById('studyForm').addEventListener('submit', function (event) {
  event.preventDefault();

  // Ottiene il tempo di studio inserito dall'utente e lo converte in un numero intero
  let studyTime = parseInt(document.getElementById('studyTime').value, 10);
  let restTime = parseInt(document.getElementById('restTime').value, 10);
  let studyCycle = parseInt(document.getElementById('studyCycle').value, 10);
  /*
  console.log(studyTime);
  console.log(restTime);
  console.log(studyCycle);
  */
  //startStudySession(studyTime, restTime);

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

  /*

  

  // Calcola il tempo di fine aggiungendo la durata del timer al tempo corrente
  

  // Imposta un intervallo che si ripete ogni secondo
  const interval = setInterval(function () {
    const now = Date.now();
    // Calcola la differenza tra il tempo di fine e il tempo corrente
    const difference = endTime - now;

    // Se la differenza è minore o uguale a 0, ferma l'intervallo
    if (difference <= 0) {
      clearInterval(interval);
      // Pulisce il testo dell'elemento con id 'timerDisplay'
      document.getElementById('timerDisplay').textContent = "";

      return;
    }

    // Calcola i minuti e i secondi rimanenti
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Visualizza il tempo rimanente nell'elemento con id 'timerDisplay'
    //padstart aggiunge uno zero prima della stringa se non raggiunge almeno una lunghezza di 2
    document.getElementById('timerDisplay').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, 1000);
  */
});

