import { useRef, useState } from 'react'
import { Input } from '../Components/CreateModal'
import { NavLink, useNavigate } from 'react-router-dom'
import Button from '../Components/Button'
import axios from 'axios'
import { useProduct } from '../Context/useProductContext'
import { BACKEND_URL } from '../config'


const Signin = () => {
          // @ts-ignore
    const userEmailRef = useRef<HTMLInputElement>();
       // @ts-ignore
    const userpasswordRef = useRef<HTMLInputElement>();
    const Navigate = useNavigate();
    const [Loading, setLoading] = useState(false);
    const [error, setError] = useState("");
          // @ts-ignore
    const { RefetchDataFun } = useProduct();

    async function Submit() {

        const userEmail = userEmailRef.current?.value;
        const userPassword = userpasswordRef.current?.value;

        try {
            setLoading(true);
            const Response = await axios.post(`${BACKEND_URL}/signin`, {
                userEmail, userPassword
            })

            const Token = Response.data.token;
            localStorage.removeItem('Token');
            localStorage.setItem("Token", Token);
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
                    <Input placeholder='Email' reference={userEmailRef} type='email' 
                    // defaultValue='pratik@gmail.com'
                    />
                    <Input placeholder='Password' reference={userpasswordRef} type="password" 
                    // defaultValue='Pratik@99'
                    />

                    {error && <p className="text-red-600 mb-2 flex justify-end">{error}</p>}

                    <div className='mb-2 flex justify-start'><span className='pr-2'><NavLink to="/forgetpassword"><span className='text-blue-700 underline'>Forget Password ?</span></NavLink></span>
                    </div>

                    <Button variant="primary" text='Submit' size='md' onClick={Submit} Fullwidth={true} Loading={Loading} />
                    <div className='mt-2 flex justify-end'><span className='pr-2'>Don't have an account?</span>
                        <p> Go to <NavLink to="/signup"><span className='text-blue-700 underline'>Sign Up</span></NavLink></p></div>

                </div>
            </div>
        </>
    )
}

export default Signin;