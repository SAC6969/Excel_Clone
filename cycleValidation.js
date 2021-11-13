// Storage
let collectedGraphComponent = [];
let graphComponentMatrix = [];
// for(let i = 0; i<row; i++){
//     let rows = [];
//     for(let j = 0; j<col; j++){
//         //More then one child relation
//         rows.push([]);
//     }
//     graphComponentMatrix.push(rows);
// }

//True -> Cyclic , False -> not Cyclic
function isGraphCyclic(graphComponentMatrix){
    //Dependency -> visited, dsfvisited
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

    for(let i = 0; i<row; i++){
        for(let j = 0; j<col; j++){
            if( visited[i][j] == false){
                let response = dfsCycleDetection(graphComponentMatrix,i,j,visited,dsfvisited);
                if(response == true){
                    return [i,j];
                }
            }
        }
    }
    return null;
}

// Start -> visited true, dfsvisited true.
// End -> dfs(false)
// if vis[i][j] -> alredy explored path , go back 
// Cycle detection condition -> if(vis[i][j] == true && dfs[i][j] == true) -> cycle
// return true / false
function dfsCycleDetection(graphComponentMatrix,srcr,srcc,visited,dfsvisited){
    visited[srcr][srcc] = true;
    dfsvisited[srcr][srcc] = true;
    // A1 -> [[0,1],[1,0],........];
    for(let i=0; i<graphComponentMatrix[srcr][srcc].length;i++){
        let [rid,cid] = graphComponentMatrix[srcr][srcc][i];
        if(visited[rid][cid]== false){
            let response = dfsCycleDetection(graphComponentMatrix,rid,cid,visited,dfsvisited);
            if(response == true)return true;
        }else if(visited[rid][cid] == true && dfsvisited[rid][cid] == true){
            return true;
        }   
    }
    dfsvisited[srcr][srcc] = false;
    return false;
}