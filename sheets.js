// sheets Handling 
let addSheetBtn = document.querySelector(".sheet-add-icon");
let sheetFolderContainer = document.querySelector(".sheets-folder-cont");
addSheetBtn.addEventListener("click", (e) => {
    let sheet = document.createElement("div");
    sheet.setAttribute("class","sheet-folder");
    let allSheetFolder = document.querySelectorAll(".sheet-folder");
    sheet.setAttribute("id",allSheetFolder.length);
    sheet.innerHTML=`<div class="sheet-content">Sheet ${allSheetFolder.length+1}</div>`
    sheetFolderContainer.appendChild(sheet);
    sheet.scrollIntoView();

    createSheetDB();
    createGraphComponentMatrix();
    handleSheet(sheet);
    handleSheetRemoval(sheet);
    sheet.click();
})

function handleSheetRemoval(sheet){
    sheet.addEventListener("mousedown",function(e){
        if(e.button != 2){
            return;
        } // 0 - left, 1 - scroll, 2 - right 
        let allSheetFolder = document.querySelectorAll(".sheet-folder");
        if(allSheetFolder.length == 1){
            alert("You need to have atleast one sheets!!!");
            return;
        }
        let response = confirm("Your sheet will be removed permanently, Are you sure?");
        if(response === false)return;
        let sheetIndexIs =  Number(sheet.getAttribute("id"));

        // DB Removal 
        collectedSheetDB.splice(sheetIndexIs,1);
        collectedGraphComponent.splice(sheetIndexIs,1);
        
        // UI
        handleSheetUIremoval(sheet);
        // by defalut after removal 
        sheetDB = collectedSheetDB[0];
        graphComponentMatrix = collectedGraphComponent[0];
        handleSheetProperties();
    })
}

function handleSheetUIremoval(sheet){
    sheet.remove();
    let allSheetFolder = document.querySelectorAll(".sheet-folder");
    for(let i = 0; i < allSheetFolder.length; i++){
        allSheetFolder[i].setAttribute("id",i);
        let sheetContent = allSheetFolder[i].querySelector(".sheet-content");
        sheetContent.innerHTML = ` Sheet ${i+1}`;
        allSheetFolder[i].style.backgroundColor = "transparent";
    }
    allSheetFolder[0].style.backgroundColor = "#ced6e0"
}

function handleSheetDB(sheetIndexIs){
    sheetDB = collectedSheetDB[sheetIndexIs];
    graphComponentMatrix = collectedGraphComponent[sheetIndexIs];
}

function createSheetDB(){
    let sheetDB = [];

    for(let i=0; i<row;i++){
        let sheetRow = [];
        for(let j=0; j < col; j++){
            let cellProp = {
                bold : false,
                italic : false,
                underline : false,
                alignment : "left",
                fontFamily : "monospace",
                fontSize : "14",
                fontColor : "#000000",
                BGcolor : "#000000",
                value : "",
                formula : "",
                children : [],
            }
            sheetRow.push(cellProp);
        }
        sheetDB.push(sheetRow);
    }
    collectedSheetDB.push(sheetDB);
}

function createGraphComponentMatrix(){
    let graphComponentMatrix = [];
    for(let i = 0; i<row; i++){
        let rows = [];
        for(let j = 0; j<col; j++){
            //More then one child relation
            rows.push([]);
        }
        graphComponentMatrix.push(rows);
    }
    collectedGraphComponent.push(graphComponentMatrix);
}



function handleSheetProperties(){
    for(let i = 0 ; i < row; i++){
        for(let j = 0; j < col; j++){
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            cell.click();
        }
    }
    let firstCell = document.querySelector(".cell");
    firstCell.click();
}

function handleSheet(sheet){
    sheet.addEventListener("click",function(){
        let sheetIndexIs =  Number(sheet.getAttribute("id"));
        handleSheetDB(sheetIndexIs);
        handleSheetProperties();
        handleSheetUI(sheet);
    })
}

function handleSheetUI(sheet){
    let allSheetFolder = document.querySelectorAll(".sheet-folder");
    for(let i = 0; i<allSheetFolder.length; i++){
        allSheetFolder[i].style.backgroundColor = "transparent";
    }
    sheet.style.backgroundColor = "#ced6e0";
}







