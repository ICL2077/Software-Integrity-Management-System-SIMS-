import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetDevices = () => {
    return useQuery({
        queryKey: ['devices'],
        queryFn: async () => {
            const { data } = await axios.get('/api/devices');
            return data;
        },
    });
};

export const useGetDeviceById = (id: string) => {
    return useQuery({
        queryKey: ['devices', id],
        queryFn: async () => {
            const { data } = await axios.get(`/api/devices/${id}`);
            return data;
        },
    });
};
