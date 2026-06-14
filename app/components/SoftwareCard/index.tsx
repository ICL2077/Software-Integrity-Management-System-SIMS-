import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Link from 'next/link';
import Grid from '@mui/material/Grid';

export default function SoftwareCard({ id, name }: { id: string; name: string }) {
    return (
        <Grid>
            <Card sx={{ maxWidth: 345 }}>
                <Link href={`/programs/${id}`}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image="../../../softWare.png"
                            alt="card photo"
                        />
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <Typography gutterBottom variant="h5" component="div">
                                {name}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
        </Grid>
    );
}
