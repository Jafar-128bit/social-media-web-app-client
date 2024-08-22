import './altTextMenu.css';


import {motion} from 'framer-motion';
import React, {useState} from "react";
import {updateAltText} from "../../store/slices/attachmentsSlice";
import {useDispatch, useSelector} from "react-redux";
import {togglePopUp} from "../../store/slices/popUpSlices";

const AltTextMenu = ({fileId}: { fileId: string }) => {
    const dispatch = useDispatch();
    const attachmentUrls = useSelector((state: any) => state.attachmentsSlice);

    const [altText, setAltText] = useState<string>(attachmentUrls.files[fileId]?.alt);

    const handleCloseAltText = () => {
        dispatch(togglePopUp({actionName: "addAltTextMenu", actionArgument: false, actionState: undefined}));
        dispatch(togglePopUp({actionName: "addCommentMenu", actionArgument: true}));
    };
    const handleAltTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAltText(event.target.value);
        event.target.style.height = 'auto';
        event.target.style.height = event.target.scrollHeight + 'px';
    };
    const handelSetAltText = () => {
        if (altText !== "") dispatch(updateAltText({fileId: fileId, alt: altText}));
        setAltText("");
        dispatch(togglePopUp({actionName: "addCommentMenu", actionArgument: false}));
        dispatch(togglePopUp({actionName: "addAltTextMenu", actionArgument: true, actionState: undefined}));
    };

    return <motion.div
        className="addAltTextMenu"
        initial={{opacity: 0, scale: 0.85}}
        animate={{opacity: 1, scale: 1}}
        transition={{duration: 0.15}}
    >
        <button className="addAltTextMenu__exitAltTextMenuBtn" onClick={handleCloseAltText}>
            Cancel
        </button>
        <h2 className="addAltTextMenu__exitAltTextTitle">Add Alt Text</h2>
        <section className="addAltTextMenu__altTextMenuContainer">
            <section className="addAltTextMenu__altTextMenuImageContainer">
                <img src={attachmentUrls.files[fileId].src}
                     alt={altText}/>
            </section>
            <section className="addAltTextMenu__altTextInputContainer">
                <textarea
                    className="addAltTextMenu__altTextInputArea"
                    placeholder={
                        attachmentUrls.files[fileId]?.alt !== ""
                            ? attachmentUrls.files[fileId]?.alt
                            : "Describe this for people with visual impairments..."
                    }
                    value={altText}
                    onChange={(event) => handleAltTextChange(event)}
                />
            </section>
            <section className="addAltTextMenu__altTextSubmit">
                <p className="addAltTextMenu__altTextSubmitInfo">
                    Adding an alt text description will replace the
                    one we automatically generate.
                </p>
                <button
                    className="addAltTextMenu__altTextSubmitBtn"
                    onClick={handelSetAltText}
                >
                    Done
                </button>
            </section>
        </section>
    </motion.div>
}

export default AltTextMenu;