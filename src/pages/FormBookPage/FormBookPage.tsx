import { useState } from 'react';
import FormBook from '../../components/FormBook/FormBook';
import styles from './FormBookPage.module.css';
import useGetAllBooks from '../../hooks/useGetAllBooks';
import BookCard from '../../components/BookCard/BookCard';

export default function FormBookPage() {
    const [refreshKey, setRefreshKey] = useState(0);

    const { books } = useGetAllBooks(refreshKey);

    const handleBooksFetched = () => setRefreshKey(prev => prev + 1);

    return (
        <div className={styles["form-book-page-container"]}>

            <FormBook onBookCreated={handleBooksFetched}></FormBook>

            <div className={styles["form-book-page-list"]}>

                <h2>Lista de Livros</h2>

                {books.map((book) => (
                    <BookCard
                        key={book.id}
                        id={book.id}
                        title={book.titulo}
                        author={book.autor}
                        publicationDate={book.dataPublicacao}
                        status={book.disponivel}
                    />
                ))}

            </div>

        </div>
    );
}