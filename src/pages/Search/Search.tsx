import './search.css';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {searchIconStyle} from "../../style/style";
import ProfileSearchCard from "../../components/ProfileSearchCard/ProfileSearchCard";
import {useState} from "react";
import useFilterData from "../../hooks/useFilterData";

const SearchInput = ({handleChangeSearchWord}: { handleChangeSearchWord: (event: any) => void }) => {
    return <div className="search__searchInput">
        <div className="search__searchInput__searchIcon">
            <SearchRoundedIcon style={searchIconStyle}/>
        </div>
        <section className="search__searchInput__container">
            <input type="text" placeholder="Search" onChange={handleChangeSearchWord}/>
        </section>
    </div>
}

const SearchResultContainer = ({searchWord}: { searchWord: string }) => {
    const {filteredProfileData, loading, error} = useFilterData(searchWord, "profile");
    return <section
        className={filteredProfileData?.length === 0
            ? "search__searchResult displayNone"
            : "search__searchResult displayFlex"}>
        {!loading && !error && filteredProfileData?.map((profile, index) =>
            <ProfileSearchCard
                key={index}
                profile={profile}
            />)}
    </section>
}

const Search = () => {
    const [searchWord, setSearchWord] = useState<string>('');
    const handleChangeSearchWord = (event: any): void => {
        event.preventDefault();
        setSearchWord(event.target.value);
    };
    return <section className="search">
        <SearchInput handleChangeSearchWord={handleChangeSearchWord}/>
        <SearchResultContainer searchWord={searchWord}/>
    </section>
}

export default Search;