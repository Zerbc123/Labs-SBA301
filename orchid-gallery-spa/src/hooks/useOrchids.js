import { useCallback, useEffect, useState } from 'react';
import orchidService from '../api/orchidService';
// import { getOrchidsByAxios } from '../api/orchidService.axios.example';


// export default function useOrchids() {
//     const [orchids, setOrchids] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const loadOrchids = useCallback(async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const data = await orchidService.getOrchids();
//             setOrchids(data);
//         } catch (err) {
//             setError(err instanceof Error ? err.message : 'Không thể tải danh sách Orchids');
//         } finally {
//             setLoading(false);
//         }
//     }, []);
//     useEffect(() => {
//         loadOrchids();
//     }, [loadOrchids]);
//     return { orchids, loading, error, reload: loadOrchids };
// }

// FETCH + CACHE

export default function useOrchids() {
    const [orchids, setOrchids] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const loadOrchids = useCallback(async (force = false) => {
        setLoading(true);
        setError(null);
        try {
            const data = await orchidService.getOrchids({ force });
            // const data = await getOrchidsByAxios({ force });
            setOrchids(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Không thể tải danh sách Orchids');
        } finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        loadOrchids();
    }, [loadOrchids]);
    return { orchids, loading, error, reload: loadOrchids };
}