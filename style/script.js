// ==========================================
// Gift Surprise - Main Script
// ==========================================
// Tất cả các giá trị có thể tùy chỉnh được đều nằm ở phần CONFIGURATION bên dưới.

// === CONFIGURATION (CHỈNH SỬA TẠI ĐÂY) ===

// Tiêu đề hiển thị trên tab trình duyệt
const PAGE_TITLE = 'To Hân Hân';
document.title = PAGE_TITLE;

// Mã PIN để mở khóa (4 chữ số)
const CORRECT_PIN = '0503';

// Danh sách ảnh gallery (14 ảnh)
const imageFiles = Array.from({ length: 14 }, (_, i) => `style/img/Anh (${i + 1}).jpg`);

// Danh sách bài hát
const songs = [
  { title: 'hãy đến đây bên anh trong một chiều mùa thu...', cover: 'style/sound/Anh (1).jpg', src: 'style/sound/hãy đến đây bên anh trong một chiều mùa thu.mp3' },
  { title: 'Ngọn gió đêm qua, trăng sáng đêm nay', cover: 'style/sound/Anh (2).jpg', src: 'style/sound/NGONGIODEMQUATRANGSANGDEMNAY.mp3' },
  { title: 'Nơi Này Có Anh', cover: 'style/sound/Anh (3).jpg', src: 'style/sound/Nơi Này Có Anh.mp3' },
  { title: 'ai ngoài anh', cover: 'style/sound/Anh (4).jpg', src: 'style/sound/Ai Ngoài Anh.mp3' },
  { title: 'Yêu đương khó quá thì chạy về khóc với anh,', cover: 'style/sound/Anh (5).jpg', src: 'style/sound/Yêu Đương Khó Quá Thì Chạy Về Khóc Với Anh (Acoustic Version).mp3' },
  { title: 'từng ngày yêu em... ❤', cover: 'style/sound/Anh (6).jpg', src: 'style/sound/Từng Ngày Yêu Em (Acoustic).mp3' },
];

// Emoji trái tim bay lên
const heartEmojis = ['❤', '💖', '💗', '💓', '💕', '🌸','🌺','🍁'];

// GIF trái tim bay lên (có thể thay URL khác)
const heartGifs = [
  'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZW5kMm5ua3BieGtoYjBvdDM4NzZ4dnlibjJobHJ1ODI0MGt0MHVnbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/DDYvdi4RY5wze/giphy.gif',
  'https://i.pinimg.com/originals/0f/f7/ac/0ff7acbadeffd1e41be9811d67e1697e.gif',
  'https://i.pinimg.com/originals/3f/4e/d3/3f4ed3cb1539cb42dc93b78020a3ef55.gif',
  'https://i.pinimg.com/originals/88/23/82/882382f97862c72e60fc06822e36eb55.gif',
  'https://i.pinimg.com/originals/b6/6b/1b/b66b1bfe70a9ad4f69dea3b620011222.gif',
];

// =====================
// === LOAD LETTER ===
// =====================
let letterText = [];

async function loadLetter() {
  try {
    const response = await fetch('style/letter.txt');
    const text = await response.text();
    letterText = text
      .split(/\n\s*\n/)
      .map(p => p.trim())
      .filter(p => p !== '');
  } catch (error) {
    console.error('Error loading letter:', error);
    letterText = [
            "Thư này gửi đến người mà anh đang âm thầm đăng ký quyền ưu tiên - bé Hân Hân!",
            "Hôm nay là một ngày đặc biệt, ngày mà mẹ em đưa đến thế gian này một nàng công chúa dễ thương,",
            "biết nói sao đây khi trong lòng có \"nhiều chút\" mong ngóng nàng công chúa này là của anh trong tương lai...",
            "Ahem, hơi lạc đề...",
            "Chúc em sinh nhật thật vui, thật rực rỡ.",
            "Tuổi mới luôn xinh đẹp, hạnh phúc và bình yên, thêm nhiều nụ cười - và thêm anh trong những kế hoạch sau này...!",
            "Nếu không may có những điều không như ý, một ngày em cảm thấy mệt, mong em nhớ rằng có một người đem tất cả sự dịu dàng gói lại trong món quà nhỏ bé này",
            "Bằng tất cả những gì anh có",
            "Sinh nhật vui vẻ nha!",
            "- Công Nguyễn -"
          ];
  }
}
loadLetter();

// ===========================
// === FLOATING HEARTS ===
// ===========================
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');

  // 50% chance: GIF image hoặc emoji text
  const useGif = Math.random() > 0.5;

  if (useGif) {
    const img = document.createElement('img');
    img.src = heartGifs[Math.floor(Math.random() * heartGifs.length)];
    const size = Math.random() * 30 + 30;
    img.style.width = size + 'px';
    img.style.height = 'auto';
    heart.appendChild(img);
  } else {
    heart.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    const fontSize = Math.random() * 20 + 10;
    heart.style.fontSize = fontSize + 'px';
  }

  const left = Math.random() * 100;
  const duration = Math.random() * 3 + 3;
  const opacity = Math.random() * 0.5 + 0.5;

  heart.style.left = left + '%';
  heart.style.animationDuration = duration + 's';
  heart.style.opacity = opacity;

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), duration * 1000);
}

