import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@material-ui/styles'

import CardMedia from '@mui/material/CardMedia'
// import Button from '@mui/material/Button'
// import { makeStyles } from '@material-ui/styles'
import '../Styles/Projectspage.css'
import { rgbToHex } from '@material-ui/core'

/*passing in properties from Cards*/
const useStyles = makeStyles({
    hover: {
        background: 'rgba(76, 175, 80, 0.3)',
    },
})

function CardItemAllMembers(props) {
    const [show, setShow] = useState(false)
    // const [hovered, setHovered] = useState(null)

    const handleMouseEnter = (e) => {
        setShow(true)
        // setHovered(e.target.id)
        console.log(handleMouseEnter)
    }
    const handleMouseLeave = (e) => {
        setShow(false)
        // setHovered(e.target.id)
        console.log(handleMouseLeave)
    }
    const classes = useStyles()
    return (
        <Card
            sx={{
                width: 200,
                borderRadius: '50%',
                position: 'relative',
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <CardMedia
                id={props.id}
                style={
                    show
                        ? {
                              paddingTop: '0',
                              borderRadius: '50%',
                              opacity: 0.5,
                              transition: '.2s ease',
                          }
                        : { paddingTop: '0', borderRadius: '50%' }
                }
                component="img"
                height="200"
                image={props.image}
                alt="image"
            ></CardMedia>

            {show && (
                <CardContent
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',

                        borderRadius: '100%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    {' '}
                    <Typography
                        style={{
                            fontSize: '25px',
                            wordSpacing: 'normal',
                            color: 'white',
                        }}
                    >
                        {props.first}

                        {props.last}
                    </Typography>
                    <Typography style={{ textAlign: 'center' }}>
                        {props.year}
                    </Typography>
                    <Typography style={{ textAlign: 'center' }}>
                        Majoring in {props.major}
                    </Typography>
                </CardContent>
            )}
        </Card>
    )
}

export default CardItemAllMembers
