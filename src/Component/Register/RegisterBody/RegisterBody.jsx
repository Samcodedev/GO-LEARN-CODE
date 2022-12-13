import React from 'react';
import './RegisterBody.css'
import { useNavigate } from 'react-router-dom';



const RegisterBody = () => {

    const [firstName, ffunc] = React.useState('')
    const [lastName, lfunc] = React.useState('')
    const [userName, ufunc] = React.useState('')
    const [email, efunc] = React.useState('')
    const [password, pfunc] = React.useState('')
    const [confirm, cfunc] = React.useState('')
    
    const navigate = useNavigate();

    // let valid1 = document.getElementById("valid1")
    // let valid2 = document.getElementById("valid2")
    // let error = document.getElementById("error")

    const handleLogin = async (e) =>{
        e.preventDefault()
        let result = await fetch('https://golearn.onrender.com/api/v1/auth',{
            method:'post',
            credencials: 'include',
            body:JSON.stringify({firstName, lastName, userName, email, password}),
            headers: {
                'content-Type': 'application/json'
            }
            
        })
        result = await result.json()
        console.warn(result)
        console.log(result)
        let error = result.success
        let token = result.token

        if ( result.success === false){
            document.getElementById("message").innerHTML={error}
            document.getElementById("message").style.color="red"
        }
        else if( result.success === true){
            setTimeout(() => {
                navigate('/profile')
            }, 3000);
            localStorage.setItem("token", token )
            document.getElementById("message").innerHTML="You have successfully Registered"
        }
    }

    function valid_Call(){
        if( confirm === password ){
            document.getElementById("message").innerHTML="Password match"
            document.getElementById("message").style.color="green"
        }
        else{
            document.getElementById("message").innerHTML="Password does not match"
            document.getElementById("message").style.color="red"
        }
    }

    setTimeout(() => {
        valid_Call()
    });

    return(
        <div className='registerbody'>
            <div className="sub-registerbody">
                <form onSubmit={handleLogin} action="/profile">
                    <label htmlFor="">First Name</label>
                    <input type="text" placeholder='First Name' onChange={(e) => ffunc(e.target.value)} required />

                    <label htmlFor="">Last Name</label>
                    <input type="text" placeholder='Last Name' onChange={(e) => lfunc(e.target.value)} required />

                    <label htmlFor="">User Name</label>
                    <input type="text" placeholder='User Name' onChange={(e) => ufunc(e.target.value)} required />

                    <label htmlFor="">E-mail</label>
                    <input type="email" placeholder='E-mail' onChange={(e) => efunc(e.target.value)} required />

                    <label htmlFor="" >Password</label>
                    <input type="password" placeholder='Password' onChange={(e) => pfunc(e.target.value)} required />

                    <label htmlFor="">Confirm Password</label>
                    <input type="password" placeholder='Confirm Password' id='com_password' onChange={(e) => cfunc(e.target.value)} required />

                    <span id='message'></span>
                    <input type="submit" value="Register" className='submit' />
                </form>
            </div>
        </div>
    )
}

export default RegisterBody;