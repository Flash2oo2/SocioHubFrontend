import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../state";
import baseUrl from "../../baseUrl";

const FriendListWidget = ({ userId }) => {
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);
    const loggedInUserId = useSelector((state) => state.user._id);
    const getFriends = async () => {
        const response = await fetch(
            `${baseUrl}users/${userId}/friends`,
            {
                method: "GET",
                headers: { authorization: `Bearer ${token}` }

            }
        );
        const data = await response.json();
        dispatch(setFriends({ friends: data }));
    };

    useEffect(() => {
        getFriends()
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box m="2rem 0" sx={{
            top: "40px",
            position: "sticky"
        }}>
            <WidgetWrapper
            >



                <Typography
                    color={palette.neutral.dark}
                    variant="h5"
                    fontWeight="500"
                    sx={{ mb: "1.5rem" }}
                >
                    Friend List
                </Typography>
                <Box display="flex" flexDirection="column" gap="1.5rem"
                    sx={{
                        maxHeight: "540px",
                        overflow: "auto",
                        "&::-webkit-scrollbar": {
                            display: "none"
                        }
                    }}
                >

                    {friends.map((friend) => (
                        <Friend key={friend._id}

                            friendId={friend._id}
                            name={`${friend.firstName} ${friend.lastName}`}
                            subtitle={friend.occupation}
                            userPicturePath={friend.picturePath}
                        />
                    )
                    )}

                </Box>


            </WidgetWrapper >
        </Box>
    )
};


export default FriendListWidget;