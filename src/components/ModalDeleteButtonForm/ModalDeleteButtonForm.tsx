import { useEffect, useRef, useState } from 'react';
import styles from './ModalDeleteButtonForm.module.css';
import useDeleteBook from '../../hooks/useDeleteBook';

interface ModalDeleteCardProps {
    modalShow: boolean;
    onCloseModal: () => void;
    onDeleted: () => void;
}

export default function ModalDeleteButtonForm(props: ModalDeleteCardProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { deleteBook, loading, error } = useDeleteBook();
    const [bookId, setBookId] = useState<number | ''>('');

    useEffect(() => {
        const dialog = dialogRef.current;
        if (props.modalShow) {
            dialog?.showModal();
            dialog?.focus();
        } else {
            dialog?.close();
            setBookId('');
        }
    }, [props.modalShow]);

    const handleDelete = async () => {
        if (bookId === '') return;
        try {
            await deleteBook(Number(bookId));
            props.onDeleted();
            props.onCloseModal();
        } catch (err) {
            console.error('Erro ao excluir livro:', err);
        }
    };

    return (
        <dialog className={styles["modal-delete-button-container"]} ref={dialogRef}>
            <h2>Excluir Livro</h2>
            <p>Insira o ID do livro que deseja excluir:</p>

            <input
                type="number"
                value={bookId}
                onChange={(e) => setBookId(e.target.value === '' ? '' : parseInt(e.target.value))}
                className={styles["delete-input"]}
                placeholder="ID do livro"
            />

            <div className={styles["actions"]}>
                <button
                    onClick={handleDelete}
                    disabled={loading || bookId === ''}
                    className={styles["btn-danger"]}
                >
                    {loading ? 'Excluindo...' : 'Excluir'}
                </button>

                <button
                    onClick={props.onCloseModal}
                    disabled={loading}
                    className={styles["btn-secondary"]}
                >
                    Cancelar
                </button>
            </div>

            {error && <p className={styles["error-message"]}>Erro: {error.message}</p>}
        </dialog>
    );
}
