(() => {
    // Audio list
    const audioList = [
        "static/audio/1.mp3",
        "static/audio/2.mp3",
        "static/audio/3.mp3",
        "static/audio/4.mp3",
        "static/audio/5.mp3",
        "static/audio/6.mp3",
        "static/audio/7.mp3",
        "static/audio/8.mp3",
        "static/audio/9.mp3",
        "static/audio/10.mp3",
        "static/audio/11.mp3"
    ];

    // Counter
    const localCounter = document.querySelector('#local-counter');
    const counterButton = document.querySelector('#counter-button');
    let localCount = Number(localStorage.getItem('count-v2')) || 0;

    function updateCounter() {
        localCounter.textContent = `+ ${localCount} 功德`;
    }

    // Play random audio
    function playVoice() {
        const idx = Math.floor(Math.random() * audioList.length);
        const audio = new Audio(audioList[idx]);
        audio.play();
    }
    // Animation 
    function animateZhouKeKe() {
        const elem = document.createElement("img");
        elem.src = "static/img/basicgif.gif";
        elem.style.position = "absolute";
        elem.style.width = "300px";
        elem.style.height = "auto";
        elem.style.right = "-500px";
        elem.style.top = counterButton.getClientRects()[0].bottom + window.scrollY - 200 + "px";
        elem.style.zIndex = "-5";
        document.body.appendChild(elem);

        let pos = -500;
        const limit = window.innerWidth + 500;
        const RunSpeed = 10;
        const id = setInterval(() => {
            if (pos >= limit) {
                clearInterval(id);
                elem.remove();
            } else {
                pos += RunSpeed;
                elem.style.right = pos + 'px';
            }
        }, 12);
    }

    // Ripple effect
    function triggerRipple(e) {
        let ripple = document.createElement("span");
        ripple.classList.add("ripple");
        counterButton.appendChild(ripple);
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        setTimeout(() => {
            ripple.remove();
        }, 300);
    }

    // Button event
    counterButton.addEventListener('click', (e) => {
        localCount++;
        localStorage.setItem('count-v2', localCount);
        updateCounter();
        triggerRipple(e);
        playVoice();
        animateZhouKeKe();
    });

    // Initial display
    updateCounter();

    // Remove loading if exists
    const loadingDiv = document.getElementById('loading');
    if (loadingDiv) loadingDiv.remove();
})();