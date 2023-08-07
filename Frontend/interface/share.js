const dragArea = document.querySelector('.drag-area');
const dragText = document.querySelector('.head');
const icon = document.querySelector('.icon');

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
    console.log('dropped');
})