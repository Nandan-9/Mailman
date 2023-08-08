const dragArea = document.querySelector('.drag-area');
const dragText = document.querySelector('.head');
let button = document.querySelector('.btn');
let input = document.querySelector('input');

let  file;

button.onclick = () =>{
    input.click();
}

input.addEventListener('change', () =>{
    file = this.files[0];
})

dragArea.addEventListener('dragover', (event) =>{
    event.preventDefault();
    dragText.textContent = 'Relase to upload'
    console.log('inside the dragarea')
})

dragArea.addEventListener('dragleave', (event) =>{
    event.preventDefault();
    dragText.textContent = 'Drag and drop'
    console.log('left the dragarea')
})

dragArea.addEventListener('drop',(event) =>{
    event.preventDefault();
    file = event.dataTransfer.files[0];
    let fileReader = new FileReader();
    fileReader.onload = () =>{
        let fileURL = fileReader.result;
        let fileTag = `<span >${file.name}</span>`
        let button  = `<button onClick="shareFile()">Share</button> `
        dragArea.innerHTML  = fileTag
        dragArea.innerHTML += button
    }
    console.log(file);
    fileReader.readAsDataURL(file)
})