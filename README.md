## Description

User Credentials Module allows users to signup and signin with their account.


## Installation

Clone repo by using following command

```bash
git clone https://github.com/kldvp/user-credentials-module.git
```

Install dependencies

```bash
npm install
```

## Running the app

> [!NOTE]  
> Before starting this server, Please run backend service by following [link](https://github.com/kldvp/user-credentials-backend) here.

Run the app by using following command

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.



## Functionalities


- Users can sign up by navigating to the `/signup` route.
    - Email and password are required fields.
    - Added client side validations for password by following guidelines
        - Minimum length of 8 characters
        - Contains at least 1 letter.
        - Contains at least 1 number.
        - Contains at least 1 special character.
- Users can sign in by navigating to the `/signin` route.
- Users can only access `/home` if they are already logged in.

## Demo
![usersignupsigninflow](https://github.com/user-attachments/assets/2c84ea4c-76e7-4f2b-bbcb-47ad7202452e)

