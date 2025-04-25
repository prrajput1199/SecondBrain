import { All, Brain, Close, Links, Notes, Twitter, YouTube } from './Icons/Icons'
import SideItem from './SideItem'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import { useFilter } from '../Context/useFilterContext'


const SideBar = () => {
    const Navigate = useNavigate();

    // @ts-ignore
    const { updateFilterFun, LogOut, isSidebarOpen , isSidebarCloseFun } = useFilter();


    const handleLogout = () => {
        localStorage.removeItem("Token");
        LogOut();
        Navigate("/");
    };

    const sideItems = [
        {
            text: "All",
            Icon: <All IconSize="md" />,
            onClick: updateFilterFun,
            name: "type",
            value: "All",
        },
        {
            text: "Twitter",
            Icon: <Twitter IconSize="md" />,
            onClick: updateFilterFun,
            name: "type",
            value: "Twitter",
        },
        {
            text: "YouTube",
            Icon: <YouTube IconSize="md" />,
            onClick: updateFilterFun,
            name: "type",
            value: "YouTube",
        },
        {
            text: "Other Links",
            Icon: <Links IconSize="md" />,
            onClick: updateFilterFun,
            name: "type",
            value: "Random Links",
        },
        {
            text: "Notes",
            Icon: <Notes IconSize="md" />,
            onClick: updateFilterFun,
            name: "type",
            value: "Random Thoughts",
        },
    ];


    return (
        <>
            <div className={`bg-white border-r-0 p-4 w-full h-screen fixed flex flex-col justify-between sm:static top-0 right-0  transform ${isSidebarOpen ? '-translate-x-0 overflow-y-hidden' : 'translate-x-full'} transition-transform duration-300 ease-in-out sm:translate-x-0 h-full sm:w-72`}>
                <div>
                    <div className="flex items-center justify-between">
                        <div className='text-2xl pt-0 sm:pt-4 items-center hidden sm:flex'>
                            <div className="pr-2 text-purple-200">
                                <Brain IconSize="lg" />
                            </div>
                            <span className='font-medium'>Second Brain</span>
                        </div>
                        <div onClick={isSidebarCloseFun} className='ml-auto sm:hidden'>
                            <Close IconSize='lg' />
                        </div>
                    </div>
                    <div className="pt-4">
                        {sideItems.map((curEl) => {
                            return (<>
                                <SideItem text={curEl.text} Icon={curEl.Icon} onClick={curEl.onClick} name={curEl.name} value={curEl.value} />
                            </>)
                        })}
                    </div>
                </div>
                <div className='mb-6'>
                    <Button variant='primary' text='Logout' size='md' onClick={handleLogout} Fullwidth={false} />
                </div>
            </div>
        </>
    )
}

export default SideBar