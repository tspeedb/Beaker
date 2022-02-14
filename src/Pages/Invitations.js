import Layout from '../Components/Layout'
import Side from '../Components/Side'
import studsidebaritems from '../studsidebaritems'

function Invitations() {
    return (
        <Layout>
            <Side sidebaritems={studsidebaritems}>
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
                        Invitations{' '}
                    </h1>
                </div>
            </Side>
        </Layout>
    )
}

export default Invitations
