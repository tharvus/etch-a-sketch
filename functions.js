// objective: To make a NUM_ROWS * NUM_ROWS square div
let NUM_ROWS = 16;
const MAX_WIDTH = 1000;
let drawable = false;

// create enum to show all options
const ALL_OPTIONS = {
    PENCIL: "pencil",
    COLOR: "color",
    ERASER: "eraser"
}
let optionChosen = ALL_OPTIONS.PENCIL;

const createGrid = () => {
    // retrieve the element we'll add divs to
    const parentDiv = document.querySelector(".grids");
    parentDiv.style.justifyContent = "center";
    parentDiv.style.alignItems = "center";
    // generate a div containing multiple divs

    for (let i = 0; i < NUM_ROWS; i++) {
        const divToAdd = document.createElement("div");
        // divToAdd.style.border = "1px solid black";
        divToAdd.style.flexDirection = "row";
        divToAdd.style.display = "flex";
        divToAdd.style.justifyContent = "center";
        // divToAdd.style.alignItems = "center";
        for (let j = 0; j < NUM_ROWS; j++) {
            const innerDiv = document.createElement("div");
            const pElem = document.createElement("p");

            // pElem.textContent = "Hello World";
            innerDiv.append(pElem);

            innerDiv.style.height = `${MAX_WIDTH/NUM_ROWS}px`;
            innerDiv.style.width = `${MAX_WIDTH/NUM_ROWS}px`;
            innerDiv.style.border = "1px solid black";
            innerDiv.className = "innerDiv";
            divToAdd.append(innerDiv);
        }
        parentDiv.append(divToAdd);
    }

};

const resetGrid = () => {
    const nodeToAlter = document.querySelector(".grids");
    nodeToAlter.innerHTML = "";
}

const submitRowAmountFn = (e) => {
    e.preventDefault();
    resetGrid();
    const formElem = document.querySelector("#rowInputForm");
    const form = new FormData(formElem);
    runProgram(form.get("numRows"));

}
// prompt the user
const runProgram = (newNum) => {
    // make sure to handle invalid input
    
    newNum = Number.parseInt(newNum);
    if (newNum > 100 || newNum < 0) {
        alert("The number is too large! Input a number between 0 and 100");
        return;
    }
    NUM_ROWS = newNum;
    createGrid();

    // add necessary event listeners
    const radioGroup = document.querySelector(".drawerOptions");

    radioGroup.addEventListener("click", changeSelectedOption);

    const drawableDivs = document.querySelectorAll(".innerDiv");

    for (let i = 0; i < drawableDivs.length; i++) {
        drawableDivs[i].addEventListener("click", toggleDrawable);
        drawableDivs[i].addEventListener("mouseover", chooseADrawer);
    }
}


const draw = (e) => {
    // make sure mouse was held down and it is drawable first
    if (drawable) {
        // create random r,g and b values
        const nodeToAlter = e.target;
        let r = Math.random() * 255;
        let g = Math.random() * 255;
        let b = Math.random() * 255;
        nodeToAlter.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 100)`;
    }

}

const drawWithDarkening = (e) => {
    // make sure board is drawable first
    if (drawable) {
        const nodeToAlter = e.target;

        // if background colour property exists then add 10 to it
        if (nodeToAlter.style?.backgroundColor !== null && nodeToAlter.style?.backgroundColor.trim() !== "") {

            let color = nodeToAlter.style.backgroundColor;

            // if it is rgb and not rgba, do nothing

            // we have to do this because the moment our opacity reaches 1, the css style changes from rgba to rgb as an opacity of 1 is essentially rgb(0,0,0).
            if (color.substring(0, 4) !== "rgba") {
                return;
            }
            // 
            let alpha = color.substring(color.lastIndexOf(",") + 1, color.length - 1);
            let alphaNum = Number.parseFloat(alpha);


            alphaNum < 0.99 ? alphaNum += 0.1 : alphaNum
            nodeToAlter.style.backgroundColor = `rgba(0,0,0,${alphaNum})`;
        } else {
            nodeToAlter.style.backgroundColor = "rgba(0,0,0,0.1)";
        }
    }
}

const erase = (e) => {
    // if board is drawable, replace all the grids with white to "erase"
    if (drawable) {
        const nodeToAlter = e.target;
        nodeToAlter.style.backgroundColor = "rgb(255, 255, 255)";
    }
}

const chooseADrawer = (e) => {
    if (optionChosen === ALL_OPTIONS.PENCIL) {
        drawWithDarkening(e);
    } else if (optionChosen === ALL_OPTIONS.COLOR) {
        draw(e);
    } else if (optionChosen === ALL_OPTIONS.ERASER) {
        erase(e);
    }
}

const toggleDrawable = (e) => {
    drawable = !drawable;
    chooseADrawer(e);

}

const changeSelectedOption = (e) => {
    // change whether to use pencil, pen or eraser
    if (e?.target === null || !e.target.matches("input[type='radio']")) {
        return;
    }

    const newOption = e.target.value;
    // change selected option
    if (newOption === "pencil") {
        optionChosen = ALL_OPTIONS.PENCIL;
    } else if (newOption === "color") {
        optionChosen = ALL_OPTIONS.COLOR;
    } else if (newOption === "eraser") {
        optionChosen = ALL_OPTIONS.ERASER;
    }
}


