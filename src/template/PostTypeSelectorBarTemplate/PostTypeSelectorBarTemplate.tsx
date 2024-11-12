import {PostTypeSelectorBar} from "../../organisms/indexOrganisms";
import {useState} from "react";
import {PostTypeSelectorType, ProfileDataType} from "../../type/type";



const PostTypeSelectorBarTemplate = () => {
    const [postType, setPostType] = useState<0 | 1 | 2 | 3>(0);

    const handleSelectPostType = (type: 0 | 1 | 2 | 3): void => {
        setPostType(type);
    };

    const optionData: PostTypeSelectorType[] = [
        {handleCallback: () => handleSelectPostType(0), optionName: "ALL", isSelected: postType === 0},
        {handleCallback: () => handleSelectPostType(1), optionName: "TEXT", isSelected: postType === 1},
        {handleCallback: () => handleSelectPostType(2), optionName: "PICTURE", isSelected: postType === 2},
        {handleCallback: () => handleSelectPostType(3), optionName: "CLIP", isSelected: postType === 3},
    ];

    return <>
        <PostTypeSelectorBar optionData={optionData}/>
    </>
}

export default PostTypeSelectorBarTemplate;