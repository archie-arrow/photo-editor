const fullscreenButton = document.querySelector('.fullscreen');

fullscreenButton.addEventListener('click', function () {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
});

let sepiaFilter = document.getElementById('sepia'),
    blurFilter = document.getElementById('blur'),
    invertFilter = document.getElementById('invert'),
    saturateFilter = document.getElementById('saturate'),
    hueFilter = document.getElementById('hue');

const image = document.getElementById('editor-image');

function doneFilter() {
    let filterProperty = `sepia(${sepiaFilter.value + sepiaFilter.getAttribute('data-sizing')}) 
                      blur(${blurFilter.value + blurFilter.getAttribute('data-sizing')}) 
                      invert(${invertFilter.value + invertFilter.getAttribute('data-sizing')}) 
                      saturate(${saturateFilter.value + saturateFilter.getAttribute('data-sizing')}) 
                      hue-rotate(${hueFilter.value + hueFilter.getAttribute('data-sizing')})`;

    image.style.filter = filterProperty;
}

const resetBtn = document.querySelector('.btn-reset'),
    nextBtn = document.querySelector('.btn-next'),
    loadBtn = document.querySelector('.btn-load--input'),
    saveBtn = document.querySelector('.btn-save');

resetBtn.addEventListener('click', function () {
    sepiaFilter.value = 0;
    sepiaFilter.oninput();

    blurFilter.value = 0;
    blurFilter.oninput();

    invertFilter.value = 0;
    invertFilter.oninput();

    hueFilter.value = 0;
    hueFilter.oninput();

    saturateFilter.value = 100;
    saturateFilter.oninput();

    doneFilter();
});

let hour = new Date(),
    timeOfDay;

if (hour.getHours() >= 0 && hour.getHours() < 6) {
    timeOfDay = 'night';
} else if (hour.getHours() >= 6 && hour.getHours() < 12) {
    timeOfDay = 'morning';
} else if (hour.getHours() >= 12 && hour.getHours() < 18) {
    timeOfDay = 'day';
} else {
    timeOfDay = 'evening';
}

let linkForImage = `./assets/img/${timeOfDay}/`;
let count = 1;

nextBtn.addEventListener('click', function () {
    if (count <= 20) {
        if (count <= 9) {
            image.src = linkForImage + `0${count}.jpg`;
        } else {
            image.src = linkForImage + `${count}.jpg`;
        }
    } else {
        count = 1;
        image.src = linkForImage + `01.jpg`;
    }
    count++;
});

function loadFile(input) {
    let file = input.files[0];

    image.src = URL.createObjectURL(file);
}

saveBtn.addEventListener('click', function () {
    let filterProperty = `sepia(${sepiaFilter.value + sepiaFilter.getAttribute('data-sizing')}) 
                      blur(${blurFilter.value + blurFilter.getAttribute('data-sizing')}) 
                      invert(${invertFilter.value + invertFilter.getAttribute('data-sizing')}) 
                      saturate(${saturateFilter.value + saturateFilter.getAttribute('data-sizing')}) 
                      hue-rotate(${hueFilter.value + hueFilter.getAttribute('data-sizing')})`;

    let canvas = document.createElement("canvas"),
        context = canvas.getContext("2d");
    canvas.width = image.width;
    canvas.height = image.height;
    context.filter = filterProperty;
    context.drawImage(image, 0, 0, image.width, image.height);

    let imgInfo = canvas.toDataURL("image/png");
    localStorage.setItem("imgInfo", imgInfo);

    let link = document.createElement('a');
    link.download = 'filter-' + image.src.split('/').pop();
    link.href = canvas.toDataURL();
    link.click();
});