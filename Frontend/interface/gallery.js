document.getElementById("file-input").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
  
      reader.onload = function() {
        const imageDataURL = reader.result;
        const imagePreview = document.getElementById("gallery");
        var image = `
        <img src="${imageDataURL}">
        `
        imagePreview.innerHTML = image ;
      };
  
      reader.readAsDataURL(file);
    }
  });
  