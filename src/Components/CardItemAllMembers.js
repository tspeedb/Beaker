import Card from '@mui/material/Card'

import CardMedia from '@mui/material/CardMedia'
// import Button from '@mui/material/Button'
// import { makeStyles } from '@material-ui/styles'
import '../Styles/Projectspage.css'

/*passing in properties from Cards*/

function CardItemAllMembers(props) {
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
                image={`${process.env.PUBLIC_URL}/projectImages/${props.image}`}
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
