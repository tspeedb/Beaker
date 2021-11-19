import Layout from '../Components/Layout'
import Side from '../Components/Side'

function BookemarkedMembers() {
    return (
        <Layout>
            <Side>
                <div>
                    <h1 style={{ textAlign: 'center', fontSize: '100px' }}>
                        {' '}
                        bookmarked members{' '}
                    </h1>
                </div>
            </Side>
        </Layout>
    )
}

export default BookemarkedMembers
