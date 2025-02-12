// console.log("JavaScript file is loaded!");

const envelope = document.getElementById("openEnvelope");
const introScreen = document.getElementById("intro-screen");
const mainContent = document.getElementById("main-content");
const noButton = document.getElementById("noBtn");
const noScreen = document.getElementById("noScreen");
const growingImage = document.getElementById("growingDanielLarson");
const audio = document.getElementById("backgroundMusic");
const sadAudio = document.getElementById("sadMusic");
const noJBtn = document.getElementById("noJBtn");
const yesBtn = document.getElementById("yesBtn");
const yesJBtn = document.getElementById("yesJBtn");

function showPinkScreen() {
    document.body.innerHTML = "";
    document.body.style.backgroundColor = "ffe4e1";


    const pinkScreenContainer = document.createElement("div");
    pinkScreenContainer.classList.add("pink-screen-container");

    const image = document.createElement("img");
    image.src = "cuteCatFlowers-removebg-preview.png";
    image.alt = "Heart Image";
    image.classList.add("pink-screen-image");

    const text1 = document.createElement("h1");
    text1.innerText = "okay";
    text1.classList.add("pink-screen-text", "fade-text");

    const text2 = document.createElement("h1");
    text2.innerText = "yay";
    text2.classList.add("pink-screen-text", "fade-text");

    const text3 = document.createElement("h1");
    text3.innerText = "See you on our date!!";
    text3.classList.add("pink-screen-text", "fade-text");

    pinkScreenContainer.appendChild(image);
    pinkScreenContainer.appendChild(text1);
    document.body.appendChild(pinkScreenContainer);

    setTimeout(() => {
        text1.classList.add("fade-out");
        setTimeout(() => {
            text1.remove();
            pinkScreenContainer.appendChild(text2);
            setTimeout(() => {
                text2.classList.add("fade-out");
                setTimeout(() => {
                    text2.remove();
                    pinkScreenContainer.appendChild(text3);
                    setTimeout(() => {
                        text3.classList.add("fade-out");
                        setTimeout(() => {
                            window.location.href = "index.html"; // Redirect to main page
                        }, 2000); // Wait after last fade-out before redirect
                    }, 2000);
                }, 2000);
            }, 2000);
        }, 2000);
    }, 2000);

    document.body.appendChild(pinkScreenContainer);
}

yesBtn.addEventListener("click", showPinkScreen);
yesJBtn.addEventListener("click", showPinkScreen);

// Function to transition from white intro screen to pink main screen
envelope.addEventListener("click", function() {
    document.body.style.backgroundColor = "#ffe4e1"; // Change entire page to pink
    introScreen.style.opacity = "0"; // Fade out effect
    setTimeout(() => {
        introScreen.style.display = "none"; // Hide the white screen
        mainContent.classList.add("show-content"); // Show the main content

        if (audio) {
            audio.play().catch(error => console.log("Autoplay blocked: ", error));
        }
    }, 1000); // Matches CSS transition time
});

noButton.addEventListener("click", function(){

    audio.pause();
    audio.currentTime = 0;
    sadAudio.currentTime = 174;
    sadAudio.play();
    mainContent.style.display = "none";

    noScreen.classList.add("show-no-screen");

    mainContent.style.visibility = "hidden";
    noScreen.style.visibility = "visible"

    setTimeout(() => {
        console.log("Image is getting scaled bigger");
        growingImage.classList.add("grow-image");
    }, 500);
});

noJBtn.addEventListener("mouseenter", function () {
    // Get random position within the window
    const maxX = window.innerWidth - noJBtn.clientWidth - 50;
    const maxY = window.innerHeight - noJBtn.clientHeight - 50;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    // Apply the new position
    noJBtn.style.position = "absolute"; // Ensure it moves freely
    noJBtn.style.left = `${randomX}px`;
    noJBtn.style.top = `${randomY}px`;
});

document.getElementById("galleryBtn").addEventListener("click", function() {
    const audio = document.getElementById("backgroundMusic");

    // Save current time in sessionStorage
    sessionStorage.setItem("audioTime", audio.currentTime);
    sessionStorage.setItem("isPlaying", !audio.paused); // Check if it was playing
    sessionStorage.setItem("skipEnvelope", "true");

    window.location.href = "gallery.html"; // Change to your actual gallery page
});

document.addEventListener("DOMContentLoaded", function() {
    const reasonsTitle = document.querySelector(".reasons-title");
    const popup = document.getElementById("popupModal");
    const closeBtn = document.querySelector(".close-btn");

    // Background music and session storage
    const audio = document.getElementById("backgroundMusic");
    const savedTime = sessionStorage.getItem("audioTime");
    const wasPlaying = sessionStorage.getItem("isPlaying") === "true"; // Convert to boolean
    const skipEnvelope = sessionStorage.getItem("skipEnvelope") === "true"; // Convert to boolean

    const record = document.getElementById("record");

    // Function to start spinning when song plays
    audio.addEventListener("play", function() {
        record.classList.add("spinning");
    });

    // Function to stop spinning when song ends or pauses
    audio.addEventListener("pause", function() {
        record.classList.remove("spinning");
    });

    audio.addEventListener("ended", function() {
        record.classList.remove("spinning"); // Stop spinning when song ends
    });

    // Restart song & spinning when clicking the record
    record.addEventListener("click", function() {
        audio.currentTime = 0; // Restart song from beginning
        audio.play(); // Play the song
    });

    // ✅ Skip the envelope screen if returning from the gallery
    if (skipEnvelope) {
        document.getElementById("intro-screen").style.display = "none"; // Hide envelope screen
        document.getElementById("main-content").classList.add("show-content"); // Show main page
        document.body.style.backgroundColor = "#ffe4e1"; // Ensure background stays pink
    }

    // ✅ Resume music if returning from gallery
    if (savedTime !== null) {
        audio.currentTime = parseFloat(savedTime); // Restore audio time
    }
    if (wasPlaying) {
        audio.play(); // Resume playback if it was playing before
    }

    // ✅ Remove `skipEnvelope` state so it applies only once
    sessionStorage.removeItem("skipEnvelope");

    if (reasonsTitle && popup && closeBtn) {
        // Show popup when title is clicked
        reasonsTitle.addEventListener("click", function() {
            popup.style.display = "flex";
        });

        // Close popup when the close button is clicked
        closeBtn.addEventListener("click", function() {
            popup.style.display = "none";
        });

        // Close popup when clicking outside of it
        popup.addEventListener("click", function(event) {
            if (event.target === popup) {
                popup.style.display = "none";
            }
        });
    }
});

window.addEventListener("load", function() {
    const record = document.getElementById("record");
    record.style.opacity = "1"; // Show the record with a smooth fade-in
});
