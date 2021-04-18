import React from "react";
import axios from './axios'
class  Library extends React.Component { 
    state =  {
        libraries : []
    }
  componentDidMount(){
    // fetch the data to get the library data and update teh cart 
    this.getLibraries()
  }
  getLibraries = async () =>{
    const libraries = await axios.get("https://uhlib.cc/api/libraries/all_libraries")
    // console.log(libraries)   
    this.setState({libraries:libraries.data})
  }
  render () {
    return <div class="ui unstackable items"> 
<<<<<<< HEAD
        {this.state.libraries.slice(0,5).map((item)=>{
            return (
                <div class="item">
                    <div class="image"><img src="" alt="image right here"></img></div>
=======
        {this.state.libraries.map((item)=>{
            return (
                <div class="item">
                    <div class="image">image righr here</div>
>>>>>>> ab009f6a3972505bb340519e53c18656e4c784d8
                    <div class="content">
                        <a class="header">{item.name}</a>
                        <div class="meta">
                            <span>{item.opening_hours}</span>
                        </div>
                        <div class="extra">
                            {item.location}
                        </div>
                    </div>
                </div>
            )
        })}
        
    </div>
    }

}

export default Library;  