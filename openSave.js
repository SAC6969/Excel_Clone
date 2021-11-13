let downlaodBtn = document.querySelector(".download");
let open = document.querySelector(".open");

//download
downlaodBtn.addEventListener("click",function(e){
    let jsondata = JSON.stringify([sheetDB,graphComponentMatrix]);
    let file = new Blob([jsondata],{type: "application/json"});
    let a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = "SheetData.JSON";
    a.click();
})

//upload / open
open.addEventListener("click",function (e){
    // open file explorer 
    let input = document.createElement("input");
    input.setAttribute("type","file");
    input.click()

    input.addEventListener("change",function(e){
        let fr = new FileReader();
        let files = input.files;
        let fileObj = files[0];
        fr.readAsText(fileObj);
        fr.addEventListener("load",(e)=>{
            let readSheetData = JSON.parse(fr.result);
            // create sheet 
            addSheetBtn.click();

            //SheetDB,graph component;
            sheetDB = readSheetData[0];
            graphComponentMatrix = readSheetData[1];
            collectedSheetDB[collectedSheetDB.length-1] = sheetDB;
            collectedGraphComponent[collectedGraphComponent.length-1] = graphComponentMatrix;
            handleSheetProperties();
            
        });
    })
})

