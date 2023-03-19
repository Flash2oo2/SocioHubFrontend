import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
    AddCommentOutlined,
    ExpandMore,
    ExpandLess
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme, } from "@mui/material"
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state";
import UserImage from "../../components/UserImage";
import { InputBase, Avatar, AvatarGroup } from "@mui/material";
import LikesBadge from "./LikesBadge";
import baseUrl from "../../baseUrl";

const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
}) => {

    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserName = useSelector((state) => `${state.user.firstName} ${state.user.lastName}`)

    const loggedInUserImage = useSelector((state) => state.user.picturePath);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
    const [comment, setComment] = useState("");

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;





    const patchLike = async () => {

        const response = await fetch(`${baseUrl}posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId }),
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
        setComment("");
    };

    const addComment = async () => {
        const response = await fetch(`${baseUrl}posts/${postId}/comment`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: loggedInUserId,
                userPicturePath: loggedInUserImage,
                userName: loggedInUserName,
                comment: comment,
            }),
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
        setComment("");
    }



    return (

        <WidgetWrapper m="2rem 0">

            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}

            />
            <Typography color={main} sx={{ mt: "1rem" }}>
                {description}
            </Typography>
            {picturePath && (
                <img
                    width="100%"
                    height="auto"
                    alt="post"
                    style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                    src={picturePath}
                />
            )}
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>

                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>




            <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-start"
                mt="1rem"
                mb="1rem"
            >

                <LikesBadge likes={likes} />




            </Box>

            <FlexBetween mb="1rem">
                {comments.length != 0 && (
                    <Typography
                        onClick={() => setIsComments(!isComments)}
                        fontSize="12px"
                        sx={{
                            "&:hover": {
                                cursor: "pointer"
                            }
                        }}
                    >
                        {!isComments ?
                            (`View all ${comments.length} comments`) :
                            (`Hide all comments`)}
                        {isComments ? <ExpandLess fontSize="small" sx={{
                            position: "absolute"
                        }} /> : <ExpandMore fontSize="small" sx={{
                            position: "absolute"
                        }} />}
                    </Typography>
                )
                }
            </FlexBetween>

            {isComments && (
                <Box mt="1.5rem"
                >
                    <FlexBetween gap="1.5rem" mb="1.0rem">
                        <UserImage image={loggedInUserImage} size="45px" />
                        <InputBase
                            placeholder="Write a Comment..."
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            sx={{
                                width: "100%",
                                height: "1rem",
                                backgroundColor: palette.neutral.light,
                                borderRadius: "2rem",
                                padding: "1rem 2rem",
                            }}
                        />
                        <IconButton disabled={!comment}
                            onClick={addComment}

                        >
                            <AddCommentOutlined fontSize="large" />
                        </IconButton>


                    </FlexBetween>
                    <Box
                        sx={{
                            maxHeight: "400px",
                            overflow: "auto",
                            "&::-webkit-scrollbar": {
                                display: "none"

                            }
                        }}>
                        {comments.map((comment, i) => (
                            <Box key={`${name}-${i}`} m="0.5rem 0" ml="3rem">

                                <Box display="flex"
                                    flexDirection="row"
                                    justifyContent="flex-end"
                                    alignItems="center"
                                    width="fit-content"
                                >
                                    <UserImage image={comment.authorPicturePath} size="45px" />

                                    <Typography sx={{
                                        color: main,
                                        m: "0.5rem 1rem",
                                        pl: "1rem",
                                        backgroundColor: palette.neutral.light,
                                        borderRadius: "1rem",
                                        padding: "0.5rem 1.5rem",
                                        width: "90%",
                                    }}>
                                        <Typography sx={{ color: primary }}>{comment.authorName}</Typography>
                                        {comment.body}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}

                        <Divider />
                    </Box>
                </Box>
            )
            }
        </WidgetWrapper >
    );
};

export default PostWidget;
