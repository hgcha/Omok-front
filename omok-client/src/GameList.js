import { connectToGameServer } from './network';
import './bootstrap.min.css';

export default function GameList({ gameList, setIsPlayingGame, setGameIndex }) {
        
    function handleClick(index) {
        console.log(index);
        setGameIndex(index);
    }

    return (
        <div className='card'>
            <ul>
                {gameList.map(game => {
                    if(game !== null)
                        return (
                            <li>
                                <button className='card-body' onClick={() => handleClick(game.index)}>
                                    Title: ���� {game.index + 1}�� �� <br/>
                                    Players: {game.players}
                                </button>
                            </li>
                        );
                    else {
                        return null;
                    }
                })}
            </ul>
        </div>
    );
}