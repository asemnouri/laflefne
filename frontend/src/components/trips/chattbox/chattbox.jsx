import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Avatar from '@material-ui/core/Avatar';
export default function ScrollDialog() {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState("paper");

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
            <Button onClick={handleClickOpen("paper")}>Click to chat</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Chat here</DialogTitle>
                <DialogContent dividers={scroll === "paper"}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <div style={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                            <Avatar sizes="small" style={{ marginRight: "5px" }}>H</Avatar>
                            <h5 style={{ textAlign: "left" }}>username</h5>
                        </div>
                        <p>content</p>

                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ width: "600px" }}>
                    <form noValidate autoComplete="off" >
                        <TextField id="standard-basic" label="type here" style={{ width: "400px" }} />
                    </form>
                    <Button color="primary" style={{ marginTop: "20px" }}>
                        comment
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
