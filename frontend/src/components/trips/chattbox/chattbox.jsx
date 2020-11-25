import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Avatar from '@material-ui/core/Avatar';
export default function ScrollDialog({ chatBoxData, componentDidM, name }) {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState("paper");
    const [searchValue, setSearchValue] = React.useState("");
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value)
    }

    const handleButtonClick = async (e) => {
        // e.preventDefault()

        fetch('/getuserinfo', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: localStorage.getItem("user-id") }),
        })
            .then(res => res.json())
            .then(user => {
                fetch('/addchatRoom', {
                    method: 'POST', // or 'PUT'
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, msg: { name: user.userName, comment: searchValue } }),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        setSearchValue("")
                        componentDidM()
                        // this.setState({ chatBoxData: data.chatData })
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });

            })


    }

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div>
            <Button variant='contained' size="large" onClick={handleClickOpen("paper")}>Click to chat</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Chat here</DialogTitle>
                <DialogContent dividers={scroll === "paper"}>
                    <div >
                        <DialogContentText
                            id="scroll-dialog-description"
                            ref={descriptionElementRef}
                            tabIndex={-1}
                        >
                            {/* map over the data here */}
                            {
                                chatBoxData.length ?
                                    chatBoxData.map(ele => {
                                        return (
                                            <div style={{ marginBottom: "15px" }}>
                                                <div style={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                                                    <Avatar sizes="small" style={{ marginRight: "5px" }}>{ele.img ? <img style={{ width: "50px", height: "50px" }} src={ele.img} /> : ele.name[0]}</Avatar>
                                                    <h5 style={{ textAlign: "left" }}>{ele.name}</h5>
                                                </div>
                                                <p style={{ marginLeft: "50px" }}>{ele.comment}</p>
                                            </div>
                                        )
                                    })
                                    :
                                    <div>no chat yet</div>
                            }
                        </DialogContentText>
                    </div>
                </DialogContent>
                <DialogActions style={{ width: "600px" }}>
                    <form noValidate autoComplete="off" onSubmit={e => { e.preventDefault(); handleButtonClick() }} >
                        <TextField value={searchValue} id="standard-basic" label="type here" style={{ width: "400px" }} onChange={handleSearchChange} />
                    </form>
                    <Button color="primary" style={{ marginTop: "20px" }} onClick={handleButtonClick}>
                        comment
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
