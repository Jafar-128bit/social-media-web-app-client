import {useState} from 'react';
import axios, {AxiosRequestConfig, AxiosError} from 'axios'; // Import axios and types

// Define the custom hook with two generic types:
// T for the response data type, D for the request data type
function useAPI<T = unknown, D = unknown>() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<T | null>(null);

    const fetchData = async (
        url: string,
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
        data: D,
        config?: AxiosRequestConfig
    ) => {
        setLoading(true);
        setError(null);

        try {
            const result = await axios.request<T>({
                url,
                method,
                data,
                headers: {
                    'Content-Type': 'application/json',
                    ...config?.headers, // Merge custom headers from config, if any
                },
                ...config,  // Other Axios config (e.g., params)
            });
            setResponse(result.data);  // Set the response data
        } catch (err) {
            const axiosError = err as AxiosError;
            setError(axiosError.message || "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, response, fetchData };
}

export default useAPI;
