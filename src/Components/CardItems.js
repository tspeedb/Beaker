import * as React from 'react'
import Card from '@mui/material/Card'
// import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
// import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@material-ui/styles'

/*passing in properties from Cards*/
const useStyles = makeStyles({
    height: {
        height: 140,
    },
})

function CardItems(props) {
    const classes = useStyles()
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                classname={classes.height}
                component="img"
                height="140"
                image="/Images/test.jpg"
                alt="green iguana"
            >
                {/* {props.image} */}
            </CardMedia>
            <CardContent>
                <Typography>{props.title}</Typography>
                <Typography>{props.description}</Typography>
            </CardContent>
        </Card>
    )
}

export default CardItems
