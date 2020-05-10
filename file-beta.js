// -- GLOBAL VARIABLES --
let secondsLeft;
let countdown;
let interval;
let str1;

// -- DEFAULTS -- 

let defaults = {
    sessionTime: 0,
    storedTime: 0,
    sessionPaused: 0,
    sessionOnBreak: 0,
    breakTime: 0,
    counter: 0
};

// -- HTML SELECTORS --

let session20 = document.querySelector(".m20");
let session30 = document.querySelector(".m30");
let session45 = document.querySelector(".m45");

let break5 = document.querySelector(".b5");
let break10 = document.querySelector(".b10");
let break15 = document.querySelector(".b15");

let choices = document.querySelector(".choices");

let increaseSessionBtn = document.querySelector("#increase-session");
let chooseSessionDuration = document.querySelector("#session-length-number");
let decreaseSessionBtn = document.querySelector("#decrease-session");

let increaseBreakBtn = document.querySelector("#increase-break");
let chooseBreakDuration = document.querySelector("#countdown-break");
let decreaseBreakBtn = document.querySelector("#decrease-break");
chooseBreakDuration.innerHTML = "00:00";

let sessionTimer = document.querySelector("#countdown-session");
sessionTimer.innerHTML = "00:00";

let controlBtnStart = document.querySelector("#start-button");
let controlBtnPause = document.querySelector("#pause-button");
let controlBtnResume = document.querySelector("#resume-button");
let controlBtnReset = document.querySelector("#reset-button");

let sessionCounter = document.querySelector("#completed-sessions");
let sessionLive = document.querySelector("#live-session");





// -- FUNCTIONS --

// -- COUNTDOWN Functions --

// Function to In / Decrease the SESSION time
increaseSessionTime = () => {
    ++ defaults.sessionTime;
    displayTime();
}
decreaseSessionTime = () => {
    -- defaults.sessionTime;
    if(defaults.sessionTime <= 1) { defaults.sessionTime = 1;}
    displayTime();
}

// Function that STARTS the countdown of the session
countdown = (seconds) => {

    if(defaults.sessionPaused == 0) {
        seconds = defaults.sessionTime;
        const now = Date.now();
        const then = now + seconds * 1000;

        pauseAllowed();
    
        interval = setInterval(() => { 
            secondsLeft = Math.round((then - Date.now()) / 1000);
         
            // Counts how many sessions were completed
            if(secondsLeft == 0) {
                defaults.counter ++;
                countSessions();
                breakCountdown();
            }

            if(secondsLeft < 0) {
                sessionLive.innerHTML = "";
                return;
            } else {
                sessionLive.innerHTML = "LIVE";
            }

        displayCountdown();
        // sessionTimer.innerHTML = secondsLeft;
        console.log(secondsLeft);
        }, 1000); 

        // Countdown with stored time after calling resume function
    } else if(defaults.sessionPaused == 1) {
        seconds = defaults.storedTime;
        const now = Date.now();
        const then = now + seconds * 1000;

        pauseAllowed();
    
        interval = setInterval(() => { 
            secondsLeft = Math.round((then - Date.now()) / 1000);

            // Counts how many sessions were completed
            if(secondsLeft == 0) {
                defaults.counter ++;
                countSessions();
                breakCountdown();
            }

            if(secondsLeft < 0) {
                sessionLive.innerHTML = "LIVE";
                return;
            } else {
                sessionLive.innerHTML = "";
            }
       
    // Displaying the REMAINING countdown on the app
    displayCountdown();
    console.log(secondsLeft);
    }, 1000);
    }
}

// Function to DISPLAY the countdown in minutes and seconds
 displayCountdown = () => {
     if(secondsLeft < 10) {
         sessionTimer.innerHTML = `00:0${secondsLeft}`
     } else { 
         sessionTimer.innerHTML = `00:${secondsLeft}`
     }
 }

 // Function to DISPLAY the session time in minutes and seconds
 displayTime = () => {
     if(defaults.sessionTime < 10) {
         sessionTimer.innerHTML = `00:0${defaults.sessionTime}`;
     } else {
         sessionTimer.innerHTML = `00:${defaults.sessionTime}`;
     }
 }

 // Function to DISPLAY the break countdown in minutes and seconds
 displayBreakCountdown = () => {
    if(secondsLeft < 10) {
        chooseBreakDuration.innerHTML = `00:0${secondsLeft}`
    } else {
     chooseBreakDuration.innerHTML = `00:${secondsLeft}`;
 }
}
 
 // Function to DISPLAY the break time in minutes and seconds
 displayBreak = () => {
     if(defaults.breakTime < 10) {
         chooseBreakDuration.innerHTML = `00:0${defaults.breakTime}`;
     } else {
         chooseBreakDuration.innerHTML = `00:${defaults.breakTime}`;
     }
 }

