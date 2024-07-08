import './hashtagWordList.css';
import {HashtagWithCounts} from "../../type/type";
import useFilterData from "../../hooks/useFilterData";

type PropSpecialWordType = {
    searchWord: string;
    handleSelectSuggestion: (suggestion: string, wordType: "hashtag" | "mention") => void;
}

const HashtagWordList = ({searchWord, handleSelectSuggestion}: PropSpecialWordType) => {
    const {filteredHashtagData, loading, error} = useFilterData(searchWord, "hashTag");

    return <div className="hashtagWordList noScroll">
        {filteredHashtagData?.map((hashtag: HashtagWithCounts, index: number) => <button
            key={index}
            className="hashtagWordList__hashtagContainer"
            onClick={() => handleSelectSuggestion(`${hashtag.hashtag_text} `, "hashtag")}
        >
            <p className="hashtagWordList__hashtagText">#{hashtag.hashtag_text}</p>
            <p className="hashtagWordList__hashtagCount">{hashtag.hashtag_useCounts}</p>
        </button>)}
    </div>
}

export default HashtagWordList;