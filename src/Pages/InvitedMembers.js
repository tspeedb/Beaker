import DashboardCards from '../Components/DashBoardCards'
import Layout from '../Components/Layout'
import Side from '../Components/Side'

function InvitedMembers() {
    return (
        <Layout>
            <Side>
                <div>
                    <h1 style={{ textAlign: 'center', fontSize: '40px' }}>
                        {' '}
                        invited members{' '}
                    </h1>
                </div>
            </Side>
            <DashboardCards />
        </Layout>
    )
}

export default InvitedMembers