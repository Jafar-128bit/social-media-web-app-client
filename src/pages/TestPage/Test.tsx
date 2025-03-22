import './test.css';
import {VideoContainerTemplate} from "../../template/indexTemplate";
import videoFile from "../../assets/videoPost/videoPost_01.mp4";

const Test = () => {
    return <section className="testArea">
        <VideoContainerTemplate videoData={[{type: "video", url: videoFile}]}/>
    </section>
}

export default Test;