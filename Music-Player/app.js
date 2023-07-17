const container = document.querySelector(".container");
const image = document.querySelector("#music-img");
const audio = document.querySelector("#audio");
const title = document.querySelector(".music-info .title");
const singer = document.querySelector(".music-info .singer");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const musicListUl = document.querySelector("ul");


const player = new MusicPlayer(musicList);

window.addEventListener("load", () => {
  let music = player.getMusic();
  displayMusic(music);
  displayMusicList(player.musicList);
  isPlayingNow();
});

function displayMusicList(musicList) {

  musicList.map((element, index) => {
    let liTag = `
    <li li-index='${index}' onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-item-center">
        <span>${element.title}</span>
        <span id="music-${index}" class="badge bg-primary rounded-pill"></span>
        <audio class="music-${index}" src="music/${element.file}"></audio>
    </li>
`;
    musicListUl.insertAdjacentHTML("beforeend", liTag);

    let liAudioDuration = musicListUl.querySelector(`#music-${index}`);
    let liAudioTag = musicListUl.querySelector(`.music-${index}`);

    liAudioTag.addEventListener("loadeddata", () => {
      liAudioDuration.innerText = calculateTime(liAudioTag.duration);
    });

  });
}

const selectedMusic = (li) => {
  player.index = li.getAttribute("li-index");
  displayMusic(player.getMusic());
  playMusic();
  isPlayingNow();
}

const isPlayingNow = () => {


  for (let element of musicListUl.querySelectorAll("li")) {
    if (element.classList.contains("playing"))
      element.classList.remove("playing");

    if (element.getAttribute("li-index") == player.index) {
      element.classList.add("playing");
    }
  }
}

function displayMusic(music) {
  title.innerText = music.getName();
  singer.innerText = music.singer;
  image.src = "img/" + music.img;
  audio.src = "music/" + music.file;
}

play.addEventListener("click", () => {
  const isMusicPlay = container.classList.contains("playing");

  isMusicPlay ? pauseMusic() : playMusic();
});

next.addEventListener("click", () => {
  nextMusic();
});

prev.addEventListener("click", () => {
  prevMusic();
});

function prevMusic() {
  player.previous();
  let music = player.getMusic();
  displayMusic(music);
  playMusic();
  isPlayingNow();

}

function nextMusic() {
  player.next();
  let music = player.getMusic();
  displayMusic(music);
  playMusic();
  isPlayingNow();

}

function pauseMusic() {
  audio.pause();
  play.querySelector("i").classList = "fa-solid fa-play";
  container.classList.remove("playing");
}

function playMusic() {
  audio.play();
  play.querySelector("i").classList = "fa-solid fa-pause";
  container.classList.add("playing");
}

audio.addEventListener("loadedmetadata", () => {
  duration.textContent = calculateTime(audio.duration);
  progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  progressBar.value = Math.floor(audio.currentTime);
  currentTime.textContent = calculateTime(progressBar.value);
});

const calculateTime = (totalSeconds) => {
  const min = Math.floor(totalSeconds / 60);
  const second = Math.floor(totalSeconds % 60);
  const updatedSecond = second < 10 ? `0${second}` : `${second}`;
  const res = `${min}:${updatedSecond}`;
  return res;
};

progressBar.addEventListener("input", () => {
  currentTime.textContent = calculateTime(progressBar.value);
  audio.currentTime = progressBar.value;
});

volumeBar.addEventListener("input", (e) => {
  const value = e.target.value;
  audio.volume = value / 100;

  if (value == 0) {
    muteState = "muted";
    volume.classList = "fa-solid fa-volume-xmark";
  } else {
    muteState = "unmuted";
    volume.classList = "fa-solid fa-volume-high";
  }
});

let muteState = "unmuted";
volume.addEventListener("click", () => {
  if (muteState === "unmuted") {
    audio.muted = true;
    muteState = "muted";
    volume.classList = "fa-solid fa-volume-xmark";
    volumeBar.value = 0;
    audio.volume = 0;

  } else {
    audio.muted = false;
    muteState = "unmuted";
    volume.classList = "fa-solid fa-volume-high";
    volumeBar.value = 100;
    audio.volume = 1;
  }
})

audio.addEventListener("ended",()=>{
  nextMusic();
});

