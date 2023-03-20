import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import baseUrl from "../../baseUrl";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget"
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress, Box } from "@mui/material";


const PostsWidget = ({ userId, isProfile = false }) => {




    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);
    const [displayedPost, setDisplayedPost] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const getPosts = async () => {
        const response = await fetch(`${baseUrl}posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
        setDisplayedPost(posts.slice(0, 3));
    };

    const getUserPosts = async () => {
        const response = await fetch(
            `${baseUrl}posts/${userId}/posts`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
        setDisplayedPost(posts.slice(0, 3));
    };


    const fetchMoreData = () => {
        if (displayedPost.length === posts.length) {
            setHasMore(false);
            return;
        }
        // a fake async api call like which sends
        // 20 more records in .5 secs
        setTimeout(() => {
            setDisplayedPost(posts.slice(0, displayedPost.length + 3));
        }, 1000);
    };
    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps



    if (!posts.length)
        return (<></>)

    return (
        <>

            <InfiniteScroll
                dataLength={displayedPost.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={
                    <Box sx={{
                        overflow: "auto",
                        "&::-webkit-scrollbar": {
                            display: "none"
                        }
                    }}>
                        <CircularProgress
                            thickness={6}
                            sx={{
                                width: "50%",
                                position: "relative",
                                left: "45%",
                                overflow: "hidden",
                                marginTop: "1rem"
                            }} />
                    </Box>
                }
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >

                {displayedPost.map(
                    ({
                        _id,
                        userId,
                        firstName,
                        lastName,
                        description,
                        location,
                        picturePath,
                        userPicturePath,
                        likes,
                        comments,
                    }) => (
                        <PostWidget
                            key={_id}
                            postId={_id}
                            postUserId={userId}
                            name={`${firstName} ${lastName}`}
                            description={description}
                            location={location}
                            picturePath={picturePath}
                            userPicturePath={userPicturePath}
                            likes={likes}
                            comments={comments}
                        />

                    )

                )}
            </InfiniteScroll>



        </>
    );
};

export default PostsWidget;
