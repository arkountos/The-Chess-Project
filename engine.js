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

// Evaluates a position based only on material
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

// Chooses the move that wins more material (bad chess!)
function makeMove (game, board) {
    var possibleMoves = game.moves()
    var result = 1000
    var new_result = 0
    var best_move = 0
    if (possibleMoves.length === 0) return
    for (i = 0; i < possibleMoves.length; i++){
        new_move = game.move(possibleMoves[i]);
        new_result = evaluate(game);
        console.log(possibleMoves[i], " ", new_result)
        if (new_result < result){
            best_move = i
            console.log("In best move, best is: ", possibleMoves[i], " ", new_result, " ", i)
            result = new_result
        }
        game.undo();
    }
    //window.alert("here");
    game.move(possibleMoves[best_move]);
    //board.position(game.fen())
}

// TO-DO
// Evaluate position on more criteria (e.g. position of pieces on board)
// Look deeper in choosing moves

