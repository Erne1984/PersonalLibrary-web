import api from "../config/api";

export interface BookFormData {
    titulo: string;
    autor: string;
    // FORMATO YYYY-MM-DD
    dataPublicacao: string;
    disponivel: boolean;
    // FORMATO YYYY-MM-DDTHH:mm:ss.sssZ
    horaCadastro: string;
    usuarioId: number;
}

export const createBook = async ( data: BookFormData ) => {
    const response = await api.post('/books', data);

    return response.data;
}

export const getAllBooks = async () => {
    const response = await api.get('/books');

    return response.data;
}

export const deleteBook = async ( id: number ) => {
    const response = await api.delete(`/books/${id}`);

    return response.data;
}