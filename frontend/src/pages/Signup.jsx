import React, { useEffect, useState } from 'react';
import { Heading } from '../components/Heading';
import { SubHeading } from '../components/SubHeading';
import { InputBox } from '../components/InputBox';
import { Button } from '../components/Button';
import { BottomWarning } from '../components/BottomWarning';

const Signup = () => {
    const [firstname, setfirstName] = useState("");
    const [lastname, setlastName] = useState("");
    const [Username, setUserName] = useState("");
    const [Password, setPassword] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault(); // Prevents the default form submission

        const payload = {
            firstName: firstname,
            lastName: lastname,
            username: Username,
            password: Password,
        };

        try {
            const response = await fetch("http://localhost:3000/api/v1/user/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Network response was not ok');
            }

            const data = await response.json();
            console.log(data); // Log the data returned from the server
        } catch (error) {
            console.error("Error:", error); // Log error if any
        }
    };



    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"} />
                <SubHeading label={"Enter your infromation to create an account"} />


                <InputBox placeholder="John" label={"First Name"} onChange={(e) => {
                    setfirstName(e.target.value)
                }} />



                <InputBox placeholder="Doe" label={"Last Name"}
                    onChange={(e) => {
                        setlastName(e.target.value)
                    }}
                />


                <InputBox placeholder="ashutosh@gmail.com" label={"Email"}
                    onChange={(e) => {
                        setUserName(e.target.value)

                    }}
                />


                <InputBox placeholder="123456" label={"Password"}
                    onChange={
                        (e) => {
                            setPassword(e.target.value)
                        }
                    }
                />


                <div className="pt-4">
                    <Button label={"Sign up"} onClick={handleSignup} />
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
            </div>
        </div>
    </div>
}

export default Signup;
