'use client';
import { Button, Stack, TextField, Link, Alert } from "@mui/material";
import Nextlink from 'next/link';



export default function Signin() {
  return (
    <Stack spacing={2} className="w-full max-w-xs">
    <h1>Login to your account</h1>
    <TextField label="Email" variant="outlined" type="email"></TextField>
    <TextField label="Password" variant="outlined" type="password"></TextField>
    <Button variant="contained" type="submit">Signin</Button>
    <span>
    Does not have an account ? &nbsp;
    <Link component={Nextlink} href="/signup" className="self-center">
        Signup
    </Link>
    </span>
    </Stack>
  );
}