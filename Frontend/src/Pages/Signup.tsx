import { useRef, useState } from 'react'
import { Input } from '../Components/CreateModal'
import { NavLink, useNavigate } from 'react-router-dom'
import Button from '../Components/Button'
import axios from 'axios'
import { useProduct } from '../Context/useProductContext'
import { BACKEND_URL } from '../config'

const Signup = () => {
       // @ts-ignore
    const userNameRef = useRef<HTMLInputElement>();
       // @ts-ignore
    const userEmailRef = useRef<HTMLInputElement>();
       // @ts-ignore
    const userpasswordRef = useRef<HTMLInputElement>();
    const Navigate = useNavigate();
    const [error, setError] = useState("");
    const [Loading, setLoading] = useState(false);
       // @ts-ignore
    const { RefetchDataFun } = useProduct()

    async function Submit() {
        const userName = userNameRef.current?.value;
        const userEmail = userEmailRef.current?.value;
        const userPassword = userpasswordRef.current?.value;
 
        try {
            setLoading(true)
            const res = await axios.post(`${BACKEND_URL}/signup`, {
                userEmail, userPassword, userName
            })

            const Token = res.data.token;
            console.log("Token1 before removing =>", localStorage.getItem("Token"))
            localStorage.removeItem('Token');
            console.log("Token1 after removing=>", localStorage.getItem("Token"))
            localStorage.setItem("Token", Token);
            console.log("New Token =>", localStorage.getItem("Token"))
            setLoading(false);
            RefetchDataFun();
            Navigate("/dashboard");
        } catch (err) {
               // @ts-ignore
            setError(err.response.data.message);
            setLoading(false);
        }
    }

    return (
        <>
            <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
                <div className="bg-white rounded-xl border min-w-48 w-96 p-8">
                    <Input placeholder='Name' reference={userNameRef} type='text'/>
                    <Input placeholder='Email' reference={userEmailRef} type="email"/>
                    <Input placeholder='Password' reference={userpasswordRef} type="password"/>

                    {error && <p className="text-red-600 mb-2 flex justify-end">{error}</p>}

                    <Button variant="primary" text='Submit' size='md' onClick={Submit} Fullwidth={true} Loading={Loading} />
                    <div className='mt-2 flex justify-end'><span className='pr-2'>Already have an account?</span>
                        <p> Go to <NavLink to="/"><span className='text-blue-700 underline'>Signin</span></NavLink></p></div>

                </div>
            </div>
        </>
    )
}

export default Signup;