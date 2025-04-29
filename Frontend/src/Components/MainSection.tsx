import { useState } from 'react'
import Button from './Button';
import { Brain, Menu, Plus, Share } from './Icons/Icons';
import Card from './Card';
import CreateModal from './CreateModal';
import axios from 'axios';
import { useFilter } from '../Context/useFilterContext';
import { BACKEND_URL } from '../config';
import showShareAlert from './ShareAlert';
import { useProduct } from '../Context/useProductContext';


const SkeletonCard = () => (
    <div className="w-full min-w-[275px] max-w-[375px] p-4 bg-gray-100 rounded-xl shadow animate-pulse">
        <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="flex space-x-2">
            <div className="h-8 w-20 bg-gray-300 rounded-md"></div>
            <div className="h-8 w-20 bg-gray-300 rounded-md"></div>
        </div>
    </div>

);

const MainSection = () => {
    const [openModal, setModal] = useState(false);

    // @ts-ignore
    const { FilterProduct, isSidebarOpenFun } = useFilter();

    // @ts-ignore
    const { Loading } = useProduct();

    async function onShare() {
        const response = await axios.post(`${BACKEND_URL}/brain/share`, {
            Share: true
        },
            {
                headers: {
                    "token": localStorage.getItem("Token")
                }
            })

        const Hash = response.data.Link;
        showShareAlert(Hash);
    }

    return (<>
        <CreateModal open={openModal} onClose={() => setModal(false)} />
        <div className='flex-1 bg-gray-200 p-0 sm:p-6 min-h-screen sm:w-screen overflow-y-scroll'>
            <div className='flex justify-between mt-4 mb-4 sm:hidden'>
                <div className='text-2xl pt-0 pl-2 sm:pt-4 items-center flex sm:hidden'>
                    <div className="pr-2 text-purple-200">
                        <Brain IconSize="lg" />
                    </div>
                    <span className='font-medium'>Second Brain</span>
                </div>
                <div className="p-2">
                    <button onClick={isSidebarOpenFun}>
                        <Menu IconSize="lg" />
                    </button>
                </div>
            </div>

            <div className='flex items-center justify-between flex-wrap gap-4 mb-6 p-2 sm:p-0'>
                <div>All Notes</div>
                <div className="buttons flex items-center gap-3">
                    <Button variant="secondary" size="md" startIcon={<Share IconSize='md' />} text='Share Content' onClick={onShare} />
                    <Button variant="primary" size="md" startIcon={<Plus IconSize='md' />} text='Add content' onClick={() => setModal(true)} />
                </div>
            </div>
            <div>
                {!Loading ? (
                    <>
                        <div className='grid grid-cols-1 pl-3 pr-3 mb-3 sm:flex flex-wrap gap-2 mt-4 justify-center sm:justify-normal'>
                            {
                                // @ts-ignore
                                FilterProduct.map((curEl) => {
                                    return (<>
                                        <Card
                                            link={curEl.link}
                                            title={curEl.title}
                                            notes={curEl.notes}
                                            type={curEl.type}
                                            _id={curEl._id} />
                                    </>)
                                })}
                        </div>
                    </>
                ) : (
                    <div className='grid grid-cols-1 pl-3 pr-3 mb-3 sm:flex flex-wrap gap-4 mt-4 justify-center sm:justify-normal'>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <SkeletonCard key={index} />
                        ))}
                    </div>
                )}
            </div>
        </div>

    </>
    )
}

export default MainSection;