/* =========================
   MATRIX RAIN BACKGROUND
========================= */

// Select canvas
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

// Make canvas full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Characters used in the rain
const letters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Size of each character
const fontSize = 18;

// Number of columns
const columns = Math.floor(canvas.width / fontSize);

// Track falling positions
let drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * canvas.height / fontSize;
}

function matrixRain(){

    // Creates fading trail effect
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "lime";
    ctx.font = fontSize + "px monospace";

    for(let i=0;i<drops.length;i++){

        const text = letters.charAt(
            Math.floor(Math.random()*letters.length)
        );

        ctx.fillText(text,i*fontSize,drops[i]*fontSize);

        drops[i]++;

        if(drops[i]*fontSize > canvas.height && Math.random() > 0.97){
            drops[i] = 0;
        }
    }

    requestAnimationFrame(matrixRain);
}

matrixRain();

window.addEventListener("resize",()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


/* =========================
   MAGIC MESSAGE CARD LOGIC
========================= */

// DOM Selection
const messageInput = document.getElementById("messageInput");
const messageCard = document.getElementById("messageCard");
const showMessageBtn = document.getElementById("showMessageBtn");
const changeColorBtn = document.getElementById("changeColorBtn");
const addNoteBtn = document.getElementById("addNoteBtn");
const removeNoteBtn = document.getElementById("removeNoteBtn");
const resetBtn = document.getElementById("resetBtn");

let note = null;

// Show Message
showMessageBtn.addEventListener("click", () => {
    const message = messageInput.value.trim();
    if (message) {
        messageCard.textContent = message;
        messageCard.classList.remove("hidden");
    }
});

// Change Card Color
changeColorBtn.addEventListener("click", () => {
    const bgColor = `hsl(${Math.random() * 360}, 70%, 80%)`;
    const textColor = `hsl(${Math.random() * 360}, 30%, 30%)`;
    messageCard.style.backgroundColor = bgColor;
    messageCard.style.color = textColor;
});

// Add Note
addNoteBtn.addEventListener("click", () => {
    if (!note) {
        note = document.createElement("p");
        note.textContent = "✨ Here's a magical note!";
        messageCard.appendChild(note);
    }
});

// Remove Note
removeNoteBtn.addEventListener("click", () => {
    if (note) {
        note.remove();
        note = null;
    }
});

// Reset
resetBtn.addEventListener("click", () => {
    messageInput.value = "";
    messageCard.textContent = "";
    messageCard.style.backgroundColor = "#ffffffcc";
    messageCard.style.color = "#333";
    messageCard.classList.add("hidden");

    if(note){
        note.remove();
        note = null;
    }
});
