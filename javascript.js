// let gridsize = 16;
const gridContainer = document.querySelector('#grid-container');
const gridSizeButton = document.querySelector('#grid-size-button');
const eraseButton = document.querySelector('#erase-button');
const randomColorButton = document.querySelector('#random-color');
const defaultColor = document.querySelector('#blue');
defaultColor.classList.add('selected');

let randomColor = "false";
let currentColor = "blue";
let rows;
generateGrid(16);
rows = document.querySelectorAll('.row');
colors = document.querySelectorAll('.color-picker');
const colorsList = [];
colors.forEach(colorIteration => {
    if(colorIteration.id !== "random-color") {
        const colorToAdd = getComputedStyle(colorIteration);
        colorsList.push(colorToAdd.backgroundColor);
    }
});

function setColor(divContent, colorToSet) {
    if(randomColor) {
        const randomColorIndex = Math.floor(Math.random(colorsList.length) * colorsList.length);
        divContent.style.backgroundColor = colorsList[randomColorIndex];
    } else {
        divContent.style.backgroundColor = colorToSet;
    } 
}

function generateGrid(gridsize) {
    for(let y =0; y<gridsize; y++) {
        const row = document.createElement('div');
        gridContainer.appendChild(row);
        row.classList.add('row');
        for(let x=0; x<gridsize; x++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');
            const pixelsize = 800/gridsize;
            row.style.height = pixelsize + "px";
            // took me a while to figure out i had to do this
            pixel.addEventListener('mouseenter', () =>{
                setColor(pixel, currentColor);
            });
    
    
            row.appendChild(pixel);
    
        }
    }

    rows = document.querySelectorAll('.row');
}

function deleteGrid(gridRows) {
    gridRows.forEach(currentRow => {
        gridContainer.removeChild(currentRow);
    });
}

function resetSelectedColor() {
    colors.forEach(currentlySelectedColor => {
        currentlySelectedColor.classList.remove('selected');
    });
}

gridSizeButton.addEventListener('click', () => {
    gridsize = + prompt("Enter the number of pixels wide you would like your grid to be (up to 100). Entering 30 will give you a 30x30 size grid")
    if((gridsize < 101) && (gridsize > 0)){
        deleteGrid(rows);
        generateGrid(gridsize);
    } else {
        alert("You must enter a number between 1 and 100");
    }

});

eraseButton.addEventListener('click', () => {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach(currentPixel => {
        currentPixel.style.backgroundColor = "white";
    })
});

colors.forEach(selectedColor => selectedColor.addEventListener('click', () => {
    const colorStyle = getComputedStyle(selectedColor);
    if(selectedColor.id == "random-color") {
        randomColor = true;
    } else {
        currentColor = colorStyle.backgroundColor;
        randomColor = false;
    }
    resetSelectedColor();
    selectedColor.classList.add('selected');
}));




// gridContainer.classList.add('pixel');