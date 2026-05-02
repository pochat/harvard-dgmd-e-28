import RandomPlayerNumber from './RandomPlayerNumber'
import { useState, useEffect } from 'react';

function Board() {

    const [ player1Number, setPlayer1Number ] = useState(0);
    const [ player2Number, setPlayer2Number ] = useState(0);
    const [ winner, setWinner ] = useState('');

    // let numberPlayer1 = 1;
    // let numberPlayer2 = 2;

    let result = RandomPlayerNumber(50);

    useEffect(() => {

        if(player1Number > player2Number) {
            setWinner('Player 1 wins')
        } else if (player1Number < player2Number ) {
            setWinner('Player 2 wins')
        } else {
            setWinner('It is a tie')
        }
    }, [player1Number, player2Number])

    return(

        <>

            <h1>Hello Board</h1>

            <div className="numbers">

                    <div>
                        Player 1: {player1Number}
                    </div>
                    <div>
                        Player 2: {player2Number}
                    </div>

                    <button onClick={
                        () =>
                    { 
                        setPlayer1Number(RandomPlayerNumber(50));
                        setPlayer2Number(RandomPlayerNumber(50));
                    }
                    }>
                    Press me
                    </button>

                    <div>
                        { winner }
                    </div>

            </div>
        
        </>
    )
}


function MyApp() {

    
    return(
        
        <>
            <Board />
        </>
    )
}

export default MyApp