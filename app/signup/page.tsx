'use client';
import { Button, Stack, TextField, Link, Alert, CircularProgress } from "@mui/material";
import Nextlink from 'next/link';
import { useState, useEffect, useRef, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import * as deploy from '../utils/constants';

type FormElement = HTMLFormElement;

export default function Signup() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [ serverError, setServerError ] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const formRef = useRef<FormElement>(null);

    /**
     * Using useEffect 
     * - To remove error message after 3 seconds delay
     * - Reset form
     */
    useEffect(() => {
        const timer = setTimeout(() => {
            setServerError('');
            formRef?.current?.reset();
        }, 3000);
    
        return () => clearTimeout(timer);
      }, [serverError]);

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

    /**
     * Form Submit handler
     * - Client side validations on email & passsword will be processed
     * - If all checks passed, it will try to create a new user account
     * - If user created successfully, it will redirect to /signin page
     * - If user not created or something went wrong, it will show error alert message
     */
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

        // handle signup
        setLoading(true);
        let res: any = await fetch(`${deploy.config.backendUrl}/users/signup`, {
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
        if (res && res.email) {
          await router.push('/signin');
        } else {
          setServerError(res.message);
        }
    }

    return (
        <form className="w-full max-w-xs" ref={formRef} onSubmit={handleSubmit}>
            { serverError && <Alert severity="error">{serverError}</Alert>}
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
                    helperText={emailError ? 'Email is required' : ''}
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
                            : ''}
                    onChange={handlePasswordChange}>
                </TextField>
                <Button 
                    variant="contained" 
                    disabled={loading}
                    startIcon={loading && <CircularProgress size={20} color="inherit" />}
                    type="submit">Signup</Button>
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