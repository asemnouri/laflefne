import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom"





const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));


export default function BarButton() {
    const classes = useStyles();
    const [admin, setAdmin] = React.useState(false);
    React.useEffect(() => {
        fetch('/getuserinfo', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: localStorage.getItem("user-id") }),
        })
            .then(res => res.json())
            .then(user => {
                setAdmin(user.admin)
            });
    }, [admin]);

    return (
        <div>
            <div className={classes.root}>
                <ButtonGroup color="primary" aria-label="outlined primary button group" >
                    <div className="buttons" style={{ display: "flex", paddingRight: "10rem"  }}>
                        {console.log(admin)}
                        {
                            !admin ?
                                <div className="first_Tow_Button" style={{ display: "flex", paddingTop: "10px 0px", marginRight: "10rem" }}>

                                    <Link to="/user">
                                        <Button >User Book</Button>
                                    </Link>
                                    <Link to="/user/invitations">

                                        <Button>Invitation</Button>
                                    </Link>
                                </div>
                                :(

                                <div className="buttons" style={{ display: "flex", paddingRight: "10rem" }}>
                                    <div className="first_Tow_Button" style={{ display: "flex", paddingTop: "10px 0px", marginRight: "10rem" }}>

                                        <Link to="/user">
                                            <Button >User Book</Button>
                                        </Link>
                                        <Link to="/user/invitations">

                                            <Button>Invitation</Button>
                                        </Link>
                                    </div>
                                    <div className="last_Tow_Button" style={{ display: "flex", marginLeft: "6rem" }}>
                                        <Link to="/user/users">

                                            <Button>Users</Button>
                                        </Link>
                                        <Link to="/user/addtrip">

                                            <Button>Add new Trip</Button>
                                        </Link>
                                    </div>
                                </div>
                                )
                        }

                    </div>

                </ButtonGroup>
            </div>

        </div>
    )

}

