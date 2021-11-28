import Layout from '../Components/Layout'
import Side from '../Components/Side'

function InvitedMembers() {
    return (
        <Layout>
            <Side>
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
                        invited members{' '}
                    </h1>
                </div>
            </Side>
        </Layout>
    )
}

export default InvitedMembers
