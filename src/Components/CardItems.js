import * as React from 'react'
import Card from '@mui/material/Card'
// import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
// import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
// import { makeStyles } from '@material-ui/styles'
import '../Styles/Projectspage.css'

/*passing in properties from Cards*/

function CardItems({ project }) {
    return (
        <Card sx={{ maxWidth: 300 }}>
            <CardMedia
                style={{ paddingTop: 0 }}
                component="img"
                height="200"
                image={`${process.env.PUBLIC_URL}/projectImages/${project.image}`}
                alt={project.title}
            >
                {/* {props.image} */}
            </CardMedia>
            <CardContent className="content">
                <Typography id="title-project">{project.title}</Typography>
                {project.isPaid && (
                    <MonetizationOnIcon
                        style={{ color: '#107fb7' }}
                    ></MonetizationOnIcon>
                )}
                <Typography id="desc">{project.description}</Typography>
            </CardContent>
        </Card>
    )
}

export default CardItems
