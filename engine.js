/* 
 * My Chess Engine Attempt
 * TODO:
 * - Parallelize!
 * - Improve the Evaluation function with heuristics
 * - Introduce an opening book and a tablebase for endgames
 * - Move ordering to speed up alpha-beta
 *
 */


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

depth = 3

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

function makeBestMove(game) {
    let bestMove = minimaxRoot(game, depth, true);
    return bestMove
}

const minimaxRoot = function(game, depth, maximisingPlayer) {
    var bestMove = -Infinity;
    var bestMoveFound;

    var t0 = performance.now()
 
    // Can we parallelize this loop?
    for (var i = 0; i < game.moves().length; i++) {
      game.move(game.moves()[i]);
      var value = minimax(
        game,
        depth - 1,
        -Infinity,
        Infinity,
        !maximisingPlayer
      );
      game.undo();
      if (value >= bestMove) {
        bestMove = value;
        bestMoveFound = game.moves()[i];
      }
    }
    console.log("bestMoveFound: " + bestMoveFound)
    var t1 = performance.now()
    console.log("Time taken: " + (t1 - t0) + ", moves evaluated: " + game.moves().length)
    return bestMoveFound;
  };
  
  function minimax(position, depth, alpha, beta, maximisingPlayer) {
    if (depth === 0) {
      return -evaluate(position);
    }
    if (maximisingPlayer) {
      let value = -Infinity;
      for (let i = 0; i < position.moves().length; i++) {
        position.move(position.moves()[i]);
        value = Math.max(value, minimax(position, depth - 1, alpha, beta, false));
        position.undo();
        alpha = Math.max(alpha, value);
        if (alpha >= beta) {
          return value;
        }
      }
  
      return value;
    } else {
      let value = Infinity;
      for (let i = 0; i < position.moves().length; i++) {
        position.move(game.moves()[i]);
        value = Math.min(value, minimax(position, depth - 1, alpha, beta, true));
        position.undo();
        beta = Math.min(beta, value);
        if (alpha >= beta) {
          return value;
        }
      }
      return value;
    }
  }


  
// TO-DO
// Evaluate position on more criteria (e.g. position of pieces on board)