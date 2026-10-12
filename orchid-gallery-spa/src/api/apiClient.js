import axios from 'axios';
export const apiClient = axios.create({ timeout: 5000, headers: { Accept: 'application/json' } });
// src/api/orchidService.axios.example.js
import { apiClient } from './apiClient';
export async function getOrchidsByAxios() {
    const response = await apiClient.get('/orchids.json');
    return response.data;
}