import copyImg from '../../assets/images/copy.svg';
import styles from './styles.module.scss';
import toast from 'react-hot-toast';

type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps) {
    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(props.code);
        toast.success('Copiado com sucesso!');
    }

    return (
        <button className={styles['room-code']} onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={ copyImg } alt="Copiar room code" />
            </div>
            <span>Sala #{props.code}</span>
        </button>
    );
}