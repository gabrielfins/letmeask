import { useState, FormEvent } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import googleIconImg from '../../assets/images/google-icon.svg';
import { Button } from '../../components/Button';
import { ThemeToggler } from '../../components/ThemeToggler';
import styles from '../../styles/modules/auth.module.scss';
import { database } from '../../services/firebase';

export default function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  }

  async function handleJoinRoom(e: FormEvent) {
    e.preventDefault();

    if (roomCode.trim() === '') return;

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exist.');
      return;
    }

    if (roomRef.val().endendAt) {
      alert('Room already closed.')
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id={styles['page-auth']}>
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&A</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className={styles['theme-toggler-container']}>
          <ThemeToggler />
        </div>
        <div className={styles['main-content']}>
          <img src={logoImg} alt="Letmeask" />
          <button className={styles['create-room']} onClick={handleCreateRoom}><img src={googleIconImg} alt="Logo do Google" />Crie sua sala com o Google</button>
          <div className={styles['separator']}>ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input type="text" placeholder="Digite o código da sala" onChange={e => setRoomCode(e.target.value)} value={roomCode} />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
