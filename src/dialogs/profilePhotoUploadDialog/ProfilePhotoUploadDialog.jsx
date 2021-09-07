import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import { PermMedia, Cancel } from "@material-ui/icons";
import axios from "axios";
import './profilePhotoUploadDialog.css';

export default function ProfilePhotoUploadDialog({ open, user, handleClose}) {
    const [photo, setPhoto] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (photo) {
            const data = new FormData();
            const fileName = Date.now() + photo.name;
            data.append("name", fileName);
            data.append("file", photo);

            try {
                await axios.post("https://node-social-backend-1990.herokuapp.com/api/upload", data);
            
            } catch(err) {
                console.log(err);
            }
            try {
                await axios.put("https://node-social-backend-1990.herokuapp.com/api/users/" + user._id, {userId: user._id, profilePicture: fileName });
                window.location.reload();
    
            } catch(err) {
                console.log(err);
            }
        };
    };

    const resetPhoto = () => setPhoto(null);

    const handleCancel = () => {
        handleClose();
        resetPhoto();
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
                <DialogTitle id="form-dialog-title">Upload Profile Photo</DialogTitle>
                <DialogContent>
                    <hr className="uploadHr" />
                    {photo && (
                        <div className="uploadImgContainer">
                            <img className="uploadImg" src={URL.createObjectURL(photo)} alt="" />
                            <Cancel className="uploadCancleImg" onClick={() => setPhoto(null)} />
                        </div>
                    )}
                    <label htmlFor="photo" className="uploadOption">
                        <PermMedia htmlColor="tomato" className="uploadOptionicon" />
                        <span className="uploadOptionText">Browse photos</span>
                        <input style={{display: "none"}} type="file" id="photo" accept=".png,.jpeg,.jpg" onChange={(e) => setPhoto(e.target.files[0])} />
                    </label>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
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