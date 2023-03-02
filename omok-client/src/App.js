import { useState, useRef } from 'react';
import axios from 'axios';
import { NicknameContext } from './NicknameContext.js';
import Main from './Main.js';
import './bootstrap.min.css';

function App() {
  const [nickname, setNickname] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const errorDiv = useRef(null);

  if (!isSubmitted) {
    document.body.classList = "bg-secondary";
    return (
      <div className='card mx-auto mt-5 shadow' style={{ width: '25%' }}>
        <div className='card-header'>
          오목
        </div>
        <div className='card-body'>
          닉네임을 입력해주세요.
          <div className='alert alert-danger my-3' ref={errorDiv} style={{ display: 'none' }}>
          </div>
          <div className='mt-3'>
            <input type='text' name='nickname' value={nickname} onChange={e => setNickname(e.target.value)} />
          </div>
          <div className='mt-3'>
            <button type='submit' className='btn btn-primary' onClick={() => {
              axios.post('http://localhost:8080/user', { "nickname": nickname }, { withCredentials: true })
                .then(response => {
                  setIsSubmitted(true);
                }).catch(error => {
                  errorDiv.current.innerText = '서버와 연결 도중 에러가 발생했습니다.';
                  errorDiv.current.style.display = 'block';
                });
            }}>확인</button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <NicknameContext.Provider value={nickname}>
        <Main />
      </NicknameContext.Provider>
    );
  }
}

export default App;