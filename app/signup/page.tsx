'use client';
import { Button, Stack, TextField, Link, Alert } from "@mui/material";
import Nextlink from 'next/link';



export default function Signup() {
  return (
    <Stack spacing={2} className="w-full max-w-xs">
    <h1>Create your account</h1>
    <TextField label="Email" variant="outlined" type="email"></TextField>
    <TextField label="Name" variant="outlined" type="name"></TextField>
    <TextField label="Password" variant="outlined" type="password"></TextField>
    <Button variant="contained" type="submit">Signup</Button>
    <span>
    Already have an account ?&nbsp;
    <Link component={Nextlink} href="/signin" className="self-center">
        Signin
    </Link>
    </span>
    </Stack>
  );
}