import React from "react";
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';


class Invite extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',//reciever email
        }
    }
    handleChange = (e) => {
        this.setState({ email: e.target.value });
    }

    handleSubmit = () => {
        { console.log('tripp id: ', this.props.tripId) }
        { console.log('from email: ', this.props.from_email) }
        { console.log('from user name: ', this.props.userName) }
        console.log('To: ', this.state.email)

        fetch('invite-req', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },                 //to_email, userid,from_email,tripId,userName
            body: JSON.stringify({ to_email: this.state.email, userid: this.props.userid, from_email: this.props.from_email, tripId: this.props.tripId, userName: this.props.userName }),
        })
            .then(response => response.json())
            .then(res => {
                alert('Invitation sent successfully')
                console.log('invitation sent')
                console.log(res)
            })
            .catch(err => console.log('Invitation NOT sent, ERR: ', err))

        this.setState({
            email: ''
        })

    }
    render() {
        return (
            <div>
                <TextField
                    id="date"
                    label="Friend email"
                    type="email"
                    name="email"
                    value={this.state.email}
                    placeholder="to: example@gmail.com"
                    onChange={this.handleChange}
                    className='textField'
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button
                    style={{ marginTop: '10px' }}
                    className="textField pad"
                    variant="outlined"
                    color="primary"
                    onClick={this.handleSubmit}  //send Invitation
                    type="submit"
                    size="small">
                    Send
               </Button>

            </div>

        )
    }
}


export default Invite;