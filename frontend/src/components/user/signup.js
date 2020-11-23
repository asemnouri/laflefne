import React, { Component } from 'react';
import './login.css';
import $ from 'jquery'

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            conformPassword: '',
            phoneNo: '',
            urlimage: '',
            checked: true,
            newsCheck: false
        }
        this.LoginHandler = this.LoginHandler.bind(this)
        this.handelchange = this.handelchange.bind(this)
        this.newsLetter = this.newsLetter.bind(this)
    }
    newsLetter() {
        this.setState({
            newsCheck: !this.state.newsCheck
        })
        if (!this.state.newsCheck) { document.getElementById("subscribed").innerHTML = "<div class='alert alert-primary' role='alert'>Thank you for Subscribing to our News Letter</div>" }
        else { document.getElementById("subscribed").innerHTML = "<div></div>" }
    }
    //to get the data for sign in 
    handelchange(e) {
        console.log(e.target.name)
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    componentDidMount() {
        document.documentElement.scrollTop = 0;
    }

    LoginHandler() {
        console.log(this.state.file)
        if (!validateEmail(this.state.email)) {
            document.getElementById("matchPass").innerHTML = "<div class='alert alert-danger' role='alert'>Wrong Email</div>"
        } 
        else
            if (this.state.password === this.state.conformPassword) {
                var username = this.state.firstName + " " + this.state.lastName
                var data = {
                    userName: username, userPass: this.state.password,
                    userMail: this.state.email, userNum: this.state.phoneNo,
                    userfirstName: this.state.firstName,
                    newsLetter: this.state.newsCheck,
                    userimage: this.state.urlimage,
                }
                $.ajax({
                    type: "POST",
                    url: "/signup",
                    data: data,
                    success: function (res) {
                        console.log("it's working")
                        window.location.href = "/"
                        localStorage.setItem("user-id",res.userId)
                    },
                    error: function (error) {
                        if (error.status === 451) {
                            console.log('451')
                            document.getElementById("matchPass").innerHTML = "<div class='alert alert-danger' role='alert'> You have to enter your name</div>"
                        }

                        if (error.status === 411) {
                            document.getElementById("matchPass").innerHTML = "<div class='alert alert-danger' role='alert'> You have to enter your email</div>"
                        }

                        if (error.status === 421) {
                            document.getElementById("matchPass").innerHTML = "<div class='alert alert-danger' role='alert'> You have to enter your password</div>"
                        }
                        if (error.status === 406) {
                            document.getElementById("matchPass").innerHTML = "<div class='alert alert-danger' role='alert'> This email has been used</div>"
                            console.log(error.responseText)
                        }
                    }
                })

            }
            else {
                document.getElementById("matchPass").innerHTML = "<div class='alert alert-danger' role='alert'> passwords don't match</div>"
            }
    }
    render() {

        return (
            <div className="test">
                <div className="row">
                    <div id="signup" className="col-sm-4 right" >
                        <form action="#" className='form1' >
                            <br></br>
                            <br></br>
                            <h4 id="signintitle" style={{ "text-align": "center" }}>New To Our Website</h4>
                            <h4 id="signintitle" style={{ "text-align": "center" }}>Join Us and Signup Here</h4>
                            <div>
                                <label>First Name</label>
                                <input type="string" className="form-control inputhover" onChange={this.handelchange} name="firstName" placeholder="First Name" />
                            </div>
                            <div>
                                <label>Last Name</label>
                                <input type="string" className="form-control inputhover" onChange={this.handelchange} name="lastName" placeholder="Last Name" />
                            </div>

                            <div>
                                <label>Email</label>
                                <input type="email" className="form-control inputhover" onChange={this.handelchange} name="email" placeholder="Email" />
                            </div>
                            <div>
                                <label>Phone Number</label>
                                <input type="string" className="form-control inputhover" onChange={this.handelchange} name='phoneNo' placeholder="Phone Number" />
                            </div>
                            <div>
                                <label>Password</label>

                                <input type="password" className="form-control inputhover" onChange={this.handelchange} name="password" placeholder="Password" />
                            </div>
                            <div>
                                <lable>Confirm Password</lable>
                                <input type="password" className="form-control inputhover" onChange={this.handelchange} name="conformPassword" placeholder="Confirm Password" />
                            </div>
                            <div style={{ "marginTop": '4px', "margin-left": "10%", "margin-right": "10%" }}>
                                <div>
                                    <lable>Put URL link for your image</lable>
                                    <input type="string" className="form-control inputhover" onChange={this.handelchange} name="urlimage" placeholder="URLimage" />
                                </div>
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" value={this.state.newsCheck} onClick={() => this.newsLetter()}></input>
                                <div style={{ "marginBottom": '0' }}>
                                    <label class="form-check-label" for="exampleCheck1">Subscribe To Our News Letter</label>
                                    <small id="subscribed"></small>
                                </div>
                            </div>
                            <div>
                                <small id="matchPass"></small>
                                <input type='button' value='Sign Up!' onClick={this.LoginHandler} className="btn btn-secondary" style={{ "display": 'inline-block', "marginRight": '4px' }}></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}



export default Signup;


function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}