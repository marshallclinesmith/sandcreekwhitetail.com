// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Hero Slideshow - auto-detects slide1.jpg, slide2.jpg, etc.
const slideshowContainer = document.getElementById('slideshow');

if (slideshowContainer) {
    let loadedSlides = [];

    function tryLoadSlide(num) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = 'images/slideshow/slide' + num + '.jpg';
        });
    }

    async function loadAllSlides() {
        let num = 1;
        while (true) {
            const exists = await tryLoadSlide(num);
            if (!exists) break;
            const slide = document.createElement('div');
            slide.className = 'slide' + (num === 1 ? ' active' : '');
            slide.style.backgroundImage = "url('images/slideshow/slide" + num + ".jpg')";
            slideshowContainer.appendChild(slide);
            loadedSlides.push(slide);
            num++;
        }

        if (loadedSlides.length > 1) {
            let current = 0;
            setInterval(() => {
                loadedSlides[current].classList.remove('active');
                current = (current + 1) % loadedSlides.length;
                loadedSlides[current].classList.add('active');
            }, 5000);
        }
    }

    loadAllSlides();
}
