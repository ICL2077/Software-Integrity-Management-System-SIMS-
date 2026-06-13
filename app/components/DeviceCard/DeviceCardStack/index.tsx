import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

export const DeviceCardStack = ({ body, info }: { body: string; info: string | string[] }) => {
    return (
        <Stack direction="row" spacing={1}>
            <Typography variant="body2" sx={{ color: 'text.secondary', flex: 'auto' }}>
                {body}:
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {Array.isArray(info) ? info.join(', ') : info}
            </Typography>
        </Stack>
    );
};
