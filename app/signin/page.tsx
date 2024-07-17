'use client';
import { Button, Stack, TextField, Link, Alert } from "@mui/material";
import Nextlink from 'next/link';
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";




export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const router = useRouter();

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
        setEmailError(false);
    }

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
        setPasswordError(false);
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        // client side validations
        
        // email validation
        if (!email.trim()) {
            setEmailError(true);
            return;
        }

        if (!password.trim()) {
            setPasswordError(true);
            return;
        }

        await router.push('/home');
    }

    return (
        <form className="w-full max-w-xs" onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <h1>Login to your account</h1>
                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    type="email"
                    placeholder="admin@gmail.com"
                    error={emailError}
                    helperText={emailError ? 'Email is required' : ''}
                    onChange={handleEmailChange}>
                </TextField>
                <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    error={passwordError}
                    helperText={
                        passwordError ?
                            `Password is required`
                            : ''}
                    onChange={handlePasswordChange}>
                </TextField>
                <Button variant="contained" type="submit">Signin</Button>
                <span>
                    Does not have an account ? &nbsp;
                    <Link component={Nextlink} href="/signup" className="self-center">
                        Signup
                    </Link>
                </span>
            </Stack>
        </form>
    );
}