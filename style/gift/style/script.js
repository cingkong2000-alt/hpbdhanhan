// ==========================================
// Gift Surprise V2 - Gift Page Script (Clean)
// ==========================================
// Hiệu ứng hoa rơi, tin nhắn bay, và trái tim nổ khi click.

// === CONFIGURATION (CHỈNH SỬA TẠI ĐÂY) ===

// Icon nổ khi click
let explosionIcon = '💗';

// === STATE ===
let isGifting = true;
let giftInterval = null;
let isMessaging = true;
let messageInterval = null;
let messages = [];

// === LOAD MESSAGES ===
async function loadMessages() {
  try {
    const response = await fetch('./style/mess.txt');
    const text = await response.text();
    messages = text
      .split(/\n/)
      .map(m => m.trim())
      .filter(m => m !== '');
  } catch (error) {
    console.error('Error loading messages:', error);
    messages = ['Sinh nhật vui vẻ nha bé Hân ❤️'];
  }
}
loadMessages();

// === DOM ===
const mainContent = document.getElementById('mainContent');

// ===========================
// === START EXPERIENCE ===
// ===========================
function startExperience() {
  // Hiện nội dung chính
  if (mainContent.classList.contains('hidden')) {
    mainContent.classList.remove('hidden');
  }
  document.body.classList.remove('container');

  // Sau 5 giây, bắt đầu hiệu ứng rơi
  setTimeout(() => {
    createFallingImage();
    giftInterval = setInterval(createFallingImage, 1000);

    createFallingMessage();
    messageInterval = setInterval(createFallingMessage, 1500);
  }, 5000);
}

window.addEventListener('DOMContentLoaded', startExperience);

// ===========================
// === FALLING IMAGES ===
// ===========================
function createFallingImage() {
  if (!isGifting) return;

  const img = document.createElement('img');

  // Chọn ảnh ngẫu nhiên từ 1-14
  const imageIndex = Math.floor(Math.random() * 14) + 1;
  img.src = '../img/Anh (' + imageIndex + ').jpg';
  img.className = 'falling-image';

  const windowWidth = window.innerWidth;

  // Kích thước ảnh (nhỏ hơn trên mobile)
  const imgSize = windowWidth < 600
    ? Math.random() * 40 + 50
    : Math.random() * 60 + 60;

  const leftPos = Math.random() * (windowWidth - imgSize);
  const duration = Math.random() * 4 + 4;

  img.style.left = leftPos + 'px';
  img.style.width = imgSize + 'px';
  img.style.position = 'fixed';
  img.style.animationDuration = duration + 's';

  document.body.appendChild(img);

  // Xóa sau khi animation kết thúc
  setTimeout(() => img.remove(), duration * 1000);
}

// ===========================
// === FALLING MESSAGES ===
// ===========================
function createFallingMessage() {
  if (!isMessaging) return;

  const msg = document.createElement('div');
  msg.className = 'falling-message';
  msg.innerText = messages[Math.floor(Math.random() * messages.length)];

  // Bảng màu ngẫu nhiên
  const colorSchemes = [
    { text: '#ff69b4', border: '#ff1493' },
    { text: '#ff6b6b', border: '#40e0d0' },
    { text: '#afeeee', border: '#afeeee' },
    { text: '#ffd700', border: '#ffa500' },
    { text: '#98fb98', border: '#2e8b57' },
    { text: '#dda0dd', border: '#9370db' },
  ];

  const scheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
  const windowWidth = window.innerWidth;
  const padding = 20;

  const leftPos = Math.random() * (windowWidth - 180 - padding * 2) + padding;
  const duration = Math.random() * 5 + 5;

  // Font size nhỏ hơn trên mobile
  const fontSize = windowWidth < 600
    ? Math.random() * 4 + 14
    : Math.random() * 6 + 16;

  msg.style.left = leftPos + 'px';
  msg.style.fontSize = fontSize + 'px';
  msg.style.color = scheme.text;
  msg.style.borderColor = scheme.border;
  msg.style.animationDuration = duration + 's';

  document.body.appendChild(msg);

  setTimeout(() => msg.remove(), duration * 1000);
}

// ===========================
// === HEART EXPLOSION ===
// ===========================
document.addEventListener('click', (e) => {
  createHearts(e.clientX, e.clientY);
});

document.addEventListener('touchstart', (e) => {
  createHearts(e.touches[0].clientX, e.touches[0].clientY);
});

function createHearts(x, y) {
  const count = 15;
  const icons = Array.from(explosionIcon).filter(c => c.trim() !== '');

  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    heart.innerHTML = icons[Math.floor(Math.random() * icons.length)] || '💗';
    heart.className = 'heart';

    // Hướng bay ngẫu nhiên theo vòng tròn
    const angle = Math.random() * Math.PI * 2;
    const distance = 50 + Math.random() * 150;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    heart.style.setProperty('--x', dx);
    heart.style.setProperty('--y', dy);
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
    heart.style.setProperty('--r', (Math.random() * 360 - 180) + 'deg');

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1000);
  }
}

// ===========================
// === POP SOUND ===
// ===========================
const popSound = document.getElementById('pop-sound');

window.addEventListener('click', () => {
  if (popSound) {
    const clone = popSound.cloneNode(true);
    clone.play();
  }
}, true);