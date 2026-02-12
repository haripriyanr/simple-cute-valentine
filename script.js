document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const nameElement = document.getElementById('valentineName');

    if (name) nameElement.textContent = name.replace(/[<>]/g, '');

    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    const sources = [
        "music.mp3",
        "https://res.cloudinary.com/dncywqfpb/video/upload/v1738399057/music_qrhjvy.mp3"
    ];
    let currentSrcIdx = 0;

    bgMusic.volume = 0.5;

    function loadAudio() {
        if (currentSrcIdx >= sources.length) return console.error("All music sources failed.");
        bgMusic.src = sources[currentSrcIdx];
        bgMusic.load();
    }

    bgMusic.addEventListener('error', (e) => {
        console.warn(`Failed: ${sources[currentSrcIdx]}`, e);
        currentSrcIdx++;
        if (currentSrcIdx < sources.length) {
            console.log(`Falling back to: ${sources[currentSrcIdx]}`);
            loadAudio();
        }
    });

    function updateBtn() {
        if (bgMusic.paused || bgMusic.muted) {
            musicBtn.textContent = '🔇';
            musicBtn.classList.remove('playing');
        } else {
            musicBtn.textContent = '🎵';
            musicBtn.classList.add('playing');
        }
    }

    musicBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.muted = false;
            bgMusic.play();
        } else {
            bgMusic.muted = !bgMusic.muted;
        }
        updateBtn();
    });

    bgMusic.play().then(updateBtn).catch(() => {
        console.log("Autoplay blocked. Waiting for interaction.");
        const playOnInteract = () => {
            bgMusic.play(); bgMusic.muted = false; updateBtn();
            document.removeEventListener('click', playOnInteract);
        };
        document.addEventListener('click', playOnInteract);
    });

    loadAudio();

    const container = document.getElementById('backgroundAnimation');
    const emojis = ['❤️', '💖', '💝', '💗', '💓', '💕', '🌹', '💌'];

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];

        heart.style.left = Math.random() * 100 + 'vw';
        const size = Math.random() * 20 + 10;
        heart.style.fontSize = size + 'px';
        const duration = Math.random() * 5 + 5;
        heart.style.animationDuration = duration + 's';

        container.appendChild(heart);
        setTimeout(() => heart.remove(), duration * 1000);
    }

    setInterval(createHeart, 100);
    for (let i = 0; i < 50; i++) setTimeout(createHeart, Math.random() * 2000);
});
