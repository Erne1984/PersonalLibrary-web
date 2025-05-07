import { useState } from 'react';
import styles from './FormBook.module.css';
import useCreateBook from '../../hooks/useCreateBook';
import ModalDeleteButtonForm from '../ModalDeleteButtonForm/ModalDeleteButtonForm';

interface FormBookProps {
    onBookCreated?: () => void;
    bookChanged: () => void;
}

export default function FormBook(props: FormBookProps) {
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [dataPublicacao, setDataPublicacao] = useState('');
    const [disponivel, setDisponivel] = useState(true);
    const [horaCadastro, setHoraCadastro] = useState(new Date().toISOString());
    const [usuarioId] = useState<number>(1); // Placeholder for user ID

    const [modalShow, setModalShow] = useState(false);

    const toggleModal = () => {
        setModalShow(!modalShow);
    }

    const { handleCreateBook, loading, error, success } = useCreateBook();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const bookData = {
            titulo,
            autor,
            dataPublicacao,
            disponivel,
            horaCadastro,
            usuarioId, // Placeholder for user ID
        };

        await handleCreateBook(bookData);

        setTitulo('');
        setAutor('');
        setDataPublicacao('');
        setDisponivel(true);
        setHoraCadastro(new Date().toISOString());

        props.onBookCreated?.();
    };

    return (
        <>
            <div className={styles["form-book-container"]}>
                <h1>Criar Livro</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles["form-group"]}>
                        <label htmlFor="titulo">Título:</label>
                        <input
                            type="text"
                            id="titulo"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles["form-group"]}>
                        <label htmlFor="autor">Autor:</label>
                        <input
                            type="text"
                            id="autor"
                            value={autor}
                            onChange={(e) => setAutor(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles["form-group"]}>
                        <label htmlFor="dataPublicacao">Data de Publicação:</label>
                        <input
                            type="date"
                            id="dataPublicacao"
                            value={dataPublicacao}
                            onChange={(e) => setDataPublicacao(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles["form-checkbox"]}>
                        <label htmlFor="disponivel">Disponível:</label>
                        <input
                            type="checkbox"
                            id="disponivel"
                            checked={disponivel}
                            onChange={() => setDisponivel(!disponivel)}
                        />
                    </div>

                    <div className={styles["form-group"]}>
                        <label htmlFor="horaCadastro">Hora de Cadastro:</label>
                        <input
                            type="datetime-local"
                            id="horaCadastro"
                            value={horaCadastro}
                            onChange={(e) => setHoraCadastro(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles["form-actions"]}>
                        <button type="submit" disabled={loading}>Gravar</button>
                        <button type="button" onClick={toggleModal}>Apagar</button>
                    </div>
                </form>

                {loading && <p>Carregando...</p>}
                {error && <p style={{ color: 'red' }}>Erro: {error.message}</p>}
                {success && <p style={{ color: 'green' }}>Livro criado com sucesso!</p>}
            </div>

            <ModalDeleteButtonForm modalShow={modalShow} onCloseModal={toggleModal} onDeleted={props.bookChanged}/>

        </>
    );
}
