import React, { Component } from 'react';
// import bcryptjs from 'bcryptjs';
import swt from 'sweetalert';
import axios from 'axios';
import './Login.css'

class Login extends Component {
    state = {
        email:"",
        password:""
    }

    onEmail=(event)=>{
        this.setState({email:event.target.value});
    }
    onPassword=(event)=>{
        this.setState({password:event.target.value});
    }

    onLoginClick=async ()=>{
        let data=this.state;
        // const salt=await bcryptjs.genSalt(10);
        if(data.email===""){
            swt({
                title:"Invalid Email",
                text:"Enter valid email",
                icon:"warning",
                dangerMode:"true"
            })
        }else if(data.password===""){
            swt({
                title:"Password can't be null",
                text:"Enter password",
                icon:"warning",
                dangerMode:"true"
            })
        }else{
            axios.post('https://vote-hacker.herokuapp.com/user/login',{email:data.email,password:data.password}).then((res)=>{
                if(res.data.error){
                    swt({
                        title:"Login Failed",
                        text:res.data.error,
                        icon:'error',
                        dangerMode:true
                    })
                }else{
                    let event=res.data.data;
                     this.props.onLogindone({event});
                }
            }).catch((err)=>{
                console.log(err);
            })
        }
    }
    render() { 
        return ( 
            <div className="login-div-container">
               <label htmlFor="login-email" className="login-email-label">Email</label>
               <input onChange={this.onEmail} id="login-email" type="email" placeholder="Email" value={this.state.email}/>
               <label htmlFor="login-password" className="login-password-label">Password</label>
               <input onChange={this.onPassword} id="login-password" type="password" placeholder="Password" value={this.state.password}/>
               <div className="login-but-conatiner">
                    <button onClick={this.onLoginClick} className="login-but" type="button">Login</button>
               </div>
            </div>
         );
    }
}
 
export default Login;