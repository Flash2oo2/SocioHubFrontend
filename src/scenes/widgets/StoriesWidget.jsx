import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
    Box,
    Typography,
    useTheme,
    CardMedia,
    Avatar,
    useMediaQuery,
    Badge,
    IconButton,
    InputBase
} from "@mui/material"
import FlexBetween from "../../components/FlexBetween"
import {
    AddCircle,
    EditOutlined,
    DeleteOutlined
} from "@mui/icons-material"
import Dropzone from "react-dropzone"

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { setStories } from "../../state"
import StoryWidget from "./StoryWidget"
import baseUrl from "../../baseUrl"



const StoriesWidget = ({ userId, isProfile = false }) => {


    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const storyWidth = isNonMobileScreens ? "580px" : "100%";

    const token = useSelector((state) => state.token);
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);

    const [description, setDiscription] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const medium = palette.neutral.medium;
    const stories = useSelector((state) => state.stories);
    const { picturePath: userPicture } = useSelector((state) => state.user);
    const handleClickOpen = () => {
        setOpen(true);
        console.log(stories);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", description);
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }



        const response = await fetch(`${baseUrl}story`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        })

        const stories = await response.json();
        dispatch(setStories({ stories }));
        setImage(null);
        setDiscription("");
        handleClose();

    };


    const getStories = async () => {
        const response = await fetch(`${baseUrl}story`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setStories({ stories: data }));
    }

    const getUserStories = async () => {
        const response = await fetch(`${baseUrl}story/${userId}/stories`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setStories({ stories: data }));
    }

    useEffect(() => {
        if (isProfile) {
            getUserStories();
        }
        else {
            getStories();
        }
    }, [])




    return (
        <>
            <Typography sx={{ fontWeight: "500", marginBottom: "0.25rem" }}>
                {isProfile && "User "}Stories
            </Typography>
            <Box display="flex"
                flexDirection="row"
                mb="1rem"
                gap="0.5rem"
                sx={{
                    overflow: "auto", maxWidth: `${storyWidth}`
                    , whiteSpace: "nowrap",
                    "&::-webkit-scrollbar": {
                        display: "none"
                    }
                }}


            >

                {/* <Box>
                <ImageListItem>
                    <img width="20%"
                        height="auto"
                        style={{ borderRadius: "1.25rem", marginTop: "0.75rem" }}
                        src="https://res.cloudinary.com/dljzfnas0/image/upload/v1676456976/SocioHub/s1ljupms7hanulrmxriu.jpg"
                    />
                    <ImageListItemBar>
                        <AddCircleOutline
                            fontSize="large" />
                    </ImageListItemBar>
                </ImageListItem>
            </Box> */}


                {
                    isNonMobileScreens && _id === userId ? (

                        <Box width="6rem!important"

                            height="9rem"
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                            paddingLeft="0.5rem"
                            paddingTop="0.5rem"
                            paddingBottom="0.5rem"
                            paddingRight="0.5rem"
                            alignItems="flex-start"
                            borderRadius="1.00rem"
                            color="whitesmoke"
                            onClick={handleClickOpen}

                            sx={{
                                backgroundSize: "6rem 9rem",
                                backgroundImage: `url(${userPicture})`
                            }}
                        >

                            <AddCircle
                                fontSize="large" />

                            <Typography >
                                Add to Story
                            </Typography>
                        </Box>


                    )
                        : (<>
                            {userId === _id && (<Badge
                                onClick={handleClickOpen}
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <AddCircle fontSize="large" sx={{ position: "relative", top: "-1rem", marginRight: "1.5rem" }} />
                                }
                            >
                                <Box display="flex"
                                    flexDirection="column"
                                    justifyContent="space-between"

                                    sx={{ height: "5rem" }}
                                >
                                    <Avatar alt="Travis Howard" src={userPicture}
                                        sx={{ height: 60, width: 60, marginRight: "1rem" }}
                                    />
                                    <Typography >Your Story</Typography>
                                </Box>
                            </Badge>
                            )
                            }

                        </>)
                }

                {
                    stories && stories.map(({
                        _id,
                        userId,
                        firstName,
                        lastName,
                        description,
                        location,
                        picturePath,
                        userPicturePath,

                    }) => <StoryWidget
                            storyId={_id}
                            storyUserId={userId}
                            name={`${firstName} ${lastName}`}
                            description={description}
                            location={location}
                            picturePath={picturePath}
                            userPicturePath={userPicturePath}
                        />)

                }






                <Dialog open={open} onClose={handleClose} >
                    <DialogTitle>Create Your Story</DialogTitle>
                    <DialogContent >
                        {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText> */}
                        <InputBase
                            placeholder="What's on your mind..."
                            onChange={(e) => setDiscription(e.target.value)}
                            value={description}
                            sx={{
                                width: "100%",
                                backgroundColor: palette.neutral.light,
                                borderRadius: "2rem",
                                padding: "1rem 2rem",
                            }}
                        />
                        <Box
                            border={`1px solid ${medium}`}
                            borderRadius="5px"
                            mt="1rem"
                            p="1rem"
                        >
                            <Dropzone
                                acceptedFiles=".jpg,.jpeg,.png"
                                multiple={false}
                                onDrop={(acceptedFiles) =>
                                    setImage(acceptedFiles[0])
                                }
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <FlexBetween>
                                        <Box
                                            {...getRootProps()}
                                            border={`2px dashed ${palette.primary.main}`}
                                            p="1rem"
                                            width="100%"
                                            sx={{ "&:hover": { cursor: "pointer" } }}
                                        >
                                            <input {...getInputProps()} />
                                            {!image ? (
                                                <p>Add Image Here</p>
                                            ) : (
                                                <FlexBetween>

                                                    <Typography>{image.name}</Typography>
                                                    <EditOutlined />
                                                </FlexBetween>
                                            )}
                                        </Box>
                                        {image && (
                                            <IconButton onClick={() => setImage(null)}
                                                sx={{ width: "15%" }}
                                            >
                                                <DeleteOutlined />
                                            </IconButton>
                                        )}
                                    </FlexBetween>
                                )}
                            </Dropzone>

                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handlePost}>Create</Button>
                    </DialogActions>
                </Dialog>



            </Box >
        </>
    )
}

export default StoriesWidget;