// Tạo 10 trái tim ban đầu với delay ngẫu nhiên
for (let i = 0; i < 10; i++) {
  setTimeout(createHeart, Math.random() * 3000);
}
// Tiếp tục tạo trái tim mỗi 400ms
setInterval(createHeart, 400);

// ===========================
// === LETTER SECTION ===
// ===========================
const btnLetter = document.getElementById('btn-letter');
const letterOverlay = document.getElementById('letter-overlay');
const closeLetter = document.getElementById('close-letter');
const letterBody = document.getElementById('letter-body');

let typingInterval;
let paragraphIndex = 0;
let charIndex = 0;
let isTyping = false;

function typeWriter() {
  if (paragraphIndex < letterText.length) {
    isTyping = true;

    let currentP = letterBody.lastElementChild;

    // Tạo thẻ <p> mới cho mỗi đoạn văn
    if (!currentP || charIndex === 0) {
      currentP = document.createElement('p');
      // Đoạn cuối cùng có class đặc biệt (chữ ký)
      if (paragraphIndex === letterText.length - 1) {
        currentP.classList.add('letter-footer');
      }
      letterBody.appendChild(currentP);
    }

    // Thêm từng chữ một (typewriter effect)
    currentP.textContent += letterText[paragraphIndex][charIndex];
    charIndex++;
    letterBody.scrollTop = letterBody.scrollHeight;

    if (charIndex < letterText[paragraphIndex].length) {
      typingInterval = setTimeout(typeWriter, 30); // 30ms mỗi ký tự
    } else {
      // Hết đoạn, chuyển sang đoạn tiếp theo
      paragraphIndex++;
      charIndex = 0;
      typingInterval = setTimeout(typeWriter, 500); // Nghỉ 500ms giữa các đoạn
    }
  } else {
    isTyping = false;
  }
}

btnLetter.addEventListener('click', () => {
  letterOverlay.classList.add('active');
  if (!isTyping && paragraphIndex < letterText.length) {
    setTimeout(typeWriter, 500);
  }
});

closeLetter.addEventListener('click', () => {
  letterOverlay.classList.remove('active');
  clearTimeout(typingInterval);
  isTyping = false;
});

// ===========================
// === MUSIC PLAYER ===
// ===========================
const btnMusic = document.getElementById('btn-music');
const musicOverlay = document.getElementById('music-overlay');
const closeMusic = document.getElementById('close-music');
const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const albumArtImg = document.querySelector('#album-art img');
const songListContainer = document.getElementById('song-list');

let songIndex = 0;
let isPlaying = false;

function loadSong(song) {
  songTitle.innerText = song.title;
  songArtist.style.display = 'none';
  audioPlayer.src = song.src;
  albumArtImg.src = song.cover;
  updateSongListUI();
}

function updateSongListUI() {
  const items = document.querySelectorAll('.song-item');
  items.forEach((item, index) => {
    if (index === songIndex) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

function playSong() {
  isPlaying = true;
  playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  audioPlayer.play();
}

function pauseSong() {
  isPlaying = false;
  playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  audioPlayer.pause();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) songIndex = 0;
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.target;
  if (isNaN(duration)) return;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = progressPercent + '%';
  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return mins + ':' + (secs < 10 ? '0' : '') + secs;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audioPlayer.duration;
  audioPlayer.currentTime = (clickX / width) * duration;
}

// Render danh sách bài hát
songs.forEach((song, index) => {
  const item = document.createElement('div');
  item.classList.add('song-item');
  item.innerHTML = `<img src="${song.cover}" alt="${song.title}">
    <div class="song-item-info">
      <div class="song-item-title">${song.title}</div>
    </div>`;
  item.addEventListener('click', () => {
    songIndex = index;
    loadSong(songs[songIndex]);
    playSong();
  });
  songListContainer.appendChild(item);
});

// Event listeners cho Music Player
btnMusic.addEventListener('click', () => musicOverlay.classList.add('active'));
closeMusic.addEventListener('click', () => musicOverlay.classList.remove('active'));
playPauseBtn.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong();
});
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('ended', nextSong);
progressBar.addEventListener('click', setProgress);

// ===========================
// === IMAGE GALLERY ===
// ===========================
const btnImage = document.getElementById('btn-image');
const imageOverlay = document.getElementById('image-overlay');
const closeImage = document.getElementById('close-image');
const galleryTop = document.getElementById('gallery-top');
const galleryBottom = document.getElementById('gallery-bottom');
const lightboxOverlay = document.getElementById('lightbox-overlay');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.getElementById('close-lightbox');

