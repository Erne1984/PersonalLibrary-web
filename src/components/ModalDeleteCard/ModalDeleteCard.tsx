import styles from "./ModalDeleteCard.module.css";
import { useEffect, useRef } from "react";
import useDeleteBook from "../../hooks/useDeleteBook";

interface ModalDeleteCardProps {
    bookId: number;
    bookTitle: string;
    modalShow: boolean;
    onCloseModal: () => void;
    onDeleted: () => void;
}

export default function ModalDeleteCard(props: ModalDeleteCardProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { deleteBook, loading, error } = useDeleteBook();

    useEffect(() => {
        const dialog = dialogRef.current;
        if (props.modalShow) {
            dialog?.showModal();
            dialog?.focus();
        } else {
            dialog?.close();
        }
    }, [props.modalShow]);

    const handleDelete = async () => {
        try {
            await deleteBook(props.bookId);
            dialogRef.current?.close();
            props.onCloseModal();
            props.onDeleted?.();
        } catch (err) {
            console.error("Erro ao excluir o livro:", err);
        }
    };

    return (
        <dialog className={styles["modal-delete-card-container"]} ref={dialogRef}>
            <div className={styles["modal-delete-card-content"]}>
                <h2>Excluir Livro</h2>
                <p>Você tem certeza que deseja excluir {props.bookTitle}?</p>
                <div className={styles["modal-delete-card-actions"]}>
                    <button
                        className={styles["modal-delete-card-button"]}
                        onClick={props.onCloseModal}
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                    <button
                        className={styles["modal-delete-card-button"]}
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading ? "Excluindo..." : "Excluir"}
                    </button>
                </div>
                {error && <p style={{ color: "red" }}>Erro: {error.message}</p>}
            </div>
        </dialog>
    );
}