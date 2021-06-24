import { useParams, useHistory } from 'react-router-dom';
import { useRoom } from '../../hooks/useRoom';
import logoImg from '../../assets/images/logo.svg';
import deleteImg from '../../assets/images/delete.svg';
import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';
import styles from '../../styles/room.module.scss';
import { database } from '../../services/firebase';

type RoomParams = {
    id: string;
}

export default function AdminRoom() {
    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const {questions, title} = useRoom(roomId);

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endendAt: new Date()
        });

        history.push('/');
    }

    return (
        <div id={styles['page-room']}>
            <header>
                <div className={styles['content']}>
                    <img src={ logoImg } alt="Letmeask" />
                    <div>
                        <RoomCode code={ roomId } />
                        <Button outlined onClick={handleEndRoom}>Encerrar Sala</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className={styles['room-title']}>
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} pergunta{questions.length > 1 && 's'}</span> }
                </div>
                <div className={styles['question-list']}>
                    {questions.map(question => {
                        return (
                            <Question key={question.id} content={question.content} author={question.author}>
                                <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                                    <img src={ deleteImg } alt="Remover pergunta" />
                                </button>
                            </Question>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}