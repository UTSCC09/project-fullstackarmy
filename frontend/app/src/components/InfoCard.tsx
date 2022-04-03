// Adapted from:
// https://codesandbox.io/s/1g759x?file=/demo.tsx
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface Props {
  img: string,  
  title: string,
  body: string,
}

const InfoCard: React.FC<Props> = ({img, title, body}) => {
  return (
    <Card sx={{ width: 500 , margin: 15}}>
      <CardMedia
        component="img"
        height="140"
        image={img}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {body}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default InfoCard

