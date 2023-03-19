import { Avatar, AvatarGroup, Typography, useTheme } from "@mui/material";
import { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import baseUrl from "../../baseUrl";


const LikesBadge = ({ likes }) => {
    const [likedUser, setLikedUser] = useState([]);
    const token = useSelector((state) => state.token);
    const { palette } = useTheme();
    const main = palette.neutral.main;

    let x = 0;
    const getLikedUserInfo = async (likeUserId) => {

        const response = await fetch(`${baseUrl}users/${likeUserId}`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await response.json();

        setLikedUser((prevState) => {


            return ([...prevState, { likedUserPicture: data.picturePath, likedUsername: `${data.firstName} ${data.lastName}` }])
        });
        // setLikedUser({ likedUserPicture: data.picturePath, likedUsername: `${data.firstName} ${data.lastName}` })

        // return { likedUserPicture: data.picturePath, likedUsername: `${data.firstName} ${data.lastName}` }



    }

    // useEffect(() => {
    //     getLikedUserInfo(likeUserId);
    // }, [])

    const feedData = () => {


        for (let id in likes) {


            // if (likedUser.length !== i++)
            //     continue;
            getLikedUserInfo(id);


        }
    }

    useEffect(() => {
        if (x !== 0)
            feedData();

        x++;

    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    const Print = () => {
        return (<AvatarGroup max={4} >
            {likedUser.map((user) => <Avatar alt={user.likedUsername} src={user.likedUserPicture} />)}
        </AvatarGroup>
        )

    }

    return (
        <>
            <AvatarGroup max={2}  >
                <Print />
            </AvatarGroup>

            {likedUser[0] && (<Typography color={main}
                sx={{
                    "mt": "0.5rem",
                    "ml": "1rem"
                }}>
                Like by <b>{likedUser[0].likedUsername}</b> and {likedUser.length - 1} others
            </Typography>
            )
            }
        </>


    )

}

export default LikesBadge;