const fileInput = document.getElementById("file");
const gallery = document.getElementById("gallery");
var photos = [];

document.getElementById("file").addEventListener("change", function () {
  if (this.files.length > 0) {
    var fileSizeInMB = this.files[0].size / (1024 * 1024);
    photos.push(this.files[0]);
    buildGallery(photos);
  }
});

function buildGallery(data) {
  let galleryHTML = "";
  for (var i = 0; i < data.length; i++) {
    let file = data[i];
    let fileType = file.type;
    console.log(fileType);
    let validType = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
    if (validType.includes(fileType)) {
      let fileReader = new FileReader();
      fileReader.onload = () => {
        let fileURL = fileReader.result;
        let imgTag = `<img src="${fileURL}">`;
        galleryHTML += imgTag;
        gallery.innerHTML = galleryHTML;
      };
      fileReader.readAsDataURL(file);
    } else {
      alert("Invalid file type");
    }
  }
}
