import React, { useRef, useState } from 'react'
import { Close } from './Icons/Icons'
import Button from './Button'
import axios from 'axios'
import { useProduct } from '../Context/useProductContext'
import { BACKEND_URL } from '../config'

interface ModalProps {
    open: boolean,
    onClose: () => void
}

interface InputStyle {
    onChange?: () => void,
    placeholder: string,
    reference?: React.RefObject<HTMLInputElement>,
    type: string,
    defaultValue?: string
}

export const Input = (props: InputStyle) => {
    const { onChange, placeholder, reference } = props;
    return (<>
        <input type={props.type} placeholder={placeholder} className='px-4 py-2 border rounded my-2 w-full' onChange={onChange} ref={reference}
        //  defaultValue={props.defaultValue} 
         />
    </>
    )
}

const CreateModal = ({ open, onClose }: ModalProps) => {
    const [type, setType] = useState("Random Links");
    // @ts-ignore
    const TitleReference = useRef<HTMLInputElement>();
    // @ts-ignore
    const LinkReference = useRef<HTMLInputElement>();
    // @ts-ignore
    const NotesReference = useRef<HTMLInputElement>();
    // @ts-ignore
    const { RefetchDataFun } = useProduct();

    const HandleSubmit = async () => {
        const Title = TitleReference.current?.value;
        const Link = LinkReference.current?.value;
        const Notes = NotesReference.current?.value;
        await axios.post(`${BACKEND_URL}/content`, {
            title: Title,
            link: Link,
            notes: Notes,
            type: type
        }, {
            headers: {
                "token": localStorage.getItem("Token")
            }
        }
        )

        RefetchDataFun();
        onClose();
    }

    return (
        <>{open && <div className="w-screen h-screen bg-black/50 fixed top-0 left-0 flex justify-center items-center">
            <div className="w-72 max-h-max flex flex-col">
                <div className="bg-white opacity-100 p-4 rounded">
                    <div className="flex justify-end cursor-pointer">
                        <div onClick={onClose} className='border-2 rounded p-1 hover:bg-purple-200'>
                            <Close IconSize="md" />
                        </div>

                    </div>
                    <div>
                        <Input placeholder='Title' reference={TitleReference} type='text' />
                        <Input placeholder='Link' reference={LinkReference} type='text' />
                        <Input placeholder='Add notes' reference={NotesReference} type='text' />
                    </div>
                    <label htmlFor="Type" className='mr-3'>Type: </label>
                    <select name="" id="Type" value={type} className='border-[1px] mt-1 mb-1 rounded-2xl p-2' onChange={(e) => {
                        setType(e.target.value);
                        // console.log("Selected type:", e.target.value);
                    }
                    } >
                        <option value="Twitter">Twitter Link</option>
                        <option value="YouTube">YouTube Link</option>
                        {/* <option value="Document">Document</option> */}
                        <option value="Random Links">Random Links</option>
                        <option value="Random Thoughts">Random Thoughts</option>
                    </select>
                    <div className="flex justify-center mt-4">
                        <Button variant="primary" size="md" text='Submit' onClick={HandleSubmit} />
                    </div>
                </div>

            </div>
        </div>}
        </>
    )
}

export default CreateModal