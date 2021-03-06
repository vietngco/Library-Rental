import React from "react";
import axios from './axios'


class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user:{},
            check_term: false
        };
        this.user  = JSON.parse(localStorage.getItem('user'));
        // console.log("this email:", this.user.email);
        this.fetchUser();
    }

    fetchUser = async () =>{
        console.log("fetch user");
        this.user = await axios.get(`https://uhlib.cc/api/users/one/${this.user.user_id}`);
        this.setState({user: this.user.data});
        console.log("HEREKLSDJFKLSDJLF", this.user.data);
    }

    putUser = async (e) =>{
        e.preventDefault();
        this.user = this.state.user;
        this.user.first_name = e.target.elements.first_name.value //
        this.user.middle_initial = e.target.elements.middle_initial.value//
        this.user.last_name = e.target.elements.last_name.value //
        this.user.email_address = e.target.elements.email_address.value
        this.user.phone_number = e.target.elements.phone_number.value//
        this.user.street_name = e.target.elements.street_name.value
        this.user.street_number = e.target.elements.street_number.value //
        this.user.city = e.target.elements.city.value
        this.user.state = e.target.elements.state.value
        this.user.zip_code = e.target.elements.zip_code.value //
        this.user.user_password = e.target.elements.user_password.value
        console.log('form data', this.user);
        console.log(e.target.elements.street_name.value);
        console.log('form data fname', e.target.elements.first_name.value, this.user.id);
        // let response = await axios.put(`https://uhlib.cc/api/users/${this.user.user_id}`, this.user);

        let response = await axios.put(`https://uhlib.cc/api/users/${this.user.id}`, this.user);
        
        console.log("HEREKLSDJFKLSDJLF", response);
    }

    render() {
        return (
            <div className="ui container" style={{marginTop:"20px"}}>
            <div className="hero is-primary">
                 <div className="hero-body container">
              <h4 className="title">User Settings</h4>
            </div>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" integrity="sha512-8bHTC73gkZ7rZ7vpqUQThUDhqcNFyYi2xgDgPDHc+GXVGHXq+xPjynxIopALmOPqzo9JZj0k6OqqewdGO3EsrQ==" crossorigin="anonymous" />

                <form class="ui form" onSubmit={this.putUser} style={{marginLeft:"20px",marginRight:"20px", marginBottom:"20px"}}>
                <div class="three fields">
                    <div class="eight  wide field">
                        <label>First Name</label>
                        <input type="text" name="first_name" placeholder="First Name" onChange={e=> this.setState({user: {...this.state.user, first_name:e.target.value}})} value={this.state.user.first_name}/>
                    </div>
                    <div class="two wide field">
                        <label>Middle Initial</label>
                        <input type="text" name="middle_initial" placeholder="Middle Initial" onChange={e=> this.setState({user: {...this.state.user, middle_initial:e.target.value}})} value={this.state.user.middle_initial} value={this.state.user.middle_initial}/>
                    </div>
                    <div class="eight  wide field">
                        <label>Last Name</label>
                        <input type="text" name="last_name" placeholder="Last Name" onChange={e=> this.setState({user: {...this.state.user, last_name:e.target.value}})}  value={this.state.user.last_name} />
                    </div>
                    </div>
                    <div class="two fields">
                    <div class="field">
                        <label>Email</label>
                        <input type="text" name="email_address" placeholder="Email"value={this.state.user.email_address} onChange={e=> this.setState({user: {...this.state.user, email_address:e.target.value}})} value={this.state.user.email_address}/>
                    </div>
                    <div class="field">
                        <label>Phone Number</label>
                        <input type="text" name="phone_number" placeholder="Phone Number"value={this.state.user.phone_number} onChange={e=> this.setState({user: {...this.state.user, phone_number:e.target.value}})} value={this.state.user.phone_number}/>
                    </div>
                    </div>
                    <div class="two fields">
                    <div class="field">
                        <label>Street Name</label>
                        <input type="text" name="street_name" placeholder="Street Name" value={this.state.user.street_name} onChange={e=> this.setState({user: {...this.state.user, street_name:e.target.value}})} value={this.state.user.street_name}/>
                    </div>
                    <div class="field">
                        <label>Street Number</label>
                        <input type="text" name="street_number" placeholder="Street Number" value={this.state.user.street_number} onChange={e=> this.setState({user: {...this.state.user, street_number:e.target.value}})} value={this.state.user.street_number} />
                    </div>
                    </div>
                    <div class="three fields">
                    <div class="six  wide field">
                        <label>City</label>
                        <input type="text" name="city" placeholder="City" value={this.state.user.city} onChange={e=> this.setState({user: {...this.state.user, city:e.target.value}})} value={this.state.user.city}/>
                    </div>
                    <div class="four wide field">
                        <label>State</label>
                        <input type="text" name="state" placeholder="State" value={this.state.user.state} onChange={e=> this.setState({user: {...this.state.user, state:e.target.value}})} value={this.state.user.state} />
                    </div>
                    <div class="six  wide field">
                        <label>Zipcode</label>
                        <input type="text" name="zip_code" placeholder="Zipcode" value={this.state.user.zip_code} onChange={e=> this.setState({user: {...this.state.user, zip_code:e.target.value}})} value={this.state.user.zip_code}/>
                    </div>
                    </div>
                    <div class="field">
                        <label>Password</label>
                        <input type="password" name="user_password" placeholder="Password" value={this.state.user.user_password} onChange={e=> this.setState({user: {...this.state.user, user_password:e.target.value}})} value={this.state.user.user_password}/>
                    </div>

                    <div class="field">
                        <div class="ui checkbox">
                            <input type="checkbox" required onChange={e=>this.setState({check_term: true})} value={this.state.check_term} />
                            <label>I agree to the Terms and Conditions</label>
                        </div>
                    </div>
                    <button class="ui button" type="submit">Submit</button>
                    
                </form>

            </div>
            </div>
        );
    };
};
export default Settings