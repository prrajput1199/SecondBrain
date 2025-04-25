import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BACKEND_URL } from '../config';
import CardShare from '../Components/CardShare';
import { useProduct } from '../Context/useProductContext';

const SkeletonCard = () => (
  <div className="w-full min-w-[275px] max-w-[350px] p-4 bg-gray-100 rounded-xl shadow animate-pulse">
      <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="flex space-x-2">
          <div className="h-8 w-20 bg-gray-300 rounded-md"></div>
          <div className="h-8 w-20 bg-gray-300 rounded-md"></div>
      </div>
  </div>
);

const ShareBrain = () => {
  const { shareId } = useParams();
  const [shareData, setShareData] = useState();

  // @ts-ignore
  const { Loading } = useProduct();


  const getShareData = async () => {
    const res = await axios.get(`${BACKEND_URL}/brain/share/${shareId}`);
    const newData = res.data;
    setShareData(newData);
  }

  useEffect(() => {
    getShareData();
  }, []);

  return (
    <>
      <div className='overflow-x-hidden'>
        {/* @ts-ignore */}
        <h2 className='text-2xl font-bold text-center pt-3'>{shareData?.Name}'s brain</h2>
        <div className='rounded bg-gray-200 p-5 mt-5 w-screen h-screen'>
          <div className='flex flex-wrap mt-3 gap-3'>
            {
              !Loading ?
                // @ts-ignore
                shareData?.Content.map((curEl) => {
                  return (
                    <>
                      <CardShare
                        link={curEl.link}
                        title={curEl.title}
                        notes={curEl.notes}
                        type={curEl.type} />
                    </>
                  )
                })
                : (<div className='grid grid-cols-1 pl-3 pr-3 mb-3 sm:flex flex-wrap gap-4 mt-4 justify-center sm:justify-normal'>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <SkeletonCard key={index} />
                  ))}
                </div>)
            }
          </div>
        </div>
      </div>
    </>

  )
}

export default ShareBrain