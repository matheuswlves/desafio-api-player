
const progressBar = document.getElementById("progressBar");
const buttonPlay = document.querySelector('#play');
const buttonPause = document.querySelector('#pause');
const tempoAtual = document.getElementById("tempoAtual");
const tempoTotal = document.getElementById("tempoTotal");
const musicaTitulo = document.getElementById("musicaTitulo");
const musicaArtista = document.getElementById("musicaArtista");
const albumArt = document.getElementById("albumArt");


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


function formatarTempo(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}


function updateMusicTime() {
  const progresso = (music.currentTime / music.duration) * 100;
  progressBar.value = progresso;
  tempoAtual.textContent = formatarTempo(music.currentTime);
}


function play() {
  buttonPlay.classList.add('hide');
  buttonPause.classList.remove('hide');
  music.play();
  interval = setInterval(updateMusicTime, 1000);
}


function pause() {
  buttonPlay.classList.remove('hide');
  buttonPause.classList.add('hide');
  music.pause();
  clearInterval(interval);
}


function seek(event) {
  const percent = event.target.value / 100;
  music.currentTime = percent * music.duration;
}


function tocarNovaMusica(caminhoDaMusica, tituloDaMusica, caminhoDaCapa) {
  pause(); 
  music.src = caminhoDaMusica; 
  albumArt.src = caminhoDaCapa; 
  musicaTitulo.textContent = tituloDaMusica; 
  music.load(); 
  play();
}

function tocarNovaMusicaAtual() {
  const musicaAtual = musicasDisponiveis[musicaAtualIndex];
  tocarNovaMusica(musicaAtual.caminhoMusica, musicaAtual.titulo, musicaAtual.caminhoCapa);
}


function avancarMusica() {
  musicaAtualIndex = (musicaAtualIndex + 1) % musicasDisponiveis.length;
  tocarNovaMusicaAtual();
}

function retrocederMusica() {
  musicaAtualIndex = (musicaAtualIndex - 1 + musicasDisponiveis.length) % musicasDisponiveis.length;
  tocarNovaMusicaAtual();
}


music.addEventListener('loadedmetadata', function () {
  tempoTotal.textContent = formatarTempo(music.duration);
});

buttonPlay.addEventListener('click', play);
buttonPause.addEventListener('click', pause);
progressBar.addEventListener('input', seek);


music.addEventListener('ended', function () {
  avancarMusica();
});

document.querySelector('#avançar').addEventListener('click', avancarMusica);
document.querySelector('#retroceder').addEventListener('click', retrocederMusica);


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
