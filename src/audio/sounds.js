const sounds = {
    jump: new Audio('path/to/jump-sound.mp3'),
    collectEgg: new Audio('path/to/collect-egg-sound.mp3'),
    gameOver: new Audio('path/to/game-over-sound.mp3'),
};

function playSound(sound) {
    if (sounds[sound]) {
        sounds[sound].currentTime = 0; // Reset sound to start
        sounds[sound].play();
    }
}

export { playSound };