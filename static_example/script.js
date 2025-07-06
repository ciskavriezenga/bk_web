const button = document.getElementById('toggleImageBtn');
const mainImage = document.getElementById('mainImage');

button.addEventListener('click', () => {
    // Swap to image2.png
    mainImage.src = 'images/image2.png';

    // After 1 second, swap back to image1.png
    setTimeout(() => {
        mainImage.src = 'images/image1.png';
    }, 500);
});
