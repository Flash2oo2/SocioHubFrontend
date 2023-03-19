import { Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../navbar";
import FriendListWidget from "../widgets/FriendListWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import UserWidget from "../widgets/UserWidget";
import ScrollToTopFab from "../../components/ScrollToTopFab";
import WidgetWrapper from "../../components/WidgetWrapper";
import UserImage from "../../components/UserImage";
import StoryWidget from "../widgets/StoryWidget";
import StoriesWidget from "../widgets/StoriesWidget";
import baseUrl from "../../baseUrl";


const ProfilePage = () => {
    const backgroundProfilePic = ["https://res.cloudinary.com/dljzfnas0/image/upload/v1677337288/SocioHub/5305323_vs782q.jpg",
        "https://res.cloudinary.com/dljzfnas0/image/upload/v1677337294/SocioHub/circuit_network_abstract_shape_in_diagonal_shinny_background_wwvjgc.jpg",
        "https://res.cloudinary.com/dljzfnas0/image/upload/v1677337307/SocioHub/low_poly_banner_design_1711_ltnwif.jpg"
    ];
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state) => state.token)
    const loggedInUserId = useSelector((state) => state.user._id);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)")

    const getUser = async () => {
        const response = await fetch(`${baseUrl}users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setUser(data);
    }

    useEffect(() => {
        getUser();
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    if (!user)
        return null;

    return (
        <Box>
            <Navbar />
            {isNonMobileScreens &&
                (<Box display="flex" flexDirection="column" alignItems="center" marginBottom="-3rem">
                    <Box sx={{ height: "240px", width: "100%", overflow: "hidden", position: "relative", paddingLeft: "20%", paddingRight: "20%", marginTop: "2rem", }}>
                        <img src={backgroundProfilePic[1]} width="100%" height="auto" />

                    </Box>
                    <Box display="flex" flexDirection="column" alignItems="center"
                        sx={{ position: "relative", top: "-50px", }}>
                        <Box sx={{ border: "solid 4px white", borderRadius: "50%" }}>
                            <UserImage image={user.picturePath} size="100px" />

                        </Box>
                        <Typography fontSize="20px" fontWeight="500">{`${user.firstName} ${user.lastName}`}</Typography>
                    </Box>

                </Box>)}
            <Box width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}
                >
                    <UserWidget userId={userId} picturePath={user.picturePath} />
                    <Box m="2rem 0" />
                    <FriendListWidget userId={userId} />
                </Box>

                <Box flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem "}
                >
                    <StoriesWidget userId={userId} isProfile={true} />
                    {loggedInUserId === userId && (<MyPostWidget picturePath={user.picturePath} />)}
                    <Box m="2rem 0" />
                    <PostsWidget userId={userId} isProfile />
                </Box>

            </Box>
            <ScrollToTopFab />
        </Box >)
};

export default ProfilePage;