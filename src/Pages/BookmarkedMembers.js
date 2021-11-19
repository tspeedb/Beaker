import DashboardCards from '../Components/DashBoardCards'
import Layout from '../Components/Layout'
import Side from '../Components/Side'

function BookemarkedMembers() {
    return (
        <Layout>
            <Side>
                <div>
                    <h1
                        style={{
                            paddingLeft: '100px',
                            textAlign: 'center',
                            fontSize: '40px',
                        }}
                    >
                        {' '}
                        bookmarked members{' '}
                    </h1>

                    <DashboardCards />
                </div>
            </Side>
        </Layout>
    )
}

export default BookemarkedMembers
