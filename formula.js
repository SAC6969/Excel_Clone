for(let i=0; i<row; i++){
    for(let j=0; j<col; j++){
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("blur",function(e){
            let address = addressBar.value;
            let [cell, cellProp] = activecell(address);
            let enteredData = cell.innerText;

            if(enteredData == cellProp.value)return;
            cellProp.value = enteredData;
            // if data modified update remove P-C relation, formula empty, update children
            removeChildFromParent(cellProp.formula);
            cellProp.formula = "";
            updateChildrenCell(address);
        })
    }
}

let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown",async function(e){
    let inputFormula = formulaBar.value;
    if(e.key == "Enter" && inputFormula){
        let address = addressBar.value;
        let [cell,cellProp] = activecell(address);
        // if change in formula , break old P-C relation, evaluate new formula 
        if(inputFormula !== cellProp.formula){
            removeChildFromParent(cellProp.formula);
        }
        addChildTOGraphComponent(inputFormula,address);
        // check formula cyclic or not
        let cycleResponse = isGraphCyclic(graphComponentMatrix);
        if(cycleResponse){
            // alert("Your formula is Cyclic");
            let respone = confirm("Your formula is Cyclic, Do You want to trace your path");
            while(respone==true){
                //Keep Tracking color until user is satisfied
                await isGraphCyclicTracePath(graphComponentMatrix,cycleResponse);
                respone = confirm("Your formula is Cyclic, Do You want to trace your path");
            }
            removeChildFromGraphComp(inputFormula,address);
            return;
        }
        
        let evaluatedValue = evaluateFormula(inputFormula);

        // update UI and prop in DB
        setCellUIandCellProp(evaluatedValue, inputFormula, address);
        // add parent child relationship 
        addChildToParent(inputFormula);
        // console.log(sheetDB);
        updateChildrenCell(address);
    }
})

function removeChildFromGraphComp(formula,childAddress){
    let [crid,ccid] = decodeRidCidAddress(childAddress);
    let encodedFormula = formula.split(" ");
    for(let i = 0; i<encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue <= 90){
            let [prid,pcid] = decodeRidCidAddress(encodedFormula[i]);
            graphComponentMatrix[prid][pcid].pop();
        }
    }
}

function addChildTOGraphComponent(formula,childAddress){
    let [crid,ccid] = decodeRidCidAddress(childAddress);
    let encodedFormula = formula.split(" ");
    for(let i = 0; i<encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue <= 90){
            let [prid,pcid] = decodeRidCidAddress(encodedFormula[i]);
            // B1 : A1 + 10
            // rid -> i, cid -> j
            graphComponentMatrix[prid][pcid].push([crid,ccid]);
        }
    }
}

function updateChildrenCell(parentAddress){
    let [parentcell,parentcellProp] = activecell(parentAddress);
    let children = parentcellProp.children;
    for(let i = 0; i < children.length ; i++){
        let childAddress = children[i];
        let [childCell, childCellProp] = activecell(childAddress);
        let childformula = childCellProp.formula;
        let evaluatedValue = evaluateFormula(childformula);
        setCellUIandCellProp(evaluatedValue, childformula, childAddress)
        updateChildrenCell(childAddress);
    }
}

function addChildToParent(formula){
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for(let i = 0; i<encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90){
            let [cell,parentcellProp] = activecell(encodedFormula[i]);
            parentcellProp.children.push(childAddress); 
        }
    }
}

function removeChildFromParent(formula){
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for(let i = 0; i<encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90){
            let [cell,parentcellProp] = activecell(encodedFormula[i]);
            let idx = parentcellProp.children.indexOf(childAddress);
            parentcellProp.children.splice(idx,1);
        }
    }
}

function evaluateFormula(formula){
    let encodedFormula = formula.split(" ");
    for(let i = 0; i<encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue >= 65 && asciiValue <= 90){
            let [cell,cellProp] = activecell(encodedFormula[i]);
            encodedFormula[i] = cellProp.value;
        }
    }
    let decodedFormula = encodedFormula.join(" ");
    return eval(decodedFormula);
}

function setCellUIandCellProp(evaluatedValue,formula,address){
    let [cell,cellProp] = activecell(address);
    cell.innerText = evaluatedValue; // uI
    cellProp.value = evaluatedValue; // DB update
    cellProp.formula = formula;
}