function colorPromise(){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve();
        },1000)
    })
}

async function isGraphCyclicTracePath(graphComponentMatrix,cycleResponse){
    let [srcr,srcc] = cycleResponse;
    let visited = [];
    let dsfvisited = [];
    for(let i = 0; i<row; i++){
        let visitedRow = [];
        let dsfvisitedRow = [];
        for(let j = 0; j<col; j++){
            visitedRow.push(false);
            dsfvisitedRow.push(false);
        }
        visited.push(visitedRow);
        dsfvisited.push(dsfvisitedRow)
    }

    let response = await dfsCycleDetectionTracePath(graphComponentMatrix,srcr,srcc,visited,dsfvisited);
    if(response == true){
        return Promise.resolve(true);
   }
   return Promise.resolve(false);
}

async function dfsCycleDetectionTracePath(graphComponentMatrix,srcr,srcc,visited,dfsvisited){
    visited[srcr][srcc] = true;
    dfsvisited[srcr][srcc] = true;

    let cell = document.querySelector(`.cell[rid="${srcr}"][cid="${srcc}"]`);
    cell.style.backgroundColor = "lightblue";
    await colorPromise();

    for(let i=0; i<graphComponentMatrix[srcr][srcc].length;i++){
        let [rid,cid] = graphComponentMatrix[srcr][srcc][i];
        if(visited[rid][cid]== false){
            let response = await dfsCycleDetectionTracePath(graphComponentMatrix,rid,cid,visited,dfsvisited);
            if(response == true){
                cell.style.backgroundColor = "transparent";
                await colorPromise();
                return Promise.resolve(true);
            };
        }else if(visited[rid][cid] == true && dfsvisited[rid][cid] == true){
            let  cyclicCell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
            cyclicCell.style.backgroundColor = "lightsalmon";
            await colorPromise();

            cyclicCell.style.backgroundColor = "transparent";
            await colorPromise();
            cell.style.backgroundColor = "transparent";
            return Promise.resolve(true);
        }   
    }
    dfsvisited[srcr][srcc] = false;
    return Promise.resolve(false);
}