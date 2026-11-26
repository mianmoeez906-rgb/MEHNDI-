const eventData = {
    coupleTitle: "Waleed & Momina",
    eventType: "The Mehndi Celebration",
    groomName: "Mehar Waleed",
    brideName: "Momina",
    eventTime: "7:00 PM Onwards",
    eventDate: "20th August 2026",
    eventVenue: "Pearl Palace Shahdara, Lahore",
    groomImg: "Groom.jpeg",      // Yahan groom ki photo ka naam likhen
    brideImg: "Bride.jpeg",       // Yahan bride ki photo ka naam likhen
    mehndiSong: "Mehndisong.mp3"  // Yahan sirf Mehndi event ke song ka naam likhen
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

    // Mehndi Song Source Setup
    const musicBtn = document.getElementById("musicBtn");
    const openBtn = document.getElementById("openBtn");
    const welcomeScreen = document.getElementById("welcome-screen");
    const mainContainer = document.getElementById("mainContainer");
    const bgMusic = document.getElementById("bg-music");
    const musicToggle = document.getElementById("music-toggle");
    let isPlaying = false;

    if (bgMusic && eventData.mehndiSong) {
        bgMusic.src = eventData.mehndiSong;
        bgMusic.load();
    }

    function unlockInvitation() {
        openBtn.removeAttribute("disabled");
        openBtn.classList.remove("disabled-btn");
    }

    musicBtn.addEventListener("click", () => {
        bgMusic.play().then(() => {
            isPlaying = true;
            musicBtn.innerHTML = '<i class="fa-solid fa-check"></i> <span>MEHNDI MUSIC PLAYING</span>';
            musicBtn.classList.add("playing");
            unlockInvitation();
        }).catch(() => {
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
