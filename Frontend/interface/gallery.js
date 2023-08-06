
var file = [];
document.getElementById('file').addEventListener('change', function () {
    if (this.files.length > 0) {
        var fileSizeInMB = this.files[0].size / (1024 * 1024);
      file.push({
        no : file.length + 1,
        type: this.files[0].type,
        name: this.files[0].name,
        size: fileSizeInMB.toFixed(2),
        photo : this.files[0] 
      });
      buildTable(file);
    }
  });
 buildTable(file);
function buildTable(data){
    var gallery = document.getElementById('gallery');
    for(var i = 0; i < data.length; i++){
        var row = `
        <img src="${data[i].photo}">
        `
        gallery.innerHTML += row;
    }
}