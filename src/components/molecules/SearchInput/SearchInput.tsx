import './searchInput.css';
import {Input} from '../../atoms/IndexAtoms';
import {SearchOutlined} from "@mui/icons-material";

const SearchInput = () => {
    return <div className="searchInput">
        <span className="searchInput__iconContainer">
            <SearchOutlined style={{
                color: 'var(--colorWhite)',
                fontSize: '28px'
            }}/>
        </span>
        <Input
            inputType="text"
            handleChangeCallback={() => {
            }}
            placeholder="Search here"
            name="searchInput"
            value=""
            onBlur={() => {}}
            inputStyleName="searchInputNavigation"/>
    </div>
}

export default SearchInput;