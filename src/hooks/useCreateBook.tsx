import { useState } from "react";
import { createBook, type BookFormData } from "../services/BookService";

export default function useCreateBook() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const [success, setSuccess] = useState(false);

    const handleCreateBook = async (bookData: BookFormData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await createBook(bookData);
            setSuccess(true);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { handleCreateBook, loading, error, success };
}