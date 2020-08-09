import React, { Component } from 'react';
import {IoIosThumbsUp} from "react-icons/io";
import {AiOutlineDelete} from "react-icons/ai"
import axios from 'axios';
import faker from 'faker';
import swt from 'sweetalert';
import './SingleComponent.css';

class SingleComponent extends Component {
    state={
        _id:"",
        count:"",
        elevel:"",
        expertin:[],
        name:"",
        solved:"",
        role:"",
        click:"",
        voted:"",
        votedto:"",
        token:"",
        editClicked:false,
        editname:"",
        editelevel:"",
        editsolved:"",
        src:faker.image.avatar()
    }
    static getDerivedStateFromProps(nextProps,prevState){
        if(prevState._id!==nextProps.data._id || prevState.voted!==nextProps.voted || prevState.name!=nextProps.data.name|| prevState.elevel!=nextProps.data.elevel || prevState.solved!=nextProps.data.csolved){
            var Click=false;
            if(nextProps.role==="Admin"|| nextProps.voted===true){
                Click=true;
            }
            return {
                _id:nextProps.data._id,
                count:nextProps.data.count,
                solved:nextProps.data.csolved,
                name:nextProps.data.name,
                elevel:nextProps.data.elevel,
                expertin:nextProps.data.expertin,
                role:nextProps.role,
                click:Click,
                voted:nextProps.voted,
                votedto:nextProps.votedto,
                token:nextProps.token,
                editname:nextProps.data.name,
                editelevel:nextProps.data.elevel,
                editsolved:nextProps.data.csolved
            }
        }else{
            return null;
        }
    }
    onlistexpertise=()=>{
        return this.state.expertin.map((e,i)=>{
          return <div key={i}>{e[0]}:{e[1]}</div>
        })
    }

    onClicked=()=>{
        this.setState({click:true});
    }
    onVoted=()=>{
        let count=this.state.count;
        count++;
        axios.post('https://vote-hacker.herokuapp.com/user/votedtohacker',{_id:this.state._id,count},{
            headers:{
                token:this.state.token
            }
        }).then((response)=>{
            if(response.data.data){
                axios.post('https://vote-hacker.herokuapp.com/user/voted',"",{
                    headers:{
                        token:this.state.token
                    }
                }).then((res)=>{
                    if(res.data.data){
                        this.setState({count:count});
                        this.props.onVotedData({count,_id:this.state._id});
                    }
                }).catch((err)=>{
                    console.log(err);
                })
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    onDeleteClick=()=>{
        axios.post("https://vote-hacker.herokuapp.com/user/delete",{_id:this.state._id},{
            headers:{
                token:this.state.token
            }
        }).then((response)=>{
            if(response.data.data){
                swt({
                    title:"Done",
                    text:"Changes are saved",
                    icon:"success",
                    dangerMode:false
                })
                this.props.onVotedData({data:true});
            }else{
                swt({
                    title:"Error",
                    text:"Something went wrond",
                    icon:"error",
                    dangerMode:true
                })
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    onEditClicked=()=>{
       this.setState({editClicked:true,editname:this.state.name,editelevel:this.state.elevel,editsolved:this.state.solved}); 
    }
    
    onNameChange=(event)=>{
        this.setState({editname:event.target.value});
    }

    onElevelChange=(event)=>{
        if(event.target.value<=0 || event.target.value>5){
            swt({
                title:"Error in rating",
                text:"Rating should be in range of 1-5",
                icon:"error",
                dangerMode:true
            })
        }else{
            this.setState({editelevel:event.target.value});
        }
    }

    onExpertChange=(event)=>{
        if(event.target.value<=0){
            swt({
                title:"Error occured",
                text:"Vlaue should be greaterthan or equal 0",
                icon:'error',
                dangerMode:true
            })
        }else{
            this.setState({editsolved:event.target.value});
        }
    }

    onCancleClicked=()=>{
        this.setState({editClicked:false});
    }

    onSaveClicked=()=>{
        if(this.state.editname===""){
            swt({
                title:"Error occured",
                text:"Name cannot be null",
                icon:"error",
                dangerMode:true
            })
        }else{
            axios.post("https://vote-hacker.herokuapp.com/user/saveedit",{
                name:this.state.editname,
                elevel:this.state.editelevel,
                csolved:this.state.editsolved,
                _id:this.state._id
            },{
                headers:{
                    token:this.state.token
                }
            }).then((res)=>{
                if(res.data.data){
                    swt({
                        title:"Done",
                        text:"Changes are saved",
                        icon:"success",
                        dangerMode:false
                    })
                    this.setState({editClicked:false});
                    this.props.onVotedData({data:true});
                }else{
                    swt({
                        title:"Error",
                        text:"Something went wrong",
                        icon:"error",
                        dangerMode:true
                    })
                }
            }).catch(()=>{

            })

        }
    }

    render() { 
    if(this.state.editClicked===false){
            if(this.state.click===false){
                return(
                <div className="before-Click-div" >
                    <div><button className="button-to-click" type="button" onClick={this.onClicked}>{this.state.name}</button></div>
                </div>);
            }else{
                return (
                    <div className="single-comp-div" >
                        <div>
                            <div className="view-div-single" >
                                <img src={this.state.src}  height="80px" width="75px"alt="Unable to load images"/>
                                <div className="view-div-second">
                                    <div className="hacker-name">{this.state.name}</div>
                                    <div className="hacker-level">Expertise level:{this.state.elevel}</div>
                                </div>
                            </div>
                            <div className="mentfor-flex">
                                <div className="chall-solved">Challenges Solved:{this.state.solved}</div>
                            </div>
                            <div className="expert-div-sub">{this.onlistexpertise()}</div>
                            </div>
                            {this.state.role==='Admin'?<div className="admin-last-options">
                                <button className="admin-edit" onClick={this.onEditClicked}>Edit</button>
                                <button className="admin-delete" onClick={this.onDeleteClick}><AiOutlineDelete color="white" size="1.5rem" 
                                /></button>
                            </div>:<div>
                                {this.state.voted===true && this.state.role==='User'?<div className="show-voting">Votes Gained:{this.state.count}</div>:<div className="voted-div-last">
                                    <button className="voted-button" onClick={this.onVoted}><IoIosThumbsUp size="1.4rem" color="white"/></button>
                                </div>}
                            </div>}
                    </div>
                 );
            }
        }else{
            return(
                <div className="single-comp-div">
                    <div className="view-div-single" >
                            <img src={this.state.src }  height="80px" width="75px"alt="Unable to load images"/>
                            <div className="view-div-second">
                                <input onChange={this.onNameChange} className="name-edit" type="text" value={this.state.editname}/>
                                Expertise level:
                                <input onChange={this.onElevelChange} className="expert-edit" type="number" value={this.state.editelevel}/>
                            </div>
                     </div>
                     <div className="mentfor-flex">
                        Challenges Solved:
                        <input onChange={this.onExpertChange} className="challan-solved" type="number" value={this.state.editsolved}/>
                    </div>
                    <div className="expert-div-sub">{this.onlistexpertise()}</div>
                    <button onClick={this.onCancleClicked} className="cancle-edit">Cancel</button>
                    <button onClick={this.onSaveClicked} className="save-edit">Save</button>
                </div>
            )
        }
    }
}
 
export default SingleComponent;