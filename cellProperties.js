//Storage
let collectedSheetDB = [];
let sheetDB = [];

{
    let addSheetBtn = document.querySelector(".sheet-add-icon");
    addSheetBtn.click();
}

// for(let i=0; i<row;i++){
//     let sheetRow = [];
//     for(let j=0; j < col; j++){
//         let cellProp = {
//             bold : false,
//             italic : false,
//             underline : false,
//             alignment : "left",
//             fontFamily : "monospace",
//             fontSize : "14",
//             fontColor : "#000000",
//             BGcolor : "#000000",
//             value : "",
//             formula : "",
//             children : [],
//         }
//         sheetRow.push(cellProp);
//     }
//     sheetDB.push(sheetRow);
// }

//selectors for cell properties

let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let alignment = document.querySelectorAll(".alignment");
let fontFamily = document.querySelector(".font-family-prop");
let fontSize = document.querySelector(".font-size-prop");
let fontColor = document.querySelector(".font-color-prop");
let BGcolor = document.querySelector(".BGcolor-prop");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";


//Attach event listener
// application of 2Way binding 

//for Bold
bold.addEventListener("click",function(e){
    let address = addressBar.value;
    let [cell,cellProp] = activecell(address);
    //Modification
    cellProp.bold = !cellProp.bold; //Data Change
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; // ui Change
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp; // ui 2 change
})

//for italic 
italic.addEventListener("click",function(e){
    let address = addressBar.value;
    let [cell,cellProp] = activecell(address);
    //Modification
    cellProp.italic = !cellProp.italic; //Data Change
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal"; // ui Change
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp; // ui 2 change
})

//for underline
underline.addEventListener("click",function(e){
    let address = addressBar.value;
    let [cell,cellProp] = activecell(address);
    //Modification
    cellProp.underline = !cellProp.underline; //Data Change
    cell.style.textDecoration = cellProp.underline ? "underline" : "none"; // ui Change
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp; // ui 2 change
})

// for size 
fontSize.addEventListener("change",function(e){
    let address = addressBar.value;
    let [cell,cellProp] = activecell(address);
    cellProp.fontSize = fontSize.value;
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value = cellProp.fontSize;
})

// font family 
fontFamily.addEventListener("change",function(e){
    let address = addressBar.value;
    let [cell,cellProp] = activecell(address);
    cellProp.fontFamily = fontFamily.value;
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;
})

//font color
fontColor.addEventListener("change",function(e){
    let address = addressBar.value;
    let [cell,cellProp] = activecell(address);

    cellProp.fontColor = fontColor.value;
    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor;
})

BGcolor.addEventListener("change",function(e){
    let address = addressBar.value;
    let [cell,cellProp] = activecell(address);

    cellProp.BGcolor = BGcolor.value;
    cell.style.backgroundColor = cellProp.BGcolor;
    BGcolor.value = cellProp.BGcolor;
})

alignment.forEach((alignElem)=>{
    alignElem.addEventListener("click",function(e){
        let address = addressBar.value;
        let [cell,cellProp] = activecell(address);

        let alignValue = e.target.classList[0];
        cellProp.alignment = alignValue; // data change
        cell.style.textAlign = cellProp.alignment; // ui change 1
        // ui change 2
        switch(alignValue){
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }
    })
})

let allcells = document.querySelectorAll(".cell");
for(let i=0; i<allcells.length; i++){
    addListenerToAttachCellProp(allcells[i]);
}

function addListenerToAttachCellProp(cell){
    cell.addEventListener("click",function(e){
        let address = addressBar.value;
        let [rid,cid] = decodeRidCidAddress(address);
        let cellProp = sheetDB[rid][cid];

        cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; // ui Change
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal"; // ui Change
        cell.style.textDecoration = cellProp.underline ? "underline" : "none"; // ui Change
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.BGcolor === "#000000" ? "transparent" : cellProp.BGcolor;
        cell.style.textAlign = cellProp.alignment; // ui change 1

        // Apply properties Ui container
        bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp; // ui 2 change
        italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp; // ui 2 change
        underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp; // ui 2 change
        fontColor.value = cellProp.fontColor;
        BGcolor.value = cellProp.BGcolor;
        fontSize.value = cellProp.fontSize;
        fontFamily.value = cellProp.fontFamily;
        switch(cellProp.alignment){
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }

        let formulaBar = document.querySelector(".formula-bar");
        formulaBar.value = cellProp.formula;
        cell.innerText = cellProp.value;
    })
}

function activecell(address){
    let [rid,cid] = decodeRidCidAddress(address);
    // Acess cell & storage object
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`)
    let cellPorp = sheetDB[rid][cid];
    return[cell,cellPorp];
}

function decodeRidCidAddress(address){
    //address -> "A1";
    let rid = Number(address.slice(1)-1);
    let cid = Number(address.charCodeAt(0)) - 65;
    return[rid,cid];
}





