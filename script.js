const eventData = {
    coupleTitle: "Waleed & Momina",
    eventType: "The Mehndi Celebration",
    groomName: "Mehar Waleed",
    brideName: "Momina",
    eventTime: "7:00 PM Onwards",
    eventDate: "20th August 2026", // <-- Date change karni ho to yahan likhen
    eventVenue: "Pearl Palace Shahdara, Lahore", // <-- Hall/Venue ka naam yahan likhen
    venueMapLink: "https://maps.google.com/?q=Pearl+Palace+Shahdara+Lahore", // <-- Google Maps ka live link yahan paste karen
    groomImg: "Groom.jpeg",
    brideImg: "Bride.jpeg",
    mehndiSong: "mehndisong.mp3" // <-- Repo mein jo MP3 file rakhi hai uska exact naam yahan likhen
};

function createSparkles() {
    const container = document.getElementById("sparkles");
    if (!container) return;
    for (let i = 0; i < 24; i++) {
        const dot = document.createElement("span");
        dot.classList.add("sparkle");
        const size = Math.random() * 6 + 4;
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.animationDelay = `${Math.random() * 4.4}s`;
        dot.style.animationDuration = `${Math.random() * 3 + 3.5}s`;
        container.appendChild(dot);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    createSparkles();

    // Dynamic Content Update
    document.querySelectorAll('.dynamic-title').forEach(el => el.innerText = eventData.coupleTitle);
    document.querySelectorAll('.dynamic-event-type').forEach(el => el.innerText = eventData.eventType);
    document.querySelectorAll('.dynamic-groom').forEach(el => el.innerText = eventData.groomName);
    document.querySelectorAll('.dynamic-bride').forEach(el => el.innerText = eventData.brideName);
    document.querySelectorAll('.dynamic-time').forEach(el => el.innerText = eventData.eventTime);
    document.querySelectorAll('.dynamic-date').forEach(el => el.innerText = eventData.eventDate);
    document.querySelectorAll('.dynamic-venue').forEach(el => el.innerText = eventData.eventVenue);
    document.querySelector('.dynamic-groom-img').src = eventData.groomImg;
    document.querySelector('.dynamic-bride-img').src = eventData.brideImg;

    const venueMapBtn = document.getElementById("venueMapBtn");
    if (venueMapBtn && eventData.venueMapLink) {
        venueMapBtn.href = eventData.venueMapLink;
    }

    // Mehndi Song Setup
    const musicBtn = document.getElementById("musicBtn");
    const openBtn = document.getElementById("openBtn");
    const welcomeScreen = document.getElementById("welcome-screen");
    const mainContainer = document.getElementById("mainContainer");
    const bgMusic = document.getElementById("bg-music");
    const musicToggle = document.getElementById("music-toggle");
    let isPlaying = false;

    function syncMusicSource() {
        if (!bgMusic || !eventData.mehndiSong) return;
        const encodedFile = encodeURI(eventData.mehndiSong);
        if (!bgMusic.src || !bgMusic.src.endsWith(encodedFile)) {
            bgMusic.src = encodedFile;
            bgMusic.load();
        }
    }

    syncMusicSource();

    function unlockInvitation() {
        openBtn.removeAttribute("disabled");
        openBtn.classList.remove("disabled-btn");
    }

    musicBtn.addEventListener("click", () => {
        syncMusicSource();
        bgMusic.play().then(() => {
            isPlaying = true;
            musicBtn.innerHTML = '<i class="fa-solid fa-check"></i> <span>MEHNDI MUSIC PLAYING</span>';
            musicBtn.classList.add("playing");
            unlockInvitation();
        }).catch((err) => {
            console.log("Audio play issue:", err);
            musicBtn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> <span>CHECK MP3 FILE NAME</span>';
            unlockInvitation();
        });
    });

    openBtn.addEventListener("click", () => {
        welcomeScreen.style.opacity = "0";
        setTimeout(() => {
            welcomeScreen.style.display = "none";
            mainContainer.style.display = "block";
            mainContainer.style.opacity = "1";
        }, 1100);
    });

    musicToggle.addEventListener("click", () => {
        syncMusicSource();
        if (isPlaying) {
            bgMusic.pause();
            isPlaying = false;
        } else {
            bgMusic.play().then(() => {
                isPlaying = true;
            }).catch(() => {});
        }
    });
});
