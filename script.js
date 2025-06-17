const channelName = document.querySelector('.channel-name');
const teaserContent = document.querySelector('.teaser-content');
const teaser = document.querySelector('.teaser');
const playBtn = document.getElementById('playBtn');
const audio = document.getElementById("bg-audio");
const video = document.getElementById("bg-video");
const captionBox = document.getElementById("captionBox");
const container = document.querySelector(".container");
const endScreen = document.getElementById("end-screen");
const restartBtn = document.getElementById("restartBtn");
const overlay = document.querySelector(".overlay");

const captions = [
	"Aditi’s smile... makes Akshit’s world brighter every single day. 😊✨",
	"Two hearts, one perfect rhythm — Akshit & Aditi's chemistry is pure fire. 🔥❤️",
	"When they’re together, it feels like time stands still. ✨",
	"Their story… not just a love story, it’s an inspiration. 💕",
	"Watching them… feels like living a dream you never want to end. 🌟",
	"In a world full of noise, their love whispers the loudest. ❤️",
	"Grace met charm... and magic happened – Aditi x Akshit 💫",
	"And when they’re together… love isn't just in the air — it’s in the eyes. 💞"
];

const introPopup = document.getElementById('intro-popup');
const introOkBtn = document.getElementById('intro-ok');
const introAudio = document.getElementById('intro-audio');

// Play audio on page load with user gesture fallback
window.addEventListener('DOMContentLoaded', () => {
	// Try to play audio immediately (may get blocked)
	introAudio.play().catch(() => {
		// Wait for user click if autoplay fails
		introOkBtn.addEventListener('click', () => {
			introAudio.play();
		}, { once: true });
	});
});

// OK button click: stop intro audio and show site
introOkBtn.addEventListener('click', () => {
	introPopup.style.display = 'none';
	introAudio.pause();
	introAudio.currentTime = 0;

	// ✅ Show actual site teaser screen
	document.querySelector('.teaser').style.display = 'flex';
	document.querySelector('.channel-name').style.display = 'block';
});




let captionIndex = 0;
let captionInterval;

function cycleCaptions() {
	captionBox.textContent = captions[captionIndex];
	captionIndex = (captionIndex + 1) % captions.length;
}

playBtn.addEventListener('click', () => {
	teaserContent.style.display = 'none';
	teaser.style.display = 'none';
	channelName.style.display = 'none';
	video.style.display = 'block';
	video.style.zIndex = "1";
	overlay.style.display = 'block';
	container.style.display = 'block';


	video.play();
	audio.play();

	captionBox.textContent = captions[0];
	captionIndex = 1;
	captionInterval = setInterval(cycleCaptions, 3000);

	setTimeout(() => {
		// 1. Stop everything
		clearInterval(captionInterval);         // Stop captions
		audio.pause();                          // Stop bg audio
		video.pause();                          // Pause video

		const slider = document.getElementById('slider');
		slider.style.animationPlayState = 'paused';  // Pause gallery scroll

		// 2. Add fade-out effect to elements
		container.classList.add('fade-out');
		video.classList.add('fade-out');
		overlay.classList.add('fade-out');

		// 3. After fade-out completes (2s), show end screen
		setTimeout(() => {
			container.style.display = 'none';
			video.style.display = 'none';
			overlay.style.display = 'none';
			endScreen.style.display = 'flex';

			// 4. Play soft background music on end screen
			const endMusic = new Audio('media/bg-music.mp3');
			endMusic.volume = 0.5;
			endMusic.play();
		}, 2000);

	}, 94500); // 1min 34sec

});



restartBtn.addEventListener('click', () => {
	video.pause();
	video.currentTime = 0;
	audio.pause();
	audio.currentTime = 0;

	container.style.display = 'none';
	endScreen.style.display = 'none';

	teaser.style.display = 'flex';
	teaserContent.style.display = 'block';
	channelName.style.display = 'block';

	video.style.display = 'none';
	overlay.style.display = 'none';

	captionIndex = 0;
	clearInterval(captionInterval);

	container.classList.remove('landscape-mode');

});

