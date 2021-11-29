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
                className="member-image"
                onMouseEnter={props.handleMouseEnter}
                id={props.id}
                style={{
                    paddingTop: '0',
                    borderRadius: '50%',
                }}
                component="img"
                height="200"
                image={`${process.env.PUBLIC_URL}/projectImages/${props.image}`} //this needs to be changed so its coming from firbase
                alt={props.name_year}
            >
                {/* {props.image} */}
            </CardMedia>
            {/* <CardContent>
                <Typography>{props.name_year}</Typography>
                <Typography>{props.bio}</Typography>
            </CardContent> */}
        </Card>
    )
}

export default CardItemAllMembers
