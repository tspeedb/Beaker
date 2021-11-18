import Layout from '../Components/Layout'
import Sidebar from '../Components/Sidebar'

function BookemarkedMembers() {
    return (
        <Layout>
            <Sidebar></Sidebar>
            <div>
                <h1 style={{ textAlign: 'center', fontSize: '100px' }}>
                    {' '}
                    bookmarked members{' '}
                </h1>
            </div>
        </Layout>
    )
}

export default BookemarkedMembers
