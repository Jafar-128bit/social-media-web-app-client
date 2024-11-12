import './sliderDotIndicator.css';

type Prop = {
    numberOfPicture: number
    dotIndication: number;
    dotAction?: (index: number) => void;
}

const SliderDotIndicator = ({numberOfPicture, dotIndication, dotAction}: Prop) => {
    return <div className="sliderDotIndicator noScroll">
        {Array.from({length: numberOfPicture}, (_, index) => (
            <div
                key={index}
                className="sliderDotIndicator_dot"
                onClick={() => dotAction ? dotAction(index) : {}}
                style={{
                    background: dotIndication === index ? "var(--colorWhite)" : "",
                    width: dotIndication === index ? "10px" : "",
                    height: dotIndication === index ? "10px" : "",
                }}
            />
        ))}
    </div>
}

export default SliderDotIndicator;