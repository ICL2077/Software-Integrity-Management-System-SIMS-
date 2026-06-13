import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';

import { DeviceCardStack } from '../DeviceCard/DeviceCardStack';
import Link from 'next/link';

export const DeviceCard = ({
    id,
    os,
    hostname,
    user,
    department,
    ipAddress,
}: {
    id: string;
    os: string | null;
    hostname: string;
    user: string | null;
    department: string | null;
    ipAddress: string | null;
}) => {
    return (
        <Grid>
            <Card sx={{ maxWidth: 345 }}>
                <Link href={`/device/${id}`}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image="../../../pc_jpeg_exmple.jpg"
                            alt="card photo"
                        />
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
};
