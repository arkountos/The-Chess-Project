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

console.log(points.get('rgook'))

