import SideBar from '../Components/SideBar'
import MainSection from '../Components/MainSection'

const Dashboard = () => {
    return (<>
        <div className='flex h-screen overflow-x-hidden'>
            <SideBar/>
            <MainSection/>
        </div>
    </>
    )
}

export default Dashboard