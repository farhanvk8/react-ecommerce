import React, { useState } from 'react';

import './sign-in.style.scss';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import {auth} from '../../firebase/firebase.util';
import { signInWithGoogle } from '../../firebase/firebase.util';

export default function SignIn() {

const [credential, setState] = useState({
    email:'',
    password:''
});

async function handleSubmit(e) {
    e.preventDefault();
try{
await auth.signInWithEmailAndPassword(credential.email, credential.password);
setState({email: '',
    password: ''});
}catch(err){
console.error(err);
}   
}

function handleChange(e){
const { value , name} = e.target;
setState((prevdata) => ({...prevdata,[name]: value}));
}

return (<div className='sign-in'>
<h2>I already have an account,</h2>
<span>Sign in with your email and password</span>
<form onSubmit={handleSubmit}>
    <FormInput name='email' type='email' value={credential.email} handleChange={handleChange} label='Email' required />
    <FormInput name='password' type='password' value={credential.password} handleChange={handleChange} label='Password' required />
    <div className='buttons'>
    <Button type='submit'> Sign In </Button>
    <Button onClick={signInWithGoogle} isGoogleSignIn> Sign In With Google </Button>
    </div>
</form>
</div>);
}
