let site = document.getElementById("Site");
let mintButton = document.getElementById("Mint");
let enterButton = document.getElementById("Enter");
let connectButton = document.getElementById("Connect");
let volumeButton = document.getElementById("Volume");
let fuckYou = document.getElementById("Fuck-You");
let spelunk = document.getElementById("Spelunk");
let underground = document.getElementById("Underground");
let goblinSong = document.createElement("audio");
let controls = document.getElementById("Controls");
let psst = document.getElementById("Psst");
function delay(n) {
  return new Promise(function (resolve) {
    setTimeout(resolve, n * 500);
  });
}
function togglePlay() {
  volumeButton.classList.toggle("off");
  if (goblinSong.paused) {
    goblinSong.play();
  } else {
    goblinSong.pause();
  }
}
function awaken() {
  site.classList.add("awake");
  goblinSong.src = "./audio/GT-song.mp3";
  goblinSong.volume = 0.1;
  goblinSong.loop = true;
}
function allowEntry() {
  enterButton.classList.remove("disabled");
  enterButton.innerHTML = `Fucking <span>enter</span> already`;
  enterButton.onclick = function () {
    site.classList.add("loaded");
    goblinSong.play();
    setTimeout(function () {
      enterButton.remove();
    }, 2000);
  };
  volumeButton.onclick = function () {
    togglePlay();
  };
}
window.addEventListener("load", async () => {
  await delay(3);
  awaken();
  await delay(3);
  allowEntry();
  psst.onclick = function () {
    document.getElementById("Family").src =
      "./i/GT-elevin-ekselent-eediots.png";
  };
});


