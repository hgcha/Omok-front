import { useState, useRef } from 'react';
import { NicknameContext } from './NicknameContext.js';
import Main from './Main.js';
import './bootstrap.min.css';
import { mainServerConnection, connectToMainServer } from './network.js';
import Board from './Board.js';

function App() {

  const [nickname, setNickname] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [gameIndex, setGameIndex] = useState(null);

  const errorDiv = useRef(null);

  if (!isLogin) {
    document.body.classList = "bg-secondary";
    return (
      <div className='card mx-auto mt-5 shadow' style={{ width: '25%' }}>
        <div className='card-header'>
          오목
        </div>
        <div className='card-body'>
          닉네임을 입력해주세요.
          <div className='alert alert-danger my-3' ref={errorDiv} style={{ display: 'none' }}>
            서버와의 연결 도중 에러가 발생했습니다.
          </div>
          <div className='mt-3'>
            <input type='text' name='nickname' value={nickname} onChange={e => setNickname(e.target.value)} />
          </div>
          <div className='mt-3'>
            <button type='submit' className='btn btn-primary' onClick={() => {
              connectToMainServer();
              mainServerConnection.onopen = () => {
                mainServerConnection.send(JSON.stringify({ type: "LOGIN", nickname: nickname }));
                setIsLogin(true);
              };
              mainServerConnection.onerror = () => {
                errorDiv.current.style.display = 'block';
              };
            }}>
              확인
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    if (gameIndex === null) {
      return (
        <NicknameContext.Provider value={nickname}>
          <Main setGameIndex={setGameIndex} />
        </NicknameContext.Provider>
      );
    } else {
      return (
        <NicknameContext.Provider value={nickname}>
          <div style={{
            position: 'absolute',
            top: '50px',
            left: '250px'
          }}>
            <Board gameIndex={gameIndex} setGameIndex={setGameIndex} />
          </div>
        </NicknameContext.Provider>
      );
    }
  }
}

export default App;