import React, { Component } from 'react';
import axios from 'axios';
import swt from 'sweetalert';
import bcryptjs from 'bcryptjs';
import './Signup.css';

class Signup extends Component {
    state = { 
        email:"",
        password:"",
        confpassword:""
     }
     onEmailChange=(event)=>{
         this.setState({email:event.target.value});
     }

     onPassword=(event)=>{
         this.setState({password:event.target.value});
     }
     onConfpassword=(event)=>{
         this.setState({confpassword:event.target.value});
     }
     onSignup=async ()=>{
         let data=this.state;
         const salt=await bcryptjs.genSalt(10);
         if(data.email===""){
             swt({
                 title:"Invalid Email",
                 text:"Enter a valid email",
                 icon:"warning",
                 dangerMode:true
             })
         }else if(data.password.length>=8 && data.password===data.confpassword){
             const hashpwd=await bcryptjs.hash(data.password,salt);
             axios.post('https://vote-hacker.herokuapp.com/user/signup',{email:data.email,password:hashpwd}).then((response)=>{
                 if(response.data.error){
                     swt({
                         title:"Signup Failed",
                         text:response.data.error,
                         icon:'error',
                         dangerMode:true
                     })
                 }else{
                    swt({
                        title:"Signup Done",
                        text:'Signed in successfully',
                        icon:'success',
                        dangerMode:true
                    })
                    this.props.onSignupdone();
                 }
             }).catch((err)=>{
                 console.log(err);
             })
             
         }else{
             if(data.password===""){
                 swt({
                     title:"Pasword can't be null",
                     text:"Enter a valid password",
                     icon:"warning",
                     dangerMode:true
                 })
             }else if(data.password!==data.confpassword){
                 swt({
                     title:"Mismatch",
                     text:"Password and Confirm Password does not mach",
                     icon:"warning",
                     dangerMode:true
                 })
             }else{
                 swt({
                     title:"Poor Strength",
                     text:"Password is too short",
                     icon:"error",
                     dangerMode:true
                 })
             }
         }
     }
    render() { 
        return ( 
            <div className="signup-div-container">
                <label className="signup-email-label" htmlFor="signup-email">Email</label>
                <input onChange={this.onEmailChange} id="signup-email" type="email" placeholder="Email" value={this.state.email}/>
                <label  className="signup-passw-label" htmlFor="signup-password">Password</label>
                <input onChange={this.onPassword} id="signup-password" type="password" placeholder="Password" value={this.state.password}/>
                <label className="conf-password-label" htmlFor="conf-password">Confirm Password</label>
                <input onChange={this.onConfpassword} id="conf-password" type="password" placeholder="Confirm Password" value={this.state.confpassword}/>
                <div className="signup-but">
                    <button onClick={this.onSignup} className="signup-button">Signup</button>
                </div>
            </div>
         );
    }
}
 
export default Signup;