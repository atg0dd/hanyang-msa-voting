import { useEffect, useState } from "react";

/*
    Custom React Hook called useApi. 

    It's purpose is to handle data fetching asynchronously
    while managing data, error, and loading states,
    as well as preventing memory leaks when components unmount.
*/
export function useApi(fetchFn, deps = []) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError(null);

        fetchFn().then((result) => {
            if (!cancelled) setData(result);
        }).catch((err) => {
            if (!cancelled) setError(err);
        }).finally(() => {
            if (!cancelled) setLoading(false);
        });
        
        return () => {
            cancelled = true;
        };
    }, deps);

    return { data, error, loading }
}