// Selecting all images, thumbnail container, navigation buttons, and other required elements
const images = document.querySelectorAll('.slider-image');
const thumbnails = document.querySelector('.slider-thumbnails');
const prevButton = document.querySelector('.slider-prev');
const nextButton = document.querySelector('.slider-next');
const currentImageText = document.querySelector('.current-image');
const totalImagesText = document.querySelector('.total-images');

// Setting initial value of currentImage to 0
let currentImage = 0;

// Checking if a selected image is already stored in local storage
if (localStorage.getItem('selectedImage') !== null) {
    currentImage = parseInt(localStorage.getItem('selectedImage'));
}

// Displaying total number of images in the slider
totalImagesText.innerText = images.length.toString();

// Creating thumbnail buttons for all images in the slider
for (let i = 0; i < images.length; i++) {
    const thumbnail = document.createElement('button');
    thumbnail.classList.add('slider-thumbnail');
    thumbnail.textContent = i + 1;
    thumbnails.insertAdjacentElement('beforeend', thumbnail);
}

// Selecting all thumbnail buttons
const thumbnailButtons = document.querySelectorAll('.slider-thumbnail');

// Adding event listeners to previous and next buttons to navigate through images
prevButton.addEventListener('click', () => {
    if (currentImage === 0) {
        return;
    }
    currentImage--;
    updateSlider();
});

nextButton.addEventListener('click', () => {
    if (currentImage === images.length - 1) {
        return;
    }
    currentImage++;
    updateSlider();
});

// Adding event listeners to all thumbnail buttons to navigate to corresponding image
thumbnailButtons.forEach((thumbnailButton, index) => {
    thumbnailButton.addEventListener('click', () => {
        currentImage = index;
        updateSlider();
    });
});

// Function to update slider with current image and corresponding thumbnail
function updateSlider() {
    // Displaying current image number
    currentImageText.innerText = (currentImage + 1).toString();
    // Updating opacity and transform properties of all images based on current image index

    images.forEach((image, index) => {
        if (index === currentImage) {
            image.style.opacity = '1';
            image.style.transform = 'scale(1)';
        } else {
            image.style.opacity = '0';
            image.style.transform = 'scale(0.8)';
        }
    });

    // Adding 'active' class to thumbnail button of current image and removing it from others

    thumbnailButtons.forEach((thumbnailButton, index) => {
        if (index === currentImage) {
            thumbnailButton.classList.add('active');
        } else {
            thumbnailButton.classList.remove('active');
        }
    });

    // Disabling prev button if current image is first image, disabling next button if current image is last image

    if (currentImage === 0) {
        prevButton.disabled = true;
    } else {
        prevButton.disabled = false;
    }

    if (currentImage === images.length - 1) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }

    if (currentImage === 0) {
        prevButton.style.opacity = '.5';
        prevButton.style.cursor = 'unset';
    } else {
        prevButton.style.opacity = 1;
        prevButton.style.cursor = 'pointer';
    }

    if (currentImage === images.length - 1) {
        nextButton.style.opacity = '.5';
        nextButton.style.cursor = 'unset';
    } else {
        nextButton.style.opacity = 1;
        nextButton.style.cursor = 'pointer';
    }

    // Saving selected image index in local storage
    localStorage.setItem('selectedImage', currentImage.toString());
}

// Calling updateSlider function to set initial state of slider
updateSlider();
