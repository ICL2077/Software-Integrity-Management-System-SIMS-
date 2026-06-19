import { Device } from '@/generated/prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetDevices = (search: string) => {
    return useQuery({
        queryKey: ['devices', search],
        queryFn: async () => {
            const { data } = await axios.get('/api/devices', { params: { search: search } });
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

export const usePostDevice = () => {
    return useMutation<Device, Error, FormData>({
        mutationKey: ['addDevice'],
    });
};
