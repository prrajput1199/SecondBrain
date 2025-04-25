import { useState } from "react";
import axios from "axios";
import Button from "../Components/Button";
import { NavLink } from "react-router-dom";
import { BACKEND_URL } from "../config";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [emailValid, setEmailValid] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [Loading, setLoading] = useState(false);

    const handleCheckEmail = async () => {
        setLoading(true);
        try {
            await axios.post(`${BACKEND_URL}/check-email`, {
                email,
            });
            setEmailValid(true);
            setLoading(false);
        } catch (err) {
            setEmailValid(false);
            // @ts-ignore
            setMessage(err.response.data.message);
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        setLoading(true);
        try {
            await axios.put(`${BACKEND_URL}/reset-password`, {
                email,
                newPassword,
            });
            setEmail("");
            setNewPassword("");
            setEmailValid(false);
            setLoading(false);
            alert("Password updated successfully");
        } catch (err) {
                  // @ts-ignore
            setMessage(err.response.data.message);
            setLoading(false);
        }
    };

    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 w-96 p-8">
                <h2 className="text-2xl font-semibold mb-2">Email verification :</h2>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={emailValid}
                    className='px-4 py-2 border rounded my-2 w-full'
                />

                {message && <p className="text-red-600 mb-2">{message}</p>}

                {!emailValid ? (
                    <>
                        <Button variant="primary" text='Verify Email' size='md' onClick={handleCheckEmail} Fullwidth={true} Loading={Loading} />
                        <div className='mb-2 flex justify-end mt-2 mb-2'>Go to <span className='pl-2'><NavLink to="/"><span className='text-blue-700 underline'>Sign in</span></NavLink></span>
                        </div>
                    </>
                ) : (
                    <>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className='px-4 py-2 border rounded my-2 w-full'
                        />
                        {/* <button onClick={handleResetPassword} style={{ padding: "8px 16px" }}>
                            Update Password
                        </button> */}
                        <Button variant="primary" text=' Update Password' size='md' onClick={handleResetPassword} Fullwidth={true} Loading={Loading} />
                        <div className='mb-2 flex justify-end mt-2 mb-2'>Go to <span className='pl-2'><NavLink to="/"><span className='text-blue-700 underline pr-2'>Sign in</span></NavLink></span>
                        </div>
                    </>
                )}


            </div>
        </div>
    );
};

export default ForgetPassword;
