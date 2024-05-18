// Selecting DOM elements
const progressBar = document.getElementById("progressBar");
const buttonPlay = document.querySelector('#play');
const buttonPause = document.querySelector('#pause');
const tempoAtual = document.getElementById("tempoAtual");
const tempoTotal = document.getElementById("tempoTotal");
const musicaTitulo = document.getElementById("musicaTitulo");
const musicaArtista = document.getElementById("musicaArtista");
const albumArt = document.getElementById("albumArt");

// Audio object
let music = new Audio('./assets/The-Smallest-Man-Who-Ever-Lived.mp3');
let interval;

const musicasDisponiveis = [
  {
    titulo: 'The Smallest Man Who Ever Lived',
    caminhoMusica: './assets/The-Smallest-Man-Who-Ever-Lived.mp3',
    caminhoCapa: 'C:/Users/Positivo/Documents/player/assets/smallest-man.png'
  },
  {
    titulo: 'loml',
    caminhoMusica: 'C:/Users/Positivo/Documents/player/assets/Taylor Swift - loml.mp3',
    caminhoCapa: 'C:/Users/Positivo/Documents/player/assets/loml.png'
  },
  {
    titulo: 'So Long, London',
    caminhoMusica: 'C:/Users/Positivo/Documents/player/assets/Taylor Swift - So Long, London.mp3',
    caminhoCapa: 'C:/Users/Positivo/Documents/player/assets/so-long-london.png'
  }
];

let musicaAtualIndex = 0;

// Functions

/**
 * Formats time in seconds to mm:ss format.
 * @param {number} seconds - The time in seconds.
 * @returns {string} - The formatted time string.
 */
function formatarTempo(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

/**
 * Updates the progress bar and current time display.
 */
function updateMusicTime() {
  const progresso = (music.currentTime / music.duration) * 100;
  progressBar.value = progresso;
  tempoAtual.textContent = formatarTempo(music.currentTime);
}

/**
 * Plays the music and updates UI accordingly.
 */
function play() {
  buttonPlay.classList.add('hide');
  buttonPause.classList.remove('hide');
  music.play();
  interval = setInterval(updateMusicTime, 1000);
}

/**
 * Pauses the music and updates UI accordingly.
 */
function pause() {
  buttonPlay.classList.remove('hide');
  buttonPause.classList.add('hide');
  music.pause();
  clearInterval(interval);
}

/**
 * Seeks the music to the selected position on the progress bar.
 */
function seek(event) {
  const percent = event.target.value / 100;
  music.currentTime = percent * music.duration;
}

/**
 * Plays a new music track.
 * @param {string} caminhoDaMusica - The path to the music file.
 * @param {string} tituloDaMusica - The title of the music track.
 * @param {string} caminhoDaCapa - The path to the album art.
 */
function tocarNovaMusica(caminhoDaMusica, tituloDaMusica, caminhoDaCapa) {
  pause(); // Pauses the current music if it's playing
  music.src = caminhoDaMusica; // Sets the new music path
  albumArt.src = caminhoDaCapa; // Updates the album art
  musicaTitulo.textContent = tituloDaMusica; // Updates the music title
  music.load(); // Loads the new music
  play(); // Plays the new music
}

/**
 * Plays the current music in the playlist.
 */
function tocarNovaMusicaAtual() {
  const musicaAtual = musicasDisponiveis[musicaAtualIndex];
  tocarNovaMusica(musicaAtual.caminhoMusica, musicaAtual.titulo, musicaAtual.caminhoCapa);
}

/**
 * Advances to the next music track.
 */
function avancarMusica() {
  musicaAtualIndex = (musicaAtualIndex + 1) % musicasDisponiveis.length;
  tocarNovaMusicaAtual();
}

/**
 * Goes back to the previous music track.
 */
function retrocederMusica() {
  musicaAtualIndex = (musicaAtualIndex - 1 + musicasDisponiveis.length) % musicasDisponiveis.length;
  tocarNovaMusicaAtual();
}

// Event Listeners
music.addEventListener('loadedmetadata', function () {
  tempoTotal.textContent = formatarTempo(music.duration);
});

buttonPlay.addEventListener('click', play);
buttonPause.addEventListener('click', pause);
progressBar.addEventListener('input', seek);

// Cleanup interval when music ends
music.addEventListener('ended', function () {
  avancarMusica();
});

document.querySelector('#avançar').addEventListener('click', avancarMusica);
document.querySelector('#retroceder').addEventListener('click', retrocederMusica);

// Song switching buttons
document.getElementById('smallestMan').addEventListener('click', function () {
  musicaAtualIndex = 0;
  tocarNovaMusicaAtual();
});

document.getElementById('loml').addEventListener('click', function () {
  musicaAtualIndex = 1;
  tocarNovaMusicaAtual();
});

document.getElementById('soLongLondon').addEventListener('click', function () {
  musicaAtualIndex = 2;
  tocarNovaMusicaAtual();
});
