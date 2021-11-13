let ctrlKey;
document.addEventListener("keydown",function(e){
    ctrlKey = e.ctrlKey;
})

document.addEventListener("keyup",function(e){
    ctrlKey = e.ctrlKey;
})

for(let i=0; i<row; i++){
    for(let j =0; j<col ; j++){
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        handleSeletcedCells(cell);
    }
}

let rangeStorage = [];
// for selection 
function handleSeletcedCells(cell){
    cell.addEventListener("click",function(e){
        // Select cells range work
        if(!ctrlKey)return;
        if(rangeStorage.length >= 2){
            handelSelectedCellUI();
            rangeStorage = [];
        };

        // UI 
        cell.style.border = "3px solid #218c74";

        let rid = Number(cell.getAttribute("rid"));
        let cid = Number(cell.getAttribute("cid"));
        rangeStorage.push([rid,cid]);
    })
}

function handelSelectedCellUI(){
    for(let i =0; i<rangeStorage.length; i++){
        let cell = document.querySelector(`.cell[rid="${rangeStorage[i][0]}"][cid="${rangeStorage[i][1]}"]`);
        cell.style.border = "1px solid lightgrey";
    }
}

let cut = document.querySelector(".cut");
let copy = document.querySelector(".copy");
let paste = document.querySelector(".paste");


//copy data 
let copydata = [];
copy.addEventListener("click",function(e){
    if(rangeStorage.length < 2)return;
    copydata = [];
    let [startRow,startCol,endRow,endCol] = [ rangeStorage[0][0],rangeStorage[0][1],rangeStorage[1][0],rangeStorage[1][1]]
    for(let i = startRow; i <= endRow; i++){
        let copyRow = [];
        for(let j = startCol; j <= endCol; j++){
            let cellProp = sheetDB[i][j];   
            copyRow.push(cellProp);
        }
        copydata.push(copyRow);
    }
    handelSelectedCellUI();
})

//cut
cut.addEventListener("click",function(e){
    if(rangeStorage.length < 2)return;
    let [startRow,startCol,endRow,endCol] = [ rangeStorage[0][0],rangeStorage[0][1],rangeStorage[1][0],rangeStorage[1][1]]
    for(let i = startRow; i <= endRow; i++){
        for(let j = startCol; j <= endCol; j++){
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);

            //DB
            let cellProp = sheetDB[i][j];
            cellProp.value = "";
            cellProp.bold = false;
            cellProp.underline = false;
            cellProp.italic = false;
            cellProp.fontSize = 14;
            cellProp.fontFamily = "monospace";
            cellProp.fontColor = "#000000";
            cellProp.BGcolor = "#000000";
            cellProp.alignment = "left";
            //UI
            cell.click();
        }
    }
    handelSelectedCellUI();
})


// paste cell data
paste.addEventListener("click",function(e){
    if(rangeStorage.length<2)return;

    let rowDiff = Math.abs(rangeStorage[0][0] - rangeStorage[1][0]);
    let colDiff = Math.abs(rangeStorage[0][1] - rangeStorage[1][1]);
    
    //target
    // r -> copydata row
    // cc-> copydata col
    let address = addressBar.value;
    let [strow,stcol] = decodeRidCidAddress(address);
    for(let i = strow,r =0; i <= strow + rowDiff; i++,r++){
        for(let j = stcol,c = 0; j <= stcol+colDiff; j++,c++){
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            if(!cell)continue;
            // DB 
            let data = copydata[r][c];
            let cellProp = sheetDB[i][j];

            cellProp.value = data.value;
            cellProp.bold = data.bold;
            cellProp.italic = data.italic;
            cellProp.underline = data.underline;
            cellProp.fontSize = data.fontSize;
            cellProp.fontFamily = data.fontFamily;
            cellProp.fontColor = data.fontColor;
            cellProp.BGcolor = data.BGcolor;
            cellProp.alignment = data.alignment;
            //UI
            cell.click();
        }
    }
})








