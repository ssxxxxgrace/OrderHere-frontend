import React from 'react';
import Image from 'next/image';

import { signIn } from 'next-auth/react';

const loginWithGoogle = () => signIn('google', {callbackUrl: 'http://localhost:3000'})
const GoogleSignInBtn =  ({ children }) =>{
    // console.log(process.env.GOOGLE_CLIENT_ID);
    return(
        <button onClick={loginWithGoogle} style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}>
            <Image src="/icons/signIn/google-login.png" alt="Google Login" width={200} height={40} />
        </button>
    );
}

export default GoogleSignInBtn;