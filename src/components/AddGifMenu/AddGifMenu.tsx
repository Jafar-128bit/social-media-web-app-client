import './addGifMenu.css';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import {
    Grid,
} from '@giphy/react-components'
import {GiphyFetch} from '@giphy/js-fetch-api'
import {ChangeEvent, SyntheticEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {useLocation} from 'react-router-dom';

import {togglePopUp} from "../../store/slices/popUpSlices";
import {addGifAttachment} from "../../store/slices/gifAttachmentSlice";
import {GifFileType} from "../../type/type";

const gf = new GiphyFetch('Ykl4Oepbeo5FKXDcX8oImZj7blSh5mBS');


const AddGifMenu = () => {
    const dispatch = useDispatch();
    const location = useLocation().pathname.split("/")[1];

    const [searchKey, setSearchKey] = useState<string>('');
    const fetchGifsSearch = (offset: number) => gf.search(searchKey, {offset, limit: 8});
    const fetchGifsTrending = (offset: number) => gf.trending({offset, limit: 8});

    const fetchGifs = () => {
        if (searchKey.length !== 0) return fetchGifsSearch;
        else return fetchGifsTrending;
    };
    const handleSearchKeyChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearchKey(event.target.value);
    };
    const handleCloseGifMenu = (): void => {
        dispatch(togglePopUp({actionName: "addGif", actionArgument: false}));
        if (location !== "create") {
            dispatch(togglePopUp({actionName: "addCommentMenu", actionArgument: true}));
        } else {
            dispatch(togglePopUp({actionName: "addNewPostMenu", actionArgument: true}));
        }
    };
    const handleSetGifFile = async (gif: any, e: SyntheticEvent<HTMLElement, Event>): Promise<void> => {
        e.preventDefault();
        const {width, height, size, url}: GifFileType = gif.images.preview_webp;
        dispatch(addGifAttachment({
            gif: {width, height, size, url},
            altText: gif.alt_text,
        }));
        dispatch(togglePopUp({actionName: "addGif", actionArgument: false}));
        if (location !== "create") {
            dispatch(togglePopUp({actionName: "addCommentMenu", actionArgument: true}));
        } else {
            dispatch(togglePopUp({actionName: "addNewPostMenu", actionArgument: true}));
        }
    };

    return <div className="addGifMenu">
        <h2 className="addGifMenu__title">Choose a GIF</h2>
        <button className="addGifMenu__closeBtn" onClick={handleCloseGifMenu}>
            Cancel
        </button>
        <section className="addGifMenu__headingContainer">
            <div className="addGifMenu__searchBar">
                <section className="addGifMenu__searchBar__iconContainer">
                    <SearchRoundedIcon style={{color: "var(--colorGray4)"}}/>
                </section>
                <section className="addGifMenu__searchBar__inputContainer">
                    <input
                        type="text"
                        placeholder="Search in GIPHY"
                        value={searchKey}
                        onChange={handleSearchKeyChange}
                    />
                </section>
            </div>
        </section>
        <section className="addGifMenu__searchGifListContainer noScroll">
            <Grid
                key={searchKey}
                width={680}
                columns={2}
                borderRadius={8}
                onGifClick={handleSetGifFile}
                fetchGifs={fetchGifs()}
            />
        </section>
    </div>
}

export default AddGifMenu;