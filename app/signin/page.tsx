'use client';
import { Button, Stack, TextField, Link, Alert, CircularProgress } from "@mui/material";
import Nextlink from 'next/link';
import { useState, useEffect, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import * as deploy from '../utils/constants';


export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [ serverError, setServerError ] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
        setEmailError(false);
    }

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
        setPasswordError(false);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setServerError('');
        }, 3000);
    
        return () => clearTimeout(timer);
      }, [serverError]);

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

        setLoading(true);
        let res: any = await fetch(`${deploy.config.backendUrl}/users/signin`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });
        res = await res.json();
        setLoading(false);
        if (res && res['access_token']) {
          localStorage.setItem('accessToken', res['access_token']);
          await router.push('/home');
        } else {
          setServerError(res['message']);
        }
    }

    return (
        <form className="w-full max-w-xs" onSubmit={handleSubmit}>
            { serverError && <Alert severity="error">{serverError}</Alert>}
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
                <Button 
                variant="contained" 
                disabled={loading}
                startIcon={loading && <CircularProgress size={20} color="inherit" />}
                type="submit">Signin</Button>
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