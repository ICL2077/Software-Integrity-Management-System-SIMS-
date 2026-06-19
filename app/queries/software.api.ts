import { Software } from '@/generated/prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetSoftware = (search: string) => {
    return useQuery({
        queryKey: ['software', search],
        queryFn: async () => {
            const { data } = await axios.get('/api/software', { params: { search: search } });
            return data;
        },
    });
};

export const useGetSoftwareById = (id: string) => {
    return useQuery({
        queryKey: ['software', id],
        queryFn: async () => {
            const { data } = await axios.get(`/api/software/${id}`);
            return data;
        },
    });
};

export const usePostSoftware = () => {
    return useMutation<Software, Error, FormData>({
        mutationKey: ['addSoftware'],
    });
};
