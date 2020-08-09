import React, { Component } from 'react';
import SingleComponent from '../SingleComponent/SingleComponent';
import './ListComponents.css';

class ListComponents extends Component {
    state={
        data:[],
        role:"",
        voted:"",
        votedto:"",
        token:""
    }
    static getDerivedStateFromProps(nextProps,prevState){
        return {
            data:nextProps.info,
            role:nextProps.role,
            voted:nextProps.voted,
            votedto:nextProps.votedto,
            token:nextProps.token
        };
    }
    onvoteddata=(event)=>{
        this.props.onDatareceivedfromList({event});
    }
    onDataReceived=()=>{
        if(this.state.data.length>0){
            return this.state.data.map((e,i)=>{
                return <SingleComponent data={e} role={this.state.role}  key={i} voted={this.state.voted} votedto={this.state.votedto} token={this.state.token} onVotedData={this.onvoteddata}/>
            })
        }
    }
    render() { 
        return ( 
            <div className="list-comp-div">
                {this.onDataReceived()}
            </div>
         );
    }
}
 
export default ListComponents;