// Function to PAUSE the countdown session
pauseCountdown = () => {
    defaults.sessionPaused = 1;
    clearInterval(interval);
    storePause();
}

// Function to STORE the number of the paused countdown
storePause = () => {
    str1 = sessionTimer.innerHTML;
    str1 = str1.replace(/:/g, "");
    defaults.storedTime = parseFloat(str1);
}

// Function to RESUME the paused countdown 
resumeCountdown = () => {
    // storePause();
    countdown(defaults.storedTime);
}

// Function to RESET the countdown to its default stored time
resetCountdown = () => {
    defaults.sessionPaused = 0;
    defaults.counter = 0;
    sessionCounter.innerHTML = `Sessions completed: ${defaults.counter}`;
    displayTime();
}

// -- BREAK Functions --

// Function to In / Decrease the BREAK time
increaseBreakTime = () => {
    ++ defaults.breakTime;
    displayBreak();
}
decreaseBreakTime = () => {
    -- defaults.breakTime;
    if(defaults.breakTime <= 1) { defaults.breakTime = 1;}
    displayBreak();
}

breakCountdown = (seconds) => {
    defaults.sessionOnBreak = 1;
    noPauseAllowed();

    seconds = defaults.breakTime;
    const now = Date.now();
    const then = now + seconds * 1000;

    interval = setInterval(() => { 
        secondsLeft = Math.round((then - Date.now()) / 1000);

        if(secondsLeft == 0) {
            defaults.sessionPaused = 0;
            countdown();
        }

        if(secondsLeft < 0) {
            return;
    }

    // Displaying the countdown on the app
    displayBreakCountdown();
    console.log(secondsLeft);
    }, 1000);

}

// -- SESSION COUNTER -- 
countSessions = () => {
    sessionCounter.innerHTML = `Sessions Completed: ${defaults.counter}`;
}

// -- RESET SESSIONS --
resetSessions = () => {
    defaults.sessionPaused = 0;
    defaults.counter = 0;
    sessionCounter.innerHTML = `Sessions completed: ${defaults.counter}`;
}

// -- PRE CHOICES --
sessionPreChoice20 = () => {
    defaults.sessionTime = 20;
    highlightSession(session20);
    displayTime();
}

sessionPreChoice30 = () => {
    defaults.sessionTime = 30;
    highlightSession(session30);
    displayTime();
}

sessionPreChoice45 = () => {
    defaults.sessionTime = 45;
    highlightSession(session45);
    displayTime();
}

sessionBreak5 = () => {
    defaults.breakTime = 5;
    highlightBreak(break5);
    displayBreak();
}

sessionBreak10 = () => {
    defaults.breakTime = 10;
    highlightBreak(break10);
    displayBreak();
}

sessionBreak15 = () => {
    defaults.breakTime = 15;
    highlightBreak(break15);
    displayBreak();
}

// -- MENU FUNCTIONS --
goClicked = () => {
    controlBtnStart.disabled = true;
    controlBtnPause.disabled = false;
    controlBtnResume.disabled = true;
    controlBtnReset.disabled = true;
    
    darkenChoices();
    noClicksAllowed();
    countdown(defaults.sessionTime);
}

pauseClicked = () => {
    controlBtnStart.disabled = true;
    controlBtnPause.disabled = true;
    controlBtnResume.disabled = false; 
    controlBtnReset.disabled = false;
    noClicksAllowed();
    pauseCountdown();   
}

resumeClicked = () => {
    controlBtnStart.disabled = true;
    controlBtnPause.disabled = false;
    controlBtnResume.disabled = true;
    controlBtnReset.disabled = true;
    noClicksAllowed();
    resumeCountdown(defaults.storedTime);
}

resetClicked = () => {
    controlBtnStart.disabled = false;
    controlBtnPause.disabled = true;
    controlBtnResume.disabled = true;
    controlBtnReset.disabled = true;
    allClicksAllowed();
    brightenChoices();
    resetCountdown();
}

