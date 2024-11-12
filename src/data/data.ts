/* Type Imports */
import {HashtagDataType} from "../type/type";

const generateHashtags = (): HashtagDataType[] => {
    const hashtags: string[] = [
        'love', 'instagood', 'instagram', 'fashion', 'photooftheday', 'art', 'photography', 'beautiful', 'nature', 'picoftheday',
        'travel', 'happy', 'follow', 'cute', 'style', 'instadaily', 'tbt', 'repost', 'summer', 'beauty', 'followme', 'fitness',
        'like4like', 'food', 'instalike', 'explore', 'photo', 'me', 'viral', 'music', 'life', 'friends', 'family', 'fun', 'girl',
        'selfie', 'makeup', 'likeforlikes', 'dog', 'smile', 'explorepage', 'model', 'design', 'motivation', 'handmade', 'lifestyle',
        'likeforlike', 'sunset', 'artist', 'dogsofinstagram', 'ootd', 'foodporn', 'beach', 'followforfollowback', 'drawing', 'amazing',
        'cat', 'instamood', 'igers', 'friendsforever', 'nofilter', 'sky', 'flowers', 'gym', 'wedding', 'moda', 'photographer',
        'follow4follow', 'hair', 'foodie', 'inspiration', 'funny', 'india', 'memes', 'naturephotography', 'baby', 'fyp', 'nails',
        'travelphotography', 'l4l', 'workout', 'likeforfollow', 'f4f', 'illustration', 'followforfollow', 'home', 'instapic', 'vscocam',
        'bestoftheday', 'yummy', 'vsco', 'landscape', 'artwork', 'amor', 'christmas', 'party', 'fit', 'photoshoot', 'girls', 'tattoo'
    ];
    const hashtagsData: HashtagDataType[] = [];

    for (let i = 0; i < 100; i++) {
        const randomHashtagIndex = Math.floor(Math.random() * hashtags.length);
        const hashtagText = hashtags[randomHashtagIndex];
        const hashtag: HashtagDataType = {
            hashtag_id: i + 1,
            hashtagged_user_id: Math.floor(Math.random() * 10),
            hashtagged_post_id: Math.floor(Math.random() * 5),
            hashtag_text: hashtagText,
            hashtag_time_stamp: new Date().toISOString(),
        };
        hashtagsData.push(hashtag);
    }

    return hashtagsData;
};
export const hashtagsData: HashtagDataType[] = generateHashtags();
