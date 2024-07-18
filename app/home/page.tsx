'use client';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Nextlink from 'next/link';
import { Button, Stack, Link, Alert } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

import * as deploy from '../utils/constants';


export default function Home() {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(true);
  const router = useRouter();

  const handleLogout = async () => {
    localStorage.removeItem('accessToken');
    await router.push('/signin');
    return;
  }

  // fetch user details
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setLoggedIn(false);
      return;
    }
    fetch(`${deploy.config.backendUrl}/users/profile`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.code !== 200) {
          setLoggedIn(false);
        } else {
          setProfile(resData.data);
          setLoading(false);
        }
      })
  }, [])

  // if user not logged in show different page
  if (!isLoggedIn) {
    return (
      <span>
        Click here to login :
        <Link component={Nextlink} href="/signin" className="self-center">
          Signin
        </Link>
      </span>
    )
  }
  if (isLoading) return <p>Loading...</p>

  // If user logged in, show user details
  return (
    <main>
      <Stack spacing={2}>
        {
          !profile && <Alert severity="error">Profile data not found</Alert>
        }
        {
          profile &&
          <>
            <h1>Hello {profile.name}</h1>
            <picture>
              <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f603/512.webp" type="image/webp" />
              <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f603/512.gif" alt="😃" width="32" height="32" />
            </picture>
            <h1>Welcome to the application</h1>
            <pre>
              <u>Your Details</u> <br />
              name: {profile.name}<br />
              email: {profile.email}
            </pre>
          </>
        }
        <Button
          variant="outlined"
          onClick={handleLogout}
          startIcon={<LogoutIcon />}>
          Logout
        </Button>
      </Stack>
    </main>
  );
}


