import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@material-ui/styles'

import CardMedia from '@mui/material/CardMedia'
// import Button from '@mui/material/Button'
// import { makeStyles } from '@material-ui/styles'
import '../Styles/Projectspage.css'

/*passing in properties from Cards*/
const useStyles = makeStyles({
    hover: {
        positon: 'relative',
        overflow: 'hidden',
        '&:hover': {
            backgroundColor: 'black',
            '& p': {
                visibility: 'visible',
            },
        },
    },
})

function CardItemAllMembers(props) {
    const classes = useStyles()
    return (
        <Card sx={{ width: 200, borderRadius: '50%' }}>
            <CardMedia
                className={classes.hover}
                onMouseEnter={props.handleMouseEnter}
                id={props.id}
                style={{
                    paddingTop: '0',
                    borderRadius: '50%',
                }}
                component="img"
                height="200"
                image={props.image}
                alt={props.year}
            ></CardMedia>
        </Card>
    )
}

export default CardItemAllMembers
