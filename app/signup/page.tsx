'use client';
import { Button, Stack, TextField, Link, Alert } from "@mui/material";
import Nextlink from 'next/link';
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";




export default function Signup() {
    const [ email, setEmail ] = useState('');
    const [ name, setName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ emailError, setEmailError ] = useState(false);
    const [ passwordError, setPasswordError ] = useState(false);
    const router = useRouter();

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
        setEmailError(false);
    }
    
    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
        setPasswordError(false);
    }

    function isPasswordValid(value: string) {
        const specialCharactersRegex = new RegExp('[!@#$%^&*(),.?":{}|<>]');
        const numberRegex = new RegExp('\\d');
        const letterRegex = new RegExp('[a-zA-Z]');
        return value 
            && value.length >= 8 // password must be 8 characters minimum
            && numberRegex.test(value) // should contain atleast 1 number
            && letterRegex.test(value) // should contain atleast 1 letter
            && specialCharactersRegex.test(value); // should contain atleast 1 special character
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        // client side validations
        // email validation
        if (!email.trim()) {
            setEmailError(true);
            return;
        }

        if (!isPasswordValid(password)) {
            setPasswordError(true);
            return;
        }

        await router.push('/signin');
    }

    return (
        <form className="w-full max-w-xs" onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <h1>Create your account</h1>
                <TextField 
                    required
                    id="email"
                    label="Email" 
                    variant="outlined" 
                    type="email"
                    placeholder="admin@gmail.com"
                    error={emailError}
                    helperText={ emailError ? 'Email is required' : '' }
                    onChange={handleEmailChange}>
                </TextField>
                <TextField 
                    id="name"
                    label="Name" 
                    variant="outlined" 
                    placeholder="Tom"
                    type="name"
                    onChange={e => setName(e.target.value)}>
                </TextField>
                <TextField 
                    required
                    id="password"
                    label="Password" 
                    variant="outlined" 
                    type="password" 
                    error={passwordError}
                    helperText={ 
                        passwordError ? 
                        `Password must be 8 characters minimum, with at least one letter, one number, and one special character.`
                        : '' }
                    onChange={handlePasswordChange}>
                </TextField>
                <Button variant="contained" type="submit">Signup</Button>
                <span>
                    Already have an account ?&nbsp;
                    <Link component={Nextlink} href="/signin" className="self-center">
                        Signin
                    </Link>
                </span>
            </Stack>
        </form>
    );
}