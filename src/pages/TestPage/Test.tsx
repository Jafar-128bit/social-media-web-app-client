import './test.css';
// import {VideoContainerTemplate} from "../../template/indexTemplate";
import videoFile from "../../assets/videoPost/videoPost_01.mp4";
import { SunspotLoaderComponent } from "../../components/LoaderComponent/LoaderComponent";

const Test = () => {
    return <section className="testArea">
        {/*<VideoContainerTemplate videoData={[{type: "video", url: videoFile}]}/>*/}
        <SunspotLoaderComponent/>
    </section>
}

export default Test;