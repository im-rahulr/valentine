document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const card = document.querySelector('.valentine-card');
    const question = document.getElementById('question');
    const message = document.getElementById('message');
    
    let scale = 1;
    let noBtnClicks = 0;

    // Add sparkles to the card
    function createSparkles() {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        card.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1500);
    }
    
    setInterval(createSparkles, 300);

    function moveNoButton(e) {
        // Get card boundaries
        const cardRect = card.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();

        // Calculate boundaries within the card
        const maxX = cardRect.width - btnRect.width - 20; // 20px padding
        const maxY = cardRect.height - btnRect.height - 20;

        // Generate new position within card boundaries
        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;

        // Apply new position with smooth transition
        noBtn.style.position = 'absolute';
        noBtn.style.transition = 'all 0.3s ease';
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;

        // Add rotation for fun
        const rotation = Math.random() * 360;
        noBtn.style.transform = `rotate(${rotation}deg)`;

        // Add playful message
        const messages = [
            "Can't catch me! 🏃‍♂️",
            "Too slow! 😋",
            "Nice try! 😏"
        ];
        
        const floatingMsg = document.createElement('div');
        floatingMsg.textContent = messages[Math.floor(Math.random() * messages.length)];
        floatingMsg.style.cssText = `
            position: absolute;
            left: ${newX}px;
            top: ${newY}px;
            color: var(--text-color);
            font-weight: bold;
            pointer-events: none;
            animation: fadeOut 1s forwards;
            z-index: 100;
        `;
        card.appendChild(floatingMsg);
        
        setTimeout(() => floatingMsg.remove(), 1000);
    }

    // Add event listeners
    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('click', moveNoButton);

    yesBtn.addEventListener('click', () => {
        // Hide buttons
        noBtn.style.display = 'none';
        yesBtn.style.display = 'none';
        
        // Update content
        question.textContent = "Yay! I knew you'd say yes! 🎉";
        message.textContent = "Happy Valentine's Day! ❤️";
        message.classList.remove('hidden');
        
        // Add celebration effects
        createHeartShower();
    });

    function createHeartShower() {
        const hearts = ['❤️', '💖', '💝', '💕', '💗'];
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'falling-heart';
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
                document.body.appendChild(heart);
                setTimeout(() => heart.remove(), 5000);
            }, i * 100);
        }
    }
});

// Add these styles
const style = document.createElement('style');
style.textContent = `
    .valentine-card {
        position: relative;
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }

    .falling-heart {
        position: fixed;
        font-size: 1.5rem;
        animation: fallDown 3s linear forwards;
        z-index: 1000;
        pointer-events: none;
    }

    @keyframes fallDown {
        from {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 1;
        }
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
