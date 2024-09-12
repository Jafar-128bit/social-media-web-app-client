import {HashtagWithCounts, ProfileDataType} from "../type/type";
import {profileData, hashtagsData} from "../data/data";

export const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                reject(new Error('Failed to read file as data URL'));
            }
        };

        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
};
export const fetchProfileDataArray = (searchTerm: string): Promise<ProfileDataType[]> => {
    return new Promise<ProfileDataType[]>((resolve, reject) => {
        setTimeout(() => {
            const filteredData = profileData.filter((profile) =>
                profile.profileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                profile.username.toLowerCase().includes(searchTerm.toLowerCase())
            );
            if (filteredData.length === 0) reject(new Error("No user found!"));
            else resolve(searchTerm.length === 0 ? [] : filteredData);
        }, 500);
    });
};
export const fetchHashtagData = (searchTerm: string): Promise<HashtagWithCounts[]> => {
    return new Promise<HashtagWithCounts[]>((resolve) => {
        setTimeout(() => {
            const filteredData = hashtagsData.filter((hashtag) => hashtag.hashtag_text.toLowerCase().includes(searchTerm.toLowerCase()));
            const hashtagCountMap: Map<string, number> = new Map();
            for (const hashtag of filteredData) {
                const {hashtag_text} = hashtag;
                if (hashtagCountMap.has(hashtag_text)) {
                    const existingCount = hashtagCountMap.get(hashtag_text)!;
                    hashtagCountMap.set(hashtag_text, existingCount + 1);
                } else hashtagCountMap.set(hashtag_text, 1);
            }

            const hashtagCounts: HashtagWithCounts[] = Array.from(hashtagCountMap, ([hashtag_text, count]) => ({
                hashtag_text,
                hashtag_useCounts: count,
            }));
            resolve(hashtagCounts);
        }, 500);
    });
};
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric', month: 'numeric', day: 'numeric',
    };

    return date.toLocaleDateString('en-US', options);
};