highlightSession = (target) => {
    session20.style.backgroundColor = "#ddd";
    session20.style.border = "";
    session30.style.backgroundColor = "#ddd";
    session30.style.border = "";
    session45.style.backgroundColor = "#ddd";
    session45.style.border = "";
    target.style.border = "solid 3px #ffa500"; 
}

highlightBreak = (target) => {
    break5.style.backgroundColor = "#ddd";
    break5.style.border = "";
    break10.style.backgroundColor = "#ddd";
    break10.style.border = "";
    break15.style.backgroundColor = "#ddd";
    break15.style.border = "";
    target.style.border = "solid 3px #ffa500";
}

darkenChoices = () => {
    session20.style.backgroundColor = "#a9a9a9";
    session30.style.backgroundColor = "#a9a9a9";
    session45.style.backgroundColor = "#a9a9a9";
    break5.style.backgroundColor = "#a9a9a9";
    break10.style.backgroundColor = "#a9a9a9";
    break15.style.backgroundColor = "#a9a9a9";
    increaseSessionBtn.style.backgroundColor = "#a9a9a9";
    decreaseSessionBtn.style.backgroundColor = "#a9a9a9";
    increaseBreakBtn.style.backgroundColor = "#a9a9a9";
    decreaseBreakBtn.style.backgroundColor = "#a9a9a9";
}

brightenChoices = () => {
    session20.style.backgroundColor = "#ddd";
    session30.style.backgroundColor = "#ddd";
    session45.style.backgroundColor = "#ddd";
    break5.style.backgroundColor = "#ddd";
    break10.style.backgroundColor = "#ddd";
    break15.style.backgroundColor = "#ddd";
    increaseSessionBtn.style.backgroundColor = "#ddd";
    decreaseSessionBtn.style.backgroundColor = "#ddd";
    increaseBreakBtn.style.backgroundColor = "#ddd";
    decreaseBreakBtn.style.backgroundColor = "#ddd";
}

noClicksAllowed = () => {
    session20.style.pointerEvents = "none";
    session30.style.pointerEvents = "none";
    session45.style.pointerEvents = "none";
    break5.style.pointerEvents = "none";
    break10.style.pointerEvents = "none";
    break15.style.pointerEvents = "none";
    increaseSessionBtn.style.pointerEvents = "none";
    decreaseSessionBtn.style.pointerEvents = "none";
    increaseBreakBtn.style.pointerEvents = "none";
    decreaseBreakBtn.style.pointerEvents = "none";
}

allClicksAllowed = () => {
    session20.style.pointerEvents = "auto";
    session30.style.pointerEvents = "auto";
    session45.style.pointerEvents = "auto";
    break5.style.pointerEvents = "auto";
    break10.style.pointerEvents = "auto";
    break15.style.pointerEvents = "auto";
    increaseSessionBtn.style.pointerEvents = "auto";
    decreaseSessionBtn.style.pointerEvents = "auto";
    increaseBreakBtn.style.pointerEvents = "auto";
    decreaseBreakBtn.style.pointerEvents = "auto";
}

noPauseAllowed = () => {
    controlBtnPause.disabled = true;
}

pauseAllowed = () => {
    controlBtnPause.disabled = false;
}

// -- ON CLICKS --

session20.onclick = sessionPreChoice20;
session30.onclick = sessionPreChoice30;
session45.onclick = sessionPreChoice45;

break5.onclick = sessionBreak5;
break10.onclick = sessionBreak10;
break15.onclick = sessionBreak15;

// On-Click of In / Decrease Button, the In / Decrease Functions runs
increaseSessionBtn.onclick = increaseSessionTime;
decreaseSessionBtn.onclick = decreaseSessionTime;

// On-Click of In / Decrease Button, the In / Decrease Functions runs
increaseBreakBtn.onclick = increaseBreakTime;
decreaseBreakBtn.onclick = decreaseBreakTime;

// On-Click of START button, the countdown function runs
controlBtnStart.onclick = goClicked;

// On-Click of PAUSE button, the countdown gets paused
controlBtnPause.onclick = pauseClicked;    

// On-Click of RESUME button, the countdown continues
controlBtnResume.onclick = resumeClicked;

// On-Click of RESET button, the countdown resets 
controlBtnReset.onclick = resetClicked;
