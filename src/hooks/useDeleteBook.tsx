import { useState } from "react";
import { deleteBook as deleteBookService } from "../services/BookService";

export default function useDeleteBook() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const deleteBook = async (bookId: number): Promise<any> => {
        setLoading(true);
        setError(null);

        try {
            const response = await deleteBookService(bookId);
            return response;
        } catch (err: any) {
            setError(err);
            throw err; 
        } finally {
            setLoading(false);
        }
    };

    return { deleteBook, loading, error };
}