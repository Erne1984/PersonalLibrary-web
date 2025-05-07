import { useState } from 'react';
import styles from './BookCard.module.css';
import ModalDeleteCard from '../ModalDelete/ModalDeleteCard';

interface BookCardProps {
    id: number;
    title: string;
    author: string;
    publicationDate: string;
    status: boolean;
    bookChanged: () => void;
}

export default function BookCard(props: BookCardProps) {
    const { id, title, author, publicationDate, status } = props;
    const [modalShow, setModalShow] = useState(false);


    const toggleModal = () => {
        setModalShow(!modalShow);
    }


    return (
        <>
            <ModalDeleteCard bookId={id} bookTitle={title} modalShow={modalShow} onCloseModal={toggleModal} onDeleted={props.bookChanged} />
            <div className={styles.bookCard} onClick={toggleModal}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.info}>Autor: {author}</p>
                <p className={styles.info}>Data de Publicação: {publicationDate}</p>
                <p className={styles.info}>
                    Status: <span className={status ? styles.available : styles.unavailable}>
                        {status ? 'Disponível' : 'Indisponível'}
                    </span>
                </p>
            </div>
        </>
    );
}