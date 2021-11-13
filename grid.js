let row = 100;
let col = 26;
let addressColCant = document.querySelector(".address-col-cont");
for(let i=1; i<=row; i++){
    let adressdiv = document.createElement("div");
    adressdiv.setAttribute("class","address-col");
    adressdiv.innerText = i;
    addressColCant.appendChild(adressdiv);
}

let addressRowCont = document.querySelector(".address-row-cont");
for(let i=0; i<col; i++){
    let addressRow = document.createElement("div");
    addressRow.setAttribute("class","address-row");
    addressRow.innerText = String.fromCharCode(65 + i);
    addressRowCont.appendChild(addressRow);
}

let allcell = document.querySelector(".cells-cont");

for(let i=0; i<row; i++){
    let rowCont = document.createElement("div");
    rowCont.setAttribute("class","row-cont");
    for(let j=0; j<col; j++){
        let cell = document.createElement("div");
        cell.setAttribute("class","cell");
        cell.setAttribute("contenteditable","true");
        cell.setAttribute("spellcheck","false");
        // Attribute for cell and storage identification 
        cell.setAttribute("rid",i);
        cell.setAttribute("cid",j);
        rowCont.appendChild(cell);
        addEventListenerForAddressBarDisplay(cell, i , j);
    }
    allcell.appendChild(rowCont);
}

let addressBar = document.querySelector(".address-bar");
function addEventListenerForAddressBarDisplay(cell, i , j){
    cell.addEventListener("click",function(e){
        let rowId = i+1;
        let colId = String.fromCharCode(65+j);
        addressBar.value = `${colId+rowId}`
    })
}
