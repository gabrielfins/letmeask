import { useState, FormEvent } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { NavLink, useHistory } from 'react-router-dom';
import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import styles from '../../styles/auth.module.scss';
import { Button } from '../../components/Button';
import { database } from '../../services/firebase';

export default function NewRoom() {
    const { user } = useAuth();
    const history = useHistory();

    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(e: FormEvent) {
        e.preventDefault();

        if (newRoom.trim() === '') return;
        
        const roomRef = database.ref('rooms');
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        });

        history.push(`/admin/rooms/${firebaseRoom.key}`);
    }

    return (
        <div id={styles['page-auth']}>
            <aside>
                <img src={ illustrationImg } alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&A</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className={styles['main-content']}>
                    <img src={ logoImg } alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={ handleCreateRoom }>
                        <input type="text" placeholder="Nome da sala" onChange={ e => setNewRoom(e.target.value) } value={ newRoom } />
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <NavLink to="/">Clique aqui</NavLink></p>
                </div>
            </main>
        </div>
    );
}