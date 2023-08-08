var file = [];

document.getElementById('file').addEventListener('change', function () {
  if (this.files.length > 0) {
    var fileSizeInMB = this.files[0].size / (1024 * 1024);
    file.push({
      no: file.length + 1,
      type: this.files[0].type,
      name: this.files[0].name,
      size: fileSizeInMB.toFixed(2),
    });
    buildTable(file);
  }
});

$('#search-box').on('keyup', function () {
  var value = $(this).val();
  var data = SearchTable(value, file);
  buildTable(data);
  console.log(value);
});

function SearchTable(value, data) {
  var filterdata = [];
  for (var i = 0; i < data.length; i++) {
    var name = data[i].name.toLowerCase();

    if (name.includes(value.toLowerCase())) {
      filterdata.push(data[i]);
    }
  }
  return filterdata; // You were missing the return statement here
}

function buildTable(data) {
  var table = document.getElementById('myTable');
  // Clear the existing table rows before rebuilding
  table.innerHTML = '';

  for (var i = 0; i < data.length; i++) {
    var row = `<tr>
        <td>${data[i].no}</td>
        <td>${data[i].type}</td>
        <td>${data[i].name}</td>
        <td>${data[i].size}</td>
        </tr>
        `;
    table.innerHTML += row;
  }
}

// Initial call to buildTable to populate the table on page load
buildTable(file);
