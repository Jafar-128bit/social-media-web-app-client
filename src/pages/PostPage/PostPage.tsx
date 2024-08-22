import './postPage.css';

import {useSearchParams} from 'react-router-dom';
import {useEffect, useMemo, useState} from "react";
import {CommentType, PostType} from "../../type/type";
import Post from "../../components/Post/Post";
import {useSelector} from "react-redux";

const PostPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryValue = searchParams.get('key');
    const postList: PostType[] = useSelector((state: any) => state.postDataSlices);
    const [openPost, setOpenPost] = useState<PostType | null>(null);

    const updateQueryString = (newValue: number): void => setSearchParams({key: `${newValue}`});

    const post = useMemo(() => {
        if (!queryValue) return null;
        return postList.find((post) => post.postId === parseInt(queryValue)) || null;
    }, [postList, queryValue]);

    useEffect(() => {
        setOpenPost(post);
    }, [post, queryValue]);

    return (
        <section className="postPage">
            {openPost && (
                <Post
                    previewType="fullPreview"
                    postType="post"
                    postData={openPost}
                />
            )}
            <section className="postPage__commentContainer">
                {openPost && openPost.comments.map((comment: CommentType, index: number) => <Post
                    key={index}
                    previewType="fullPreview"
                    postType="reply"
                    postData={comment}
                />)}
            </section>
        </section>
    );
};

export default PostPage;