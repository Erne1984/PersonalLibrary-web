import styles from './BookCard.module.css';

interface BookCardProps {
    id: number;
    title: string;
    author: string;
    publicationDate: string;
    status: boolean;
}

export default function BookCard(props: BookCardProps) {
    const { id, title, author, publicationDate, status } = props;

    return (
        <div className={styles.bookCard}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.info}>Autor: {author}</p>
            <p className={styles.info}>Data de Publicação: {publicationDate}</p>
            <p className={styles.info}>
                Status: <span className={status ? styles.available : styles.unavailable}>
                    {status ? 'Disponível' : 'Indisponível'}
                </span>
            </p>
        </div>
    );
}