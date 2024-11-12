import './textPost.css';
import {TextPostType} from "../../type/type";
import React from 'react';

const TextPost = ({text, fontSize, fontWeight}: TextPostType) => {
    const textArray = text.split(/(\s+|\n)/g);

    const renderText = textArray.map((word, index) => {
        const isHashtag = /^#\w+$/.test(word);
        const isMention = /^@\w+$/.test(word);
        if (isHashtag || isMention) {
            return <span key={index} className="specialWord" style={{
                fontSize: `${fontSize}px`,
                fontWeight: `${fontWeight}`,
            }}>{word}</span>
        }

        if (word === '\n') return <br key={index}/>;

        return <span key={index} className="normalText" style={{
            fontSize: `${fontSize}px`,
            fontWeight: `${fontWeight}`,
        }}>{word}</span>

    });

    return <p className='textPost'>
        {renderText.map((word) => word)}
    </p>
};

export default TextPost;
