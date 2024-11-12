import './postTypeSelectorBar.css';
import {PostTypeButtonTemplate} from "../../template/indexTemplate";
import {PostTypeSelectorType} from "../../type/type";

type Prop = {
    optionData: PostTypeSelectorType[];
}

const PostTypeSelectorBar = ({optionData}: Prop) => {
    return <div className="postTypeSelectorBar">
        {optionData.map((value: PostTypeSelectorType, index: number) => <PostTypeButtonTemplate
            key={index}
            handleCallback={value.handleCallback}
            optionName={value.optionName}
            isSelected={value.isSelected}
        />)}
    </div>
}

export default PostTypeSelectorBar;