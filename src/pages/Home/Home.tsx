import './home.css';
import FeedPost from "../../components/FeedPost/FeedPost";

const Home = () => {

    return <section className="home noScroll">
        <FeedPost previewType="fullPreview"/>
    </section>;
}

export default Home;