// Some JavaScript to load the image and show the form. There is no actual backend functionality. This is just the UI
const img = document.querySelector("#img");
const outputPath = document.querySelector("#output-path");
const filename = document.querySelector("#filename");
const heightInput = document.querySelector("#height");
const widthInput = document.querySelector("#width");

const width = widthInput.value;
const height = heightInput.value;
const imgPath = img.files[0]?.path;
console.log(imgPath)

const form = document.querySelector("#img-form");

function loadImage(e) {
  const file = e.target.files[0];

  if (!isFileImage(file)) {
    alertError("Please select an image file");
    return;
  }

  const image = new Image();
  image.src = URL.createObjectURL(file);
  image.onload = function () {
    widthInput.value = this.width;
    heightInput.value = this.height;
  };

  form.style.display = "block";
  filename.innerText = file.name;
  outputPath.innerText = path.join(os.homedir(), "image:resize");

  document.querySelector("#filename").innerHTML = file.name;
}

function sendImage(e) {
  e.preventDefault();

  if (width === "" || height === "") {
    alertError("Please fill width and height");
  }

  ipcRenderer.send("image:resize", {
    imaPath,
    width,
    height,
  });
}

function isFileImage(file) {
  const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];
  return file && acceptedImageTypes.includes(file["type"]);
}

function alertError(message) {
  toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: "red",
      color: "white",
      textAlign: "center",
    },
  });
}

function alertSuccess(message) {
  toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: "green",
      color: "white",
      textAlign: "center",
    },
  });
}

document.querySelector("#img").addEventListener("change", loadImage);
form.addEventListener("submit", sendImage);
