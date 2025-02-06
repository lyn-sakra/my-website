document.addEventListener("DOMContentLoaded", function () {
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popupMessage");
    const bgMusic = document.getElementById("bgMusic"); // Background music (looping)
    const newSong = document.getElementById("newSong"); // "Yellow" song
    
    function createFloatingHeart() {
        const heart = document.createElement("span");
        heart.classList.add("heart");
        heart.textContent = ["❤️", "💖", "💕", "💘", "💞"][Math.floor(Math.random() * 5)];
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = (7 + Math.random() * 3) + "s";

        document.querySelectorAll(".section").forEach(section => {
            const clone = heart.cloneNode(true);
            section.appendChild(clone);

            setTimeout(() => {
                clone.remove();
            }, 10000);
        });
    }

    setInterval(createFloatingHeart, 500);

    let noClicked = false;

    noBtn.addEventListener("click", function () {
        noClicked = true;

        for (let i = 0; i < 5; i++) {
            let newYesBtn = document.createElement("button");
            newYesBtn.textContent = "Yes 💖";
            newYesBtn.classList.add("floating-button");

            let rect = noBtn.getBoundingClientRect();
            newYesBtn.style.position = "absolute";
            newYesBtn.style.top = rect.top + window.scrollY + Math.random() * 10 - 5 + "px";
            newYesBtn.style.left = rect.left + window.scrollX + Math.random() * 40 - 20 + "px";

            newYesBtn.addEventListener("click", function () {
                document.querySelectorAll(".floating-button").forEach(btn => btn.remove());
                yesBtn.click();
            });

            document.body.appendChild(newYesBtn);
        }

        setTimeout(() => {
            noBtn.style.display = "none";
        }, 3000);
    });

    yesBtn.addEventListener("click", function () {
        popupMessage.innerHTML = noClicked
            ? "😡 How dare you click NO! 😝<br><br>Thank you for making me the luckiest guy!"
            : "Thank you for making me the luckiest guy!";

        popup.style.display = "flex";
        bgMusic.pause(); // Stop background music
        newSong.currentTime = 0; // Ensure song starts from the beginning
        newSong.play(); // Play "Yellow"

        triggerFireworks(); // Fireworks on Yes click
    });

    window.closePopup = function () {
        popup.style.display = "none";
        newSong.pause(); // Stop "Yellow" when popup is closed
        newSong.currentTime = 0; // Reset the song to the beginning
        bgMusic.play();
    };

    function triggerFireworks() {
        for (let i = 0; i < 10; i++) {
            let firework = document.createElement("div");
            firework.classList.add("firework");

            firework.style.left = Math.random() * 100 + "vw";
            firework.style.top = Math.random() * 80 + "vh";

            document.body.appendChild(firework);

            setTimeout(() => {
                firework.remove();
            }, 2000);
        }
    }

    window.startMusic = function() {
        const bgMusic = document.getElementById("bgMusic");
        const musicPrompt = document.getElementById("musicPrompt");
    
        bgMusic.play().catch(error => console.log("Autoplay blocked:", error)); // Try playing, catch errors
        musicPrompt.style.display = "none"; // Hide the prompt
    };

    window.denyMusic = function() {
        const musicPrompt = document.getElementById("musicPrompt");
        const bgMusic = document.getElementById("bgMusic");
        // Fun alert message when denying permission
        alert("❌ ACCESS DENIED ❌\nGeneral is not in good mood...\n We will proceed Later !!");
    
        //bgMusic.play().catch(error => console.log("Autoplay blocked:", error)); // Try playing, catch errors
        // Make the popup shake before disappearing
        musicPrompt.classList.add("shake");
        setTimeout(() => {
            musicPrompt.style.display = "none";
        }, 1000);

        setTimeout(() => {
            //alert("📢 The General has reconsidered... Try again!");
            musicPrompt.style.display = "flex";
            musicPrompt.classList.remove("shake");
        }, 1500);
    };
});
