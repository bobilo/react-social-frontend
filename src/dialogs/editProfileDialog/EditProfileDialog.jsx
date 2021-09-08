import { useRef } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import axios from "axios";
import './editProfileDialog.css';

export default function EditProfileDialog({ open, user, handleClose}) {
    const desc = useRef();
    const city = useRef();
    const from = useRef();
    const relationship = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put("https://node-social-backend-1990.herokuapp.com/api/users/" + user._id,
                {
                    userId: user._id,
                    desc: desc.current.value,
                    city: city.current.value,
                    from: from.current.value,
                    relationship: relationship.current.value
                });
            window.location.reload();

        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div>
            <Dialog 
                open={open} 
                onClose={handleClose} 
                aria-labelledby="form-dialog-title"
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle id="form-dialog-title">Update Personal Information</DialogTitle>
                <DialogContent>
                    <hr className="editProfiledHr" />
                    <div className="loginRight">
                        <label className="inputLabel">Description:</label>
                        <input ref={desc} defaultValue={user.desc} className="loginInput" />
                        <label className="inputLabel">City:</label>
                        <input ref={city} defaultValue={user.city} className="loginInput" />
                        <label className="inputLabel">From:</label>
                        <input ref={from} defaultValue={user.from} className="loginInput" />
                        <label className="inputLabel">Relationship:</label>
                        <select ref={relationship} placeholder=
                        {
                            user.relationship === 1 ? "Single" 
                            : user.relationship === 2 ? "Married" 
                            : "Complicated"
                        } 
                            className="loginInput"
                        >
                            <option value={user.relationship}>
                                {
                                user.relationship === 1 ? "Single" 
                                : user.relationship === 2 ? "Married" 
                                : "Complicated"
                                }
                            </option>
                            <option value="1">Single</option>
                            <option value="2">Married</option>
                            <option value="3">Complicated</option>
                        </select>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>   
        </div>
    )
}
