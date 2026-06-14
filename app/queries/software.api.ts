import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetSoftware = () => {
    return useQuery({
        queryKey: ['software'],
        queryFn: async () => {
            const { data } = await axios.get('/api/software');
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
