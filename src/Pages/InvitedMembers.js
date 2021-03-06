import Layout from '../Components/Layout'
import Side from '../Components/Side'
import sidebaritems from '../sidebaritems'
import studsidebaritems from '../studsidebaritems'
import AllMembersCards from '../Components/AllMembersCards'

function InvitedMembers() {
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
                        invited members{' '}
                    </h1>
                </div>
            </Side>
        </Layout>
    )
}

export default InvitedMembers
