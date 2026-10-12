// import { OrchidsData } from '../shared/ListOfOrchids';

// const orchidService = {
//     async getOrchids() {
//         await new Promise((resolve) => setTimeout(resolve, 700));
//         return OrchidsData;
//     },
//     async getOrchidById(id) {
//         await new Promise((resolve) => setTimeout(resolve, 300));
//         const orchid = OrchidsData.find((item) => item.id === String(id));
//         if (!orchid) throw new Error('Không tìm thấy Orchid');
//         return orchid;
//     }
// };
// export default orchidService;

// // src/api/orchidService.js – PHIÊN BẢN B: FETCH
// const orchidService = {
//     async getOrchids() {
//         const response = await fetch('/orchids.json', { headers: { Accept: 'application/json' } });
//         if (!response.ok) throw new Error(`HTTP ${response.status}: Không thể tải orchids.json`);
//         return response.json();
//     }
// }

// export default orchidService;

// src/api/orchidService.js – FETCH + CACHE
let orchidCache = null;
let cacheTime = 0;
const CACHE_DURATION = 30_000;
async function fetchOrchids() {
    const response = await fetch('/orchids.json', { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`HTTP ${response.status}: Không thể tải orchids.json`);
    return response.json();
}
const orchidService = {
    async getOrchids({ force = false } = {}) {
        const now = Date.now();
        console.log('orchidCache:', orchidCache);
        const validCache = orchidCache && (now - cacheTime < CACHE_DURATION);
        console.log('validCache:', validCache);
        console.log('force', force)
        if (!force && validCache) return orchidCache;
        console.log('Fetching orchids...');
        const data = await fetchOrchids();
        orchidCache = data;
        cacheTime = now;
        return data;
    },
    clearCache() { orchidCache = null; cacheTime = 0; console.log('Cleared cache') }
};
export default orchidService;