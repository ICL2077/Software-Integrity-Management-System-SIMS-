import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';

import { DeviceCardStack } from '../DeviceCard/DeviceCardStack';
import Link from 'next/link';
import { memo } from 'react';

const DeviceCard = memo(
    ({
        id,
        os,
        hostname,
        user,
        department,
        ipAddress,

        height,
        width,
    }: {
        id: string;
        os: string | null;
        hostname: string;
        user: string | null;
        department: string | null;
        ipAddress: string | null;

        height?: string | number | null;
        width?: string | number | null;
    }) => {
        return (
            <Grid>
                <Card sx={{ maxWidth: width ? width : 345, maxHeight: height ? height : 345 }}>
                    <Link href={`/device/${id}`}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="../../../pc_jpeg_exmple.jpg"
                                alt="card photo"
                            />
                            <CardContent
                                sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {hostname}
                                </Typography>
                                <DeviceCardStack
                                    body="Операционная система"
                                    info={os ?? 'Не указано'}
                                />
                                <DeviceCardStack body="Работник" info={user ?? 'не указан(а)'} />
                                <DeviceCardStack body="Отдел" info={department ?? 'не указан'} />
                            </CardContent>
                        </CardActionArea>
                    </Link>
                </Card>
            </Grid>
        );
    },
);

DeviceCard.displayName = 'DeviceCard';

export { DeviceCard };
