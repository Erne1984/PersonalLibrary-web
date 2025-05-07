import { useEffect, useState } from "react";
import { getAllBooks } from "../services/BookService";


export default function useGetAllBooks(refreshKey: number) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const [books, setBooks] = useState<any[]>([]);

    const fetchtAllBooks = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getAllBooks();
            setBooks(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchtAllBooks();
    }, [refreshKey]);

    return { fetchtAllBooks, loading, error, books };
}