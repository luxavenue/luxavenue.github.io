// src/components/ProtectedPage.tsx

import React, { useState, useEffect } from 'react';
import sha256 from 'crypto-js/sha256';

type ProtectedPageProps = {
  children: React.ReactNode;
};

// ✔️ 지정할 아이디와 해시된 비밀번호
const STORED_ID = 'admin';
// SHA256('luxavenue') = 3787e94b455442b109e5490f23d3d5b99120f8280acc5b93eb64a50f3ed1af93
const STORED_HASH = '3787e94b455442b109e5490f23d3d5b99120f8280acc5b93eb64a50f3ed1af93';

const ProtectedPage: React.FC<ProtectedPageProps> = ({ children }) => {
  const [entered, setEntered] = useState(false);
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('eunsu-auth');
    if (token === 'true') setEntered(true);
  }, []);

  const handleLogin = () => {
    const hashedPw = sha256(inputPw).toString();
    if (inputId === STORED_ID && hashedPw === STORED_HASH) {
      localStorage.setItem('eunsu-auth', 'true');
      setEntered(true);
    } else {
      setError('아이디 또는 비밀번호가 틀렸습니다.');
    }
  };

  if (entered) return <>{children}</>;

  return (
    <div style={styles.container}>
      <h2 style={styles.logo}>EUNSU</h2>
      <p style={styles.subtitle}>작업실로 오신 것을 환영합니다</p>

      <input
        type="text"
        placeholder="아이디"
        value={inputId}
        onChange={(e) => setInputId(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={inputPw}
        onChange={(e) => setInputPw(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleLogin} style={styles.button}>로그인</button>

      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

export default ProtectedPage;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 400,
    width: '90%',
    margin: '100px auto',
    padding: 24,
    border: '1px solid #ccc',
    borderRadius: 12,
    background: '#fff',
    boxShadow: '0 0 10px rgba(0,0,0,0.08)',
    textAlign: 'center',
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#303846',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 24,
    color: '#666',
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    borderRadius: 8,
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: 12,
    backgroundColor: '#303846',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
  },
  error: {
    marginTop: 10,
    fontSize: 13,
    color: 'red',
  },
};