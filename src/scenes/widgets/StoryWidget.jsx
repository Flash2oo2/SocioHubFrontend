import { Box, Typography, useTheme, useMediaQuery, Avatar, Dialog, ImageListItem, ImageListItemBar } from "@mui/material"
import FlexBetween from "../../components/FlexBetween"
import WidgetWrapper from "../../components/WidgetWrapper"
import { useState } from "react"


const StoryWidget = ({
    storyId,
    storyUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath
}) => {

    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { palette } = useTheme();
    // var ppath = picturePath;

    // ppath.replace("upload/", "upload/e_improve,w_600,h_900,c_thumb,g_auto/");
    // console.log(ppath)

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {

                isNonMobileScreens ?
                    (<Box width="6rem!important"
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

                            backgroundImage: `url(${picturePath})`,
                        }}
                    >

                        <Avatar alt="Travis Howard" src={userPicturePath}
                            sx={{ height: 40, width: 40, border: 1, borderColor: "primary.main", borderWidth: 3, borderSpacing: 1 }}
                        />

                        <Typography >
                            {name}
                        </Typography>
                    </Box>) : (

                        <Box display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                            onClick={handleClickOpen}
                            sx={{ height: "5rem", }}
                        >
                            <Avatar alt="Travis Howard" src={userPicturePath}
                                sx={{ height: 60, width: 60, border: 1, borderColor: "primary.main", borderWidth: 3, }}
                            />
                            <Typography>{name}</Typography>
                        </Box >


                    )
            }

            <Dialog open={open} onClose={handleClose} maxWidth={true}  >


                <ImageListItem display="flex" sx={{ margin: "1rem", maxHeight: "800px", maxWidth: "600px" }} >
                    <img
                        width="auto"
                        height="auto"

                        alt="post"
                        style={{ borderRadius: "0.75rem", marginTop: "0.75rem", maxHeight: "560px" }}
                        src={picturePath}
                    />


                    {/* <ImageListItemBar subtitle={"If you're looking for random paragraphs, you've come to the right place. When a random word or a random sentence isn't quite enough, the next logical step is to find a random paragraph. We created the Random Paragraph Generator with you in mind. The process is quite simple. Choose the number of random paragraphs you'd like to see and click the button. Your chosen number of paragraphs will instantly appear."}
                        sx={{
                            background:
                                'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                            paddingLeft: "2rem",
                            paddingRight: "2rem"

                        }}

                        position="bottom"
                    >


                    </ImageListItemBar> */}
                    <Box display="flex" flexDirection="row" sx={{ position: "absolute", top: "1.25rem", left: "0.5rem" }}>
                        <Avatar alt="Travis Howard" src={userPicturePath}
                            sx={{ height: 40, width: 40, border: 1, borderColor: "primary.main", borderWidth: 3, borderSpacing: 1, }}
                        />
                        <Typography color="primary.main" sx={{ position: "relative", top: "0.75rem", paddingLeft: "0.25rem" }}>{name}</Typography>
                    </Box>


                    <Typography sx={{
                        position: "absolute", bottom: "0rem", paddingLeft: "2rem", paddingRight: "2rem",
                        color: "white",
                        background:
                            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                        width: "100%",
                        borderRadius: "0.75rem",
                        borderTopLeftRadius: "0rem",
                        borderTopRightRadius: "0rem",
                        paddingBottom: "1rem",
                        paddingTop: "0.5rem"


                    }}>
                        {description}
                    </Typography>
                </ImageListItem>

                {/* <Box
                        sx={{
                            postion: "absolute",
                            top: "50%",
                            left: "50%"
                        }}
                    >

                        <Typography >
                            Some Random Post
                        </Typography>
                    </Box> */}

            </Dialog>



        </>
    )
}

export default StoryWidget;
