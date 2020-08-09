import React, { Component } from 'react';
import swt from 'sweetalert';
import axios from 'axios';
import'./Addhacker.css';
class Addhacker extends Component {
    state = {
        name:"",
        elevel:"",
        csolved:"",
        expert1:"",
        expert1val:"",
        expert2:"",
        expert2val:"",
        expert3:"",
        expert3val:"",
        expert4:"",
        expert4val:"",
        token:""
     }
     static getDerivedStateFromProps(nextProps,prevState){
         if(nextProps.token!==prevState.token){
             return {
                 token:nextProps.token
             }
         }
         else{
             return null;
         }

     }
     onNameChange=(event)=>{
         this.setState({name:event.target.value});
     }

     onCsolvedChange=(event)=>{
         this.setState({csolved:event.target.value});
     }

     onExpertiseChange=(event)=>{
         this.setState({elevel:event.target.value});
     }

     onsub1change=(event)=>{
         this.setState({expert1:event.target.value});
     }

     onsub1valuechange=(event)=>{
         this.setState({expert1val:event.target.value});
     }

     onsub2change=(event)=>{
        this.setState({expert2:event.target.value});
    }

    onsub2valuechange=(event)=>{
        this.setState({expert2val:event.target.value});
    }
     onsub3change=(event)=>{
         this.setState({expert3:event.target.value});
     }

     onsub3valuechange=(event)=>{
         this.setState({expert3val:event.target.value});
     }

     onsub4change=(event)=>{
        this.setState({expert4:event.target.value});
    }

    onsub4valuechange=(event)=>{
        this.setState({expert4val:event.target.value});
    }

    onCancelClick=(event)=>{
        this.props.onrevokeadd({clicked:true});
    }

    onAddClick=()=>{
        if(this.state.name!=="" && this.state.csolved!=="" && this.state.elevel!==""){
            if((this.state.expert1!=="" || this.state.expert1val!=="")||(this.state.expert2!=="" || this.state.expert2val!=="")||(this.state.expert3!=="" || this.state.expert3val!=="")||(this.state.expert4!=="" || this.state.expert4val!=="")){
                if((this.state.elevel<1||this.state.elevel>5)||(this.state.expert1val<1||this.state.expert1val>5)||(this.state.expert2val<1||this.state.expert2val>5)||(this.state.expert3val<1||this.state.expert3val>5)||(this.state.expert4val<1||this.state.expert4val>5)){
                    swt({
                        title:"warning",
                        text:"expertise level should be i range of 1-5",
                        icon:"warning",
                        dangerMode:true,
                        timer:"3000"
                    })
                }
                let expertise=[];
                expertise.push([this.state.expert1,this.state.expert1val]);
                expertise.push([this.state.expert2,this.state.expert2val]);
                expertise.push([this.state.expert3,this.state.expert3val]);
                expertise.push([this.state.expert4,this.state.expert4val]);
                axios.post("https://vote-hacker.herokuapp.com/user/add",{name:this.state.name,solved:this.state.csolved,level:this.state.elevel,expert:expertise},{
                    headers:{
                        token:this.state.token
                    }
                }).then((res)=>{
                    swt({
                        title:"Done",
                        text:"Hacker added",
                        icon:"success",
                        dangerMode:false,
                        timer:"2000"
                    })
                    this.props.onAddedDone({data:res.data.data});
                }).catch((err)=>{
                    console.log(err);
                })
            }else{
                swt({
                    title:"Error",
                    text:"Fields can't be NULL or Empty",
                    icon:"error",
                    dangerMode:true,
                    timer:"3000"
                })
            }
        }else{
            swt({
                title:"Error",
                text:"Fields can't be NULL or Empty",
                icon:"error",
                dangerMode:true,
                timer:"3000"
            })
        }
    }
    render() { 
        return ( 
            <div className="secondary-add-div">
                <div className="for-margin">
                    <label htmlFor="hacker-name">Name:</label>
                    <input onChange={this.onNameChange} type="text" id="hacker-name" value={this.state.name}/>
                    <label htmlFor="hacker-expertl">Expertise Level:</label>
                    <input onChange={this.onExpertiseChange} type="number" id="hacker-expertl" value={this.state.elevel}/>
                    <label htmlFor="hacker-solved">Challenges Solved</label>
                    <input onChange={this.onCsolvedChange} type="number" id="hacker-solved" value={this.state.csolved}/>
                    <label htmlFor="hacker-sub1">Experitse</label><br/>
                    <div>
                        <input placeholder="Language" onChange={this.onsub1change} type="text" id="hacker-sub1" value={this.state.expert1}/>:<input onChange={this.onsub1valuechange} type="number" id="hacker-sub11" placeholder="expertise level" value={this.state.expert1val}/>
                        <input placeholder="Language" onChange={this.onsub2change} type="text" id="hacker-sub2" value={this.state.expert2}/>:<input onChange={this.onsub2valuechange} type="numbr" id="hacker-sub21" placeholder="expertise level" value={this.state.expert2val}/>
                        <input placeholder="Language" onChange={this.onsub3change} type="text" id="hacker-sub3" value={this.state.expert3}/>:<input onChange={this.onsub3valuechange} type="number" id="hacker-sub31" placeholder="expertise level" value={this.state.expert3val}/>
                        <input placeholder="Language" onChange={this.onsub4change} type="text" id="hacker-sub4" value={this.state.expert4}/>:<input onChange={this.onsub4valuechange} type="number" id="hacker-sub41" placeholder="expertise level" value={this.state.expert4val}/>
                    </div>
                </div>
                <div className="add-div-admin">
                    <button className="admin-cancel-but" type="button" onClick={this.onCancelClick}>Cancel</button>
                    <button className="admin-save-but" type="button" onClick={this.onAddClick}>Add</button>
                </div>
            </div>
         );
    }
}
 
export default Addhacker;