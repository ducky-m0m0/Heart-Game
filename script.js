let score = 0;
let level = 1;
let heartSpeed = 1000; // Milliseconds
const basket = document.getElementById("basket");
const heart = document.getElementById("heart");
const scoreDisplay = document.getElementById("score");
const levelDisplay = document.getElementById("level");

document.addEventListener("mousemove", (event) => {
    basket.style.left = `${event.clientX - 30}px`;
});

function dropHeart() {
    let heartPosition = Math.random() * (300 - 30); // Random horizontal position
    heart.style.left = `${heartPosition}px`;
    heart.style.top = "0px";
    heart.style.visibility = "visible";

    let dropInterval = setInterval(() => {
        let currentTop = parseInt(heart.style.top);
        if (currentTop < 500) {
            heart.style.top = `${currentTop + 5}px`;
        } else {
            clearInterval(dropInterval);
            heart.style.visibility = "hidden";
            resetHeart();
        }

        if (isCaught()) {
            clearInterval(dropInterval);
            score++;
            scoreDisplay.innerText = `Score: ${score}`;
            resetHeart();
            if (score % 5 === 0) {
                levelUp();
            }
        }
    }, heartSpeed / level);
}

function resetHeart() {
    heart.style.visibility = "hidden"; // Hide the heart
    setTimeout(dropHeart, 500); // Wait before dropping the next heart
}

function isCaught() {
    const basketRect = basket.getBoundingClientRect();
    const heartRect = heart.getBoundingClientRect();

    return (
        heartRect.bottom >= basketRect.top &&
        heartRect.right >= basketRect.left &&
        heartRect.left <= basketRect.right
    );
}

function levelUp() {
    level++;
    levelDisplay.innerText = `Level: ${level}`;
    heartSpeed *= 0.9; // Increase speed every level
}

dropHeart(); // Start the first heart drop
