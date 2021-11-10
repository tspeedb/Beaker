import 'firebase/firestore'
import { db } from '../firebase'
import React, { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'

function MyProjects() {
    const [projects, setProjects] = useState([])
    const projectsCollectionRef = collection(db, 'projects')
    useEffect(() => {
        const getProjects = async () => {
            const data = await getDocs(projectsCollectionRef)
            //loop through documents in collection\
            // console.log('things show up')
            // console.log(data)
            setProjects(
                data.docs.map((doc) => ({ ...doc.data(), key: doc.id }))
            )
        }
        getProjects()
    }, [])

    return (
        <div>
            {' '}
            {projects.map((project) => {
                return (
                    <div key={project.key}>
                        {' '}
                        <h1> {project.description} </h1>
                        <h1> {project.title} </h1>
                        <h1> {project.image} </h1>
                        <h1> {project.type} </h1>
                    </div>
                )
            })}
        </div>
    )
}

export default MyProjects
