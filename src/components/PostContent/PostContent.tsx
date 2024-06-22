import './postContent.css';

type PostContentPropType = {
    textContent: string | null;
    attachment: any | null;
}

const PostContent = ({textContent, attachment}: PostContentPropType) => {
    return <section className="postContent">
        {textContent && <p className="postContent__textContent">{textContent}</p>}
        {attachment && <section className="postContent__attachmentContainer">
            {attachment}
        </section>}
    </section>
}

export default PostContent;