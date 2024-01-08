// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

// project import
import { gridSpacing } from 'store/constant';
import { getImageUrl, ImagePath } from 'utils/getImageUrl';

// assets
import DownloadForOfflineTwoToneIcon from '@mui/icons-material/DownloadForOfflineTwoTone';

// ==============================|| ATTACHMENT CARD ||============================== //

interface AttachmentCardProps {
    title: string;
    image: string;
}

const AttachmentCard = ({ title, image }: AttachmentCardProps) => {
    const theme = useTheme();

    return (
        <Card sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.dark' : 'grey.100' }}>
            <CardMedia component="img" image={image && getImageUrl(`${image}`, ImagePath.PROFILE)} title="Slider5 image" />
            <CardContent sx={{ p: 2, pb: '16px !important' }}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs zeroMinWidth>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                        >
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <DownloadForOfflineTwoToneIcon sx={{ cursor: 'pointer' }} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default AttachmentCard;
