import React, { Component } from 'react';
import {MdArrowForward} from 'react-icons/md';
import {MdHome} from 'react-icons/md';
import axios from 'axios';
import swt from 'sweetalert';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Addhacker from './Components/Addhacker/Addhacker';
import ListComponents from './Components/ListComponents/ListComponents';
import './App.css';
class App extends Component {
    state = {
        role:"",
        voted:"",
        data:[],
        token:"",
        votedto:"",
        log:true,
        add:false
    }
    onLogin=()=>{
        this.setState({log:true});
    }
    onSignup=()=>{
        this.setState({log:false});
    }
    onSuccess=()=>{
        this.setState({log:true});
    }

    onLoginsuccess=(event)=>{
        axios.post("https://vote-hacker.herokuapp.com/user/hackers").then((res)=>{
            if(res.error===""){
                swt({
                    title:"Error",
                    text:"Please Check Your Connection",
                    icon:"warning",
                    dangerMode:true
                })
            }else{
                if(event.event.votedto===undefined){
                    this.setState({token:event.event.token,role:event.event.role,voted:event.event.voted,data:res.data.data});
                }else{
        
                    this.setState({token:event.event.token,role:event.event.role,votedto:event.event.votedto,voted:event.event.voted,data:res.data.data});
                }
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    onLogout=()=>{
        this.setState({role:"",voted:"",data:[],token:"",votedto:"",log:true});
    }

    onHomeClicked=()=>{
        axios.post("https://vote-hacker.herokuapp.com/user/hackers").then((res)=>{
            if(res.error===""){
                swt({
                    title:"Error",
                    text:"Please Check Your Connection",
                    icon:"warning",
                    dangerMode:true
                })
            }else{
                this.setState({data:res.data.data,add:false});
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    ondatatohome=(event)=>{
        axios.post("https://vote-hacker.herokuapp.com/user/hackers").then((res)=>{
            if(res.error===""){
                swt({
                    title:"Error",
                    text:"Please Check Your Connection",
                    icon:"warning",
                    dangerMode:true
                })
            }else{
                this.setState({data:res.data.data,voted:true});
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    onAddclicked=()=>{
        this.setState({add:true});
    }
    onCancleClick=()=>{
        this.setState({add:false});
    }
    onaddedhacker=(event)=>{
        this.onHomeClicked();
    }
    render() { 
        let data=this.state;
        if(!data.token){
            return(
                <div className="App-ls-container">
                    <div className="App-main-conatiner">
                        <div className="log-sign">
                            <button onClick={this.onLogin} className="App-login">Login</button>
                            <button onClick={this.onSignup} className="App-signup">Signup</button>
                        </div>
                        <div className="App-data-container">
                        {data.log===true?<div>
                            <Login onLogindone={this.onLoginsuccess}/>
                        </div>:<div>
                            <Signup onSignupdone={this.onSuccess}/>
                        </div>}
                        </div>
                    </div>
                </div>
            );
        }else{
            return(<div className="app-main-container-div">
                <div className="app-banner-container">
                    {data.role==='User'?<div className="app-user-container">
                        <div className="banner-text">Vote Your Favourite Hacker</div>
                        <button type="button" className="user-logout" onClick={this.onLogout}>Logout
                        <MdArrowForward size="0.80rem" /></button>
                    </div>:<div className="app-admin-container">
                        <button type="button" className="home-admin-but" onClick={this.onHomeClicked}><MdHome color="white" style={{background:"#2196f3"}} size="2rem" /></button>
                        <div className="banner-text">Vote Your Favourite Hacker</div>
                        <button type="button" className="Add-hacker" onClick={this.onAddclicked}>Add</button>
                        <button type="button" className="user-logout" onClick={this.onLogout}>Logout
                        <MdArrowForward size="0.80rem" /></button>    
                    </div>}
                </div>
                <div className="hackers-data-viewer">
                    {data.add===false?<ListComponents info={data.data} role={data.role} voted={data.voted} votedto={data.votedto} token={data.token} onDatareceivedfromList={this.ondatatohome}/>:<div className="admin-main-div-add"><Addhacker token={data.token} onAddedDone={this.onaddedhacker} onrevokeadd={this.onCancleClick}/></div>}
                </div>
            </div>)
        }
    }
}
 
export default App;