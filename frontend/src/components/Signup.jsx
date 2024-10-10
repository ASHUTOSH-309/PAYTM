import React, { useState } from 'react';

const Signup = () => {
    const [firstname, setfirstName] = useState("");
    const [lastname, setlastName] = useState("");
    const [Username, setUserName] = useState("");
    const [Password, setPassword] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault(); // Prevents the default form submission

        const payload = {
            firstName:firstname,
            lastName:lastname,
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

    return (
        <form onSubmit={handleSignup}>
            <label>Enter your first name:</label>
            <input
                type="text"
                value={firstname}
                name='firstName'
                onChange={(e) => setfirstName(e.target.value)}
            />
            <br /><br />
            <label>Enter your last name:</label>
            <input
                type="text"
                value={lastname}
                name='lastName'
                onChange={(e) => setlastName(e.target.value)}
            />
            <br /><br />
            <label>Enter your email:</label>
            <input
                type="text"
                value={Username}
                name='username'
                onChange={(e) => setUserName(e.target.value)}
            />
            <br /><br />
            <label>Enter your password:</label>
            <input
                type="password"
                value={Password}
                name='password'
                onChange={(e) => setPassword(e.target.value)}
            />
            <br /><br />
            <button type='submit'>Sign up</button>
        </form>
    );
}

export default Signup;
