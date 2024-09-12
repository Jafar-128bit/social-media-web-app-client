import {useState, useEffect, useCallback} from 'react';
import {HashtagWithCounts, ProfileDataType} from "../type/type";
import {fetchProfileDataArray, fetchHashtagData} from "../utils/utils";

const useFilterData = (searchWord: string, returnData: "hashTag" | "profile") => {
    const [filteredProfileData, setFilteredProfileData] = useState<ProfileDataType[]>([]);
    const [filteredHashtagData, setFilteredHashtagData] = useState<HashtagWithCounts[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const debouncedSearch = useCallback(async (term: string) => {
        try {
            setLoading(true);
            if (returnData === "profile") {
                const data = await fetchProfileDataArray(term);
                setFilteredProfileData(data);
            } else {
                const data = await fetchHashtagData(term);
                setFilteredHashtagData(data);
            }
            setLoading(false);
            setError(null);
        } catch (error: any) {
            if (returnData === "profile") {
                if (error.message === "No user found!") setError('User not found');
                else setError('Failed to fetch profile data');
            }
            setLoading(false);
        }
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            await debouncedSearch('');
        } catch (error: any) {
            if (returnData === "profile") {
                if (error.message === "No user found!") setError('User not found');
                else setError('Failed to fetch profile data');
            }
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        debouncedSearch(searchWord);
    }, [searchWord, debouncedSearch]);

    if (returnData === "profile") return {filteredProfileData, loading, error};
    else return {filteredHashtagData, loading, error};
};

export default useFilterData;