function populateGallery() {
  galleryTop.innerHTML = '';
  galleryBottom.innerHTML = '';

  const topImages = imageFiles.slice(0, 9);
  const bottomImages = imageFiles.slice(9);

  const createImgElement = (filePath) => {
    const img = document.createElement('img');
    img.src = filePath;
    img.loading = 'lazy';
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(filePath);
    });
    return img;
  };

  // Nhân đôi ảnh để tạo hiệu ứng cuộn vô hạn
  [...topImages, ...topImages].forEach(file => galleryTop.appendChild(createImgElement(file)));
  [...bottomImages, ...bottomImages].forEach(file => galleryBottom.appendChild(createImgElement(file)));
}

function openLightbox(src) {
  lightboxImg.src = src;
  lightboxOverlay.classList.add('active');
}

closeLightbox.addEventListener('click', () => {
  lightboxOverlay.classList.remove('active');
});

lightboxOverlay.addEventListener('click', (e) => {
  if (e.target === lightboxOverlay) {
    lightboxOverlay.classList.remove('active');
  }
});

btnImage.addEventListener('click', () => {
  populateGallery();
  imageOverlay.classList.add('active');
});

closeImage.addEventListener('click', () => {
  imageOverlay.classList.remove('active');
});

// ===========================
// === GIFT SECTION ===
// ===========================
const btnGift = document.getElementById('btn-gift');
const giftOverlay = document.getElementById('gift-overlay');
const closeGift = document.getElementById('close-gift');
const fullscreenGiftBtn = document.getElementById('fullscreen-gift');
const giftModalElement = document.getElementById('gift-modal-element');
const giftIframe = document.querySelector('.gift-iframe');

btnGift.addEventListener('click', () => {
  // Reload iframe mỗi khi mở
  if (giftIframe) {
    giftIframe.src = giftIframe.src;
  }
  giftOverlay.classList.add('active');
});

closeGift.addEventListener('click', () => {
  giftOverlay.classList.remove('active');
});

fullscreenGiftBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    // Vào fullscreen
    if (giftModalElement.requestFullscreen) {
      giftModalElement.requestFullscreen();
    } else if (giftModalElement.webkitRequestFullscreen) {
      giftModalElement.webkitRequestFullscreen();
    } else if (giftModalElement.msRequestFullscreen) {
      giftModalElement.msRequestFullscreen();
    }
    fullscreenGiftBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
  } else {
    // Thoát fullscreen
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    fullscreenGiftBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
  }
});

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    fullscreenGiftBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
  }
});

// ===========================
// === POP SOUND ===
// ===========================
const popSound = document.getElementById('pop-sound');

window.addEventListener('click', () => {
  if (popSound) {
    const clone = popSound.cloneNode();
    clone.play();
  }
}, true);

// ===========================
// === INIT FIRST SONG ===
// ===========================
loadSong(songs[songIndex]);

// ===========================
// === LOCK SCREEN ===
// ===========================
const lockScreen = document.getElementById('lock-screen');
const mainContent = document.getElementById('main-content');
const passDots = document.querySelectorAll('.dot');
const numBtns = document.querySelectorAll('.num-btn');
const deleteBtn = document.querySelector('.delete-btn');

let enteredPin = '';

function updateDots() {
  passDots.forEach((dot, index) => {
    if (index < enteredPin.length) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function handleInput(value) {
  if (!lockScreen || lockScreen.classList.contains('unlocked')) return;
  if (enteredPin.length < 4) {
    enteredPin += value;
    updateDots();
    if (enteredPin.length === 4) {
      setTimeout(checkPin, 300);
    }
  }
}

function checkPin() {
  if (enteredPin === CORRECT_PIN) {
    unlock();
  } else {
    fail();
  }
}

function unlock() {
  lockScreen.classList.add('unlocked');
  mainContent.classList.remove('main-content-hidden');
  mainContent.classList.add('main-content-visible');
  enteredPin = '';
  updateDots();
}

function fail() {
  const dotsContainer = document.getElementById('pass-dots');
  dotsContainer.classList.add('shake');
  // Rung điện thoại nếu hỗ trợ
  if (navigator.vibrate) navigator.vibrate(200);
  setTimeout(() => {
    dotsContainer.classList.remove('shake');
    enteredPin = '';
    updateDots();
  }, 500);
}

function deleteLastDigit() {
  if (enteredPin.length > 0) {
    enteredPin = enteredPin.slice(0, -1);
    updateDots();
  }
}

// Event listeners cho bàn phím số
if (numBtns) {
  numBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      handleInput(btn.getAttribute('data-value'));
    });
  });
}

// Event listener cho nút xóa
if (deleteBtn) {
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    deleteLastDigit();
  });
}

// Hỗ trợ bàn phím vật lý
document.addEventListener('keydown', (e) => {
  if (!lockScreen || lockScreen.classList.contains('unlocked')) return;
  if (e.key >= '0' && e.key <= '9') {
    handleInput(e.key);
  } else if (e.key === 'Backspace') {
    deleteLastDigit();
  }
});

// Nút khóa lại (reload trang)
const resetLockBtn = document.getElementById('btn-reset-lock');
if (resetLockBtn) {
  resetLockBtn.addEventListener('click', () => {
    window.location.reload();
  });
}