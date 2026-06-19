import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function appMutations(queryClient: QueryClient) {
    queryClient.setMutationDefaults(['addDevice'], {
        mutationFn: async (formData) => {
            const { data } = await axios.post('/api/devices', formData);

            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['devices'] });
        },
    });
    queryClient.setMutationDefaults(['addSoftware'], {
        mutationFn: async (formData) => {
            const { data } = await axios.post('/api/software', formData);

            return data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['software'] });
        },
    });
}
