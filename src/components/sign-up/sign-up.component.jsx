import React, { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import {auth, createUserProfile} from '../../firebase/firebase.util';
import './sign-up.style.scss';

export default function SignUp() {

const [userData, setUser] = useState({
    displayName: '',
    email:'',
    password:'',
    confirmPassword: ''
});
async function handleSubmit(e) {
    e.preventDefault();
    const { displayName, email, password, confirmPassword } = userData;
if (password !== confirmPassword){
    alert('passwords don\'t match');
    return;
}
try{
const { user } = await auth.createUserWithEmailAndPassword(email, password);
await createUserProfile(user, { displayName });
setUser({
    displayName: '',
    email:'',
    password:'',
    confirmPassword: ''
});

} catch(err) {
console.error(err);
}
}  

function handleChange(e) {
    const { name, value } = e.target;
    setUser((prevData) => ({...prevData, [name]: value }));
}

return (
    <div className='sign-up'>
        <h2 className='title'>I do not have a account </h2>
        <span>Sign up with your email and password </span>
        <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput type='text' name='displayName' value={userData.displayName} onChange={handleChange} 
            label='Display Name' required
        />    
        <FormInput type='text' name='email' value={userData.email} onChange={handleChange} 
            label='Email' required
        /> 
        <FormInput type='password' name='password' value={userData.password} onChange={handleChange} 
            label='Password' required
        /> 
        <FormInput type='password' name='confirmPassword' value={userData.confirmPassword} onChange={handleChange} 
            label='Confirm Password' required
        /> 
        <Button type='submit'> Sign Up </Button>
        </form>
    </div>
)

}