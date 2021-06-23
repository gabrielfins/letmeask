//import { useAuth } from '../../hooks/useAuth';
import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import styles from '../../styles/auth.module.scss';
import { Button } from '../../components/Button';
import { NavLink } from 'react-router-dom';

export default function NewRoom() {
    //const { user } = useAuth();

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
                    <form action="">
                        <input type="text" placeholder="Nome da sala" />
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <NavLink to="/">Clique aqui</NavLink></p>
                </div>
            </main>
        </div>
    );
}