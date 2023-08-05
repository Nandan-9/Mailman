
var file = [];
document.getElementById('file').addEventListener('change', function () {
    if (this.files.length > 0) {
        var fileSizeInMB = this.files[0].size / (1024 * 1024);
      file.push({
        no : file.length + 1,
        type: this.files[0].type,
        name: this.files[0].name,
        size: fileSizeInMB.toFixed(2) 
      });
      buildTable(file);
    }
  });
 buildTable(file);
function buildTable(data){
    var table = document.getElementById('myTable');
    for(var i = 0; i < data.length; i++){
        var row = `<tr>
        <td>${data[i].no}</td>
        <td>${data[i].type}</td>
        <td>${data[i].name}</td>
        <td>${data[i].size}</td>
        </tr>
        `
        table.innerHTML += row;
    }
}