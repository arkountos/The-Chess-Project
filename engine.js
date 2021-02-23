let points = new Map();
points.set('P', 1);
points.set('N', 3);
points.set('B', 3);
points.set('R', 5);
points.set('Q', 9);
points.set('K', 100);
points.set('p', -1);
points.set('n', -3);
points.set('b', -3);
points.set('r', -5);
points.set('q', -9);
points.set('k', -100);

MAX_DEPTH = 2

/*
 * Evaluates a position based only on material.
 * Returns: Int - The value of the new position.
 */
function evaluate(chess){
    var fen = chess.fen();
    //console.log(fen);
    var i = 0;
    var result = 0;
    while(fen.charAt(i) !== ' '){
        //console.log(fen.charAt(i))
        myPoints = points.get(fen.charAt(i));
        if (myPoints != null){
            result += myPoints;
            i++;
            continue;
        }
        i++;
    }
    return(result)
}

/*
 * Takes a position and finds all the moves for black.
 * Returns: Object - A dictionary with moves and values of positions.
 */
function evaluateMoves(game){
    allLegalMoves = game.moves()
    var moveValues = {}
    for (var move of allLegalMoves){
        newChess = new Chess(game.fen())
        // console.log("The move is: " + move)
        newChess.move(move)
        moveValues[move] = evaluate(newChess)
    }
    return moveValues
}

/*
 * Finds all moves, sorts them from the best for black and returns the best move
 * Returns: String - A move for black
 */
function moveToMake(color, game){
    var moveValues = evaluateMoves(game)
    // Create items array
    var items = Object.keys(moveValues).map(function(key) {
        return [key, moveValues[key]];
    });
  
    // Sort the array based on the second element
    if (color === "black"){
        items.sort(function(first, second) {
            return first[1] - second[1];
        });
    }
    else {
        items.sort(function(first, second) {
            return second[1] - first[1];
        });
    }

    // console.log("Does this actually work?")
    console.log(items);
 
    return items[0][0]
}

function makeAMove(game){
    suggestedMove = minimax(game, "First Call", 0, true, "")[0]
    console.log("Returned move: " + suggestedMove)
    return suggestedMove
}

function minimax(game, thisMove, depth, color, thisLine){
    if (depth === MAX_DEPTH) {

        console.log("Depth reached, color: " + color + ", move: " + thisMove + ", thisLine: " + thisLine + ", eval: " + evaluate(game))
        return [thisMove, evaluate(game)]
    }
    possibleMoves = game.moves()
    // White's turn
    if (color == false){
        maxEval = ["Not A Move", -Infinity]
        for (move of possibleMoves){
            newChess = new Chess(game.fen())
            newChess.move(move)
            thisLine += " " + move
            eval = minimax(newChess, move, depth + 1, !color, thisLine)
            thisLine = ""
            // console.log("Depth: " + depth + ", this Move: " + thisMove + ", checking: " + move + ", result: " + eval + ", maxEval: " + maxEval + ", thisLine: " + thisLine)
            if (eval[1] > maxEval[1]){
                maxEval = eval    
            }
        }
        return maxEval
    }
    // Black's turn
    else {
        minEval = ["Not A Move", +Infinity]
        for (move of possibleMoves){
            newChess = new Chess(game.fen())
            newChess.move(move)
            thisLine += " " + move
            eval = minimax(newChess, move, depth + 1, !color, thisLine)
            thisLine = ""
            // console.log("Depth: " + depth + ", this Move: " + thisMove + ", checking: " + move + ", result: " + eval + ", minEval: " + minEval + ", thisLine: " + thisLine)
            if (eval[1] < minEval[1]){
                minEval = eval
            }
        }
        return minEval
    }

}

// TO-DO
// Evaluate position on more criteria (e.g. position of pieces on board)
// Look deeper in choosing moves