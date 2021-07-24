// ********** Filters ********** 
const inputs = document.querySelector('.filters');

function setFilter(e) {
  const input = e.target,
        suffix = input.getAttribute('data-sizing') || '';

  document.documentElement.style.setProperty(`--${input.name}`, `${input.value}${suffix}`);

  input.nextElementSibling.value = input.value;
}

inputs.addEventListener('input', setFilter);

// ********** Reset ********** 
const btnReset = document.querySelector('.btn-reset');
const inputElements = document.querySelectorAll('.filters input');

function resetFilter() {
  inputElements.forEach(input => {
    input.value = 0;

    const suffix = input.getAttribute('data-sizing') || '';

    if (input.name == 'saturate') {
      document.documentElement.style.setProperty(`--saturate`, `100${suffix}`);
      input.value = 100;
      input.nextElementSibling.value = 100;
    } else {
      document.documentElement.style.setProperty(`--${input.name}`, `${input.value}${suffix}`);
      input.nextElementSibling.value = 0; 
    }   
  });
}

btnReset.addEventListener('click', resetFilter);

// ********** Load picture **********
const fileInput = document.querySelector('.btn-load--input'),
      editorWrapper = document.querySelector('.editor');

function loadImage() {
  const file = fileInput.files[0],
        oldImage = document.querySelector('img'),
        reader = new FileReader();
  
  reader.readAsDataURL(file);

  reader.onload = () => {
    createNewImage(reader.result);
  };
  
}

fileInput.addEventListener('change', loadImage);

// ********** Next picture **********
const btnNextPicture = document.querySelector('.btn-next');
let imageCount = 1;

function numberLessTen(number) {
  return (number < 10) ? '0' + number : number;
}

function checkImageCount(number) {
  if (number > 20) imageCount = 1;
}

let origImageWidth = 1200;
let origImageHeight = 750;

function createNewImage(src) {
  const newImage = new Image();
  
  newImage.crossOrigin = "Anonymous";
  newImage.src = src;
  newImage.onload = () => {
    origImageWidth = newImage.width;
    origImageHeight = newImage.height;

    document.querySelectorAll('img').forEach((image) => image.remove());
    editorWrapper.append(newImage);
  };
}

function nextPicture() {
  resetFilter();
  const time = new Date().getHours();
  
  if (time >= 6 && time < 12) {
    checkImageCount(imageCount);
    createNewImage(`https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/morning/${numberLessTen(imageCount)}.jpg`);
    imageCount++;
  }

  else if (time >= 12 && time < 18) {
    checkImageCount(imageCount);
    createNewImage(`https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/day/${numberLessTen(imageCount)}.jpg`);
    imageCount++;
  }

  else if (time >= 18 && time < 24) {
    checkImageCount(imageCount);
    createNewImage(`https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/${numberLessTen(imageCount)}.jpg`);
    imageCount++;
  }

  else {
    checkImageCount(imageCount);
    createNewImage(`https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/night/${numberLessTen(imageCount)}.jpg`);
    imageCount++;
  }
}

btnNextPicture.addEventListener('click', nextPicture);

// ********** Save image **********
const btnSave = document.querySelector('.btn-save');

function saveImage() {
  const blur = document.querySelector('input[name=blur'),
        invert = document.querySelector('input[name=invert'),
        sepia = document.querySelector('input[name=sepia'),
        saturate = document.querySelector('input[name=saturate'),
        hueRotate = document.querySelector('input[name=hue');

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const image = document.querySelector('img');

  canvas.width = origImageWidth;
  canvas.height = origImageHeight;

  ctx.filter = `blur(${blur.value}px) invert(${invert.value}%) sepia(${sepia.value}%) saturate(${saturate.value}%) hue-rotate(${hueRotate.value}deg)`;
  ctx.drawImage(image, 0, 0);

  const a = document.createElement('a');

  a.href = canvas.toDataURL('image/jpeg');
  a.download = 'photo.jpg';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

btnSave.addEventListener('click', saveImage);

// ********** Fullscreen **********
const btnFullScreen = document.querySelector('.fullscreen');

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

btnFullScreen.addEventListener('click', toggleFullScreen);