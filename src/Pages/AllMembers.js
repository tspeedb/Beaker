import React, { useState, useEffect } from 'react'
import AllMembersCards from '../Components/AllMembersCards'
import Layout from '../Components/Layout'
import { Typography } from '@material-ui/core'
// import members from '../membersdata'
import { makeStyles } from '@material-ui/styles'
//import { Link } from 'react-router-dom'

const useStyles = makeStyles({
    title: { textAlign: 'left' },
    mainTitle: { textAlign: 'left', fontSize: '55px', fontWeight: 'lighter' },
})

function AllMembers({ members }) {
    const classes = useStyles()
    const [member, setMembers] = useState([])

    useEffect(() => {
        //fetch data from server
        //how can I get the information without filtering???
        const memberS = members.filter(
            (member) => member.Major === 'Computer Science' && ''
        )

        setMembers(memberS)
    }, [members])

    return (
        <Layout>
            <div>
                <Typography className={classes.mainTitle}>
                    {' '}
                    Seeking Members{' '}
                </Typography>
            </div>
            <div>
                <AllMembersCards members={member} />
            </div>
            <div></div>
            <div></div>
        </Layout>
    )
}

export default AllMembers
