import React from 'react'
import './login.css';
import $ from 'jquery'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
    this.handelchange = this.handelchange.bind(this)
    this.LoginHandler = this.LoginHandler.bind(this)
  }
  //to send req to server to check user data to login 
  LoginHandler() {
    var data = {
      userPass: this.state.password,
      userMail: this.state.email
    }
    $.ajax({
      type: "POST",
      url: "/login",
      data: data,
      success: (res) => {
        //will send to homepage
        console.log(this.props)
        // this.props.toggleuser()
        window.location.href = "/"
        localStorage.setItem("user-id",res.userId)
      },
      error: function (error) {
        if (error.status === 410) {
          //alert('Empty data')
          document.getElementById("logPass").innerHTML = "<div class='alert alert-danger' role='alert'> You have to enter your email</div>"
        }
        if (error.status === 404) {
          document.getElementById("logPass").innerHTML = "<div class='alert alert-danger' role='alert'> Invaild Username</div>"
          //alert('user not existed')
          console.log(error.responseText)
        }
        if (error.status === 400) {
          //alert('wrong password')
          document.getElementById("logPass").innerHTML = "<div class='alert alert-danger' role='alert'> Wrong Password</div>"
        }
      }
    })
  }
  handelchange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.props.hello)
  }
  componentDidMount() {
    document.documentElement.scrollTop = 0;
  }
  render() {
    return (
      <div className="test">
        <div className="row">
          <div id="signin" className="col-sm-4 left form-group">
            <form action="#">
              <br></br>
              <br></br>
              <h3 id="signuptitle">Do you have an account</h3>
              <h3>sign in here</h3>
              <div>
                <label>Your Email</label>
                <input type="email" className="form-control inputhover" name="email" placeholder="Email" onChange={this.handelchange} />
              </div>
              <div>
                <label>Password</label>
                <input type="password" className="form-control inputhover" name="password" onChange={this.handelchange} placeholder="Password" />
              </div>
              <div style={{ "marginTop": '12px' }}>
                <small id="logPass"></small>
                <input type='button' value='Signin' onClick={this.LoginHandler} className="btn btn-secondary" style={{ "display": 'inline-block', "marginRight": '10px' }}></input>
                <small id="LoginupSwitch" className="form-text text-muted" style={{ "display": 'inline-block' }} onClick={this.props.toggleLogin}>Do not have an account</small>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}


export default Login;