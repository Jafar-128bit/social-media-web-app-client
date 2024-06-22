import './hashtagWordList.css';
import {useCallback, useEffect, useState} from "react";
import {HashtagWithCounts} from "../../type/type";
import {fetchHashtagData} from "../../utils/utils";

type PropSpecialWordType = {
    searchWord: string;
    handleSelectSuggestion: (suggestion: string, wordType: "hashtag" | "mention") => void;
}

const HashtagWordList = ({searchWord, handleSelectSuggestion}: PropSpecialWordType) => {
    const [filteredHashtagData, setFilteredHashtagData] = useState<HashtagWithCounts[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const debouncedSearch = useCallback(async (term: string) => {
        try {
            setLoading(true);
            const data = await fetchHashtagData(term);
            setFilteredHashtagData(data);
            setLoading(false);
            setError('');
        } catch (error: any) {
            if (error.message === "No user found!") setError('User not found');
            else setError('Failed to fetch profile data');
            setLoading(false);
        }
    }, []);
    const fetchData = async () => {
        try {
            setLoading(true);
            await debouncedSearch('');
        } catch (error: any) {
            if (error.message === "No user found!") setError('User not found');
            else setError('Failed to fetch profile data');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        debouncedSearch(searchWord);
    }, [searchWord, debouncedSearch]);

    return <div className="hashtagWordList noScroll">
        {filteredHashtagData.map((hashtag: HashtagWithCounts, index: number) => <button
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