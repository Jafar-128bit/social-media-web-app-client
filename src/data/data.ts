/* Type Imports */
import {HashtagDataType, PostType, ProfileDataType} from "../type/type";

/* File Imports */
import pic1 from '../assets/profileImages/pic1.jpeg';
import pic2 from '../assets/profileImages/pic2.jpeg';
import pic3 from '../assets/profileImages/pic3.jpeg';
import pic4 from '../assets/profileImages/pic4.jpeg';
import pic5 from '../assets/profileImages/pic5.jpeg';
import pic6 from '../assets/profileImages/pic6.jpeg';
import pic7 from '../assets/profileImages/pic7.jpeg';
import pic8 from '../assets/profileImages/pic8.jpeg';
import pic9 from '../assets/profileImages/pic9.jpeg';
import pic10 from '../assets/profileImages/pic10.jpeg';

export const profileData: ProfileDataType[] = [
    {
        profileId: 1,
        profileName: "John Doe",
        username: "johndoe",
        profileInfo: {
            profileDescription: "Software Engineer | Tech Enthusiast",
            profileLinks: ["https://linkedin.com/in/johndoe", "https://twitter.com/johndoe"],
        },
        profileImage: pic1,
        followers: [2, 3, 4, 5, 8, 9, 10],
        following: [6, 7, 8],
        isPrivate: false,
        isActive: true,
        isVerified: true,
    },
    {
        profileId: 2,
        profileName: "Jane Smith",
        username: "janesmith",
        profileInfo: {
            profileDescription: "Graphic Designer | Art Lover",
            profileLinks: ["https://behance.net/janesmith", "https://instagram.com/janesmith"],
        },
        profileImage: pic2,
        followers: [1, 3, 5, 7, 9, 10],
        following: [4, 6, 8],
        isPrivate: true,
        isActive: true,
        isVerified: false,
    },
    {
        profileId: 3,
        profileName: "Michael Johnson",
        username: "mjohnson",
        profileInfo: {
            profileDescription: "Entrepreneur | Startup Enthusiast",
            profileLinks: ["https://linkedin.com/in/mjohnson", "https://medium.com/@mjohnson"],
        },
        profileImage: pic3,
        followers: [1, 2, 4, 6, 8, 10],
        following: [5, 7, 9],
        isPrivate: false,
        isActive: true,
        isVerified: true,
    },
    {
        profileId: 4,
        profileName: "Emily Davis",
        username: "emilydavis",
        profileInfo: {
            profileDescription: "Data Analyst | Problem Solver",
            profileLinks: ["https://linkedin.com/in/emilydavis", "https://github.com/emilydavis"],
        },
        profileImage: pic4,
        followers: [2, 3, 6, 8, 10],
        following: [1, 3, 5, 7, 9],
        isPrivate: false,
        isActive: true,
        isVerified: false,
    },
    {
        profileId: 5,
        profileName: "David Lee",
        username: "davidlee",
        profileInfo: {
            profileDescription: "Marketing Manager | Growth Hacker",
            profileLinks: ["https://linkedin.com/in/davidlee", "https://twitter.com/davidlee"],
        },
        profileImage: pic5,
        followers: [1, 2, 3, 4, 7, 9, 10],
        following: [2, 4, 6, 8, 10],
        isPrivate: false,
        isActive: true,
        isVerified: true,
    },
    {
        profileId: 6,
        profileName: "Sarah Wilson",
        username: "sarahwilson",
        profileInfo: {
            profileDescription: "UX Designer | Creative Thinker",
            profileLinks: ["https://behance.net/sarahwilson", "https://instagram.com/sarahwilson"],
        },
        profileImage: pic6,
        followers: [2, 3, 4, 5, 8, 10],
        following: [1, 3, 5, 7, 9],
        isPrivate: true,
        isActive: true,
        isVerified: false,
    },
    {
        profileId: 7,
        profileName: "Tom Brown",
        username: "tombrown",
        profileInfo: {
            profileDescription: "Frontend Developer | JavaScript Enthusiast",
            profileLinks: ["https://github.com/tombrown", "https://codepen.io/tombrown"],
        },
        profileImage: pic7,
        followers: [1, 2, 3, 5, 6, 9],
        following: [2, 4, 6, 8, 10],
        isPrivate: false,
        isActive: true,
        isVerified: true,
    },
    {
        profileId: 8,
        profileName: "Jessica Martinez",
        username: "jessicamartinez",
        profileInfo: {
            profileDescription: "Content Writer | Storyteller",
            profileLinks: ["https://linkedin.com/in/jessicamartinez", "https://medium.com/@jessicamartinez"],
        },
        profileImage: pic8,
        followers: [2, 3, 4, 6, 10],
        following: [1, 3, 5, 7, 9],
        isPrivate: false,
        isActive: true,
        isVerified: true,
    },
    {
        profileId: 9,
        profileName: "Robert Chen",
        username: "robertchen",
        profileInfo: {
            profileDescription: "Backend Engineer | Problem Solver",
            profileLinks: ["https://github.com/robertchen", "https://linkedin.com/in/robertchen"],
        },
        profileImage: pic9,
        followers: [1, 2, 3, 5, 6, 7],
        following: [2, 4, 6, 8, 10],
        isPrivate: false,
        isActive: true,
        isVerified: false,
    },
    {
        profileId: 10,
        profileName: "Lisa Taylor",
        username: "lisataylor",
        profileInfo: {
            profileDescription: "Product Manager | User Advocate",
            profileLinks: ["https://linkedin.com/in/lisataylor", "https://twitter.com/lisataylor"],
        },
        profileImage: pic10,
        followers: [2, 3, 4, 5, 6, 8],
        following: [1, 3, 5, 7, 9],
        isPrivate: false,
        isActive: true,
        isVerified: true,
    },
];


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
