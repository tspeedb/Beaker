import Layout from '../Components/Layout'
import Side from '../Components/Side'
import studsidebaritems from '../studsidebaritems'
import sidebaritems from '../sidebaritems'

function AllOwnedProjects() {
    return (
        <Layout>
            <Side
                sidebaritems={sidebaritems}
                studsidebaritems={studsidebaritems}
            >
                <div>
                    <h1
                        style={{
                            color: 'rgba(16, 127, 183, 1)',
                            paddingLeft: '100px',
                            fontWeight: 'lighter',
                            textAlign: 'center',
                            fontSize: '40px',
                        }}
                    >
                        {' '}
                        All My Projects{' '}
                    </h1>
                </div>
            </Side>
        </Layout>
    )
}

export default AllOwnedProjects
