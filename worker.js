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