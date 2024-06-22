import './postTextEditor.css';

import {
    CompositeDecorator,
    ContentState,
    DraftHandleValue,
    Editor,
    EditorState,
    Modifier,
    SelectionState,
} from "draft-js";
import 'draft-js/dist/Draft.css';
import React, {useEffect, useRef} from "react";

type PropPostEditorType = {
    editorState: EditorState;
    handleSetEditorState: (editorState: EditorState) => void;
    handleSetContent: (content: string) => void;
    handleShowSpecialWordList: (wordType: "hashtag" | "mention", isShow: boolean) => void;
    handleChangeSearchWord: (searchTerm: string) => void;
    profileName: string;
}

const PostTextEditor = ({
                            editorState,
                            handleSetEditorState,
                            handleSetContent,
                            profileName,
                            handleShowSpecialWordList,
                            handleChangeSearchWord
                        }: PropPostEditorType) => {
    const MAX_CHARACTERS: number = 500;

    const hashtagStrategy = (contentBlock: any, callback: any, contentState: any) => {
        findWithRegex(/\B#\w+/g, contentBlock, callback);
    };
    const mentionStrategy = (contentBlock: any, callback: any, contentState: any) => {
        findWithRegex(/\B@\w+/g, contentBlock, callback);
    };

    const findWithRegex = (regex: RegExp, contentBlock: any, callback: any) => {
        const text: string = contentBlock.getText();
        let match;
        while ((match = regex.exec(text)) !== null) {
            callback(match.index, match.index + match[0].length);
        }
    };

    const HashtagSpan = (props: any) => <span className="postEditor__markdownText__hashtag">{props.children}</span>;
    const MentionSpan = (props: any) => <span className="postEditor__markdownText__mention">{props.children}</span>;

    const decorators = new CompositeDecorator([
        {
            strategy: hashtagStrategy,
            component: HashtagSpan,
        },
        {
            strategy: mentionStrategy,
            component: MentionSpan,
        },
    ]);

    useEffect(() => {
        handleSetEditorState(EditorState.createEmpty(decorators));
    }, []);

    const editorRef = useRef(null);

    const handleChange = (newEditorState: EditorState): void => {
        const currentContent = newEditorState.getCurrentContent();
        const plainText = currentContent.getPlainText();
        const plainTextLength = plainText.length;

        let contentState = currentContent;
        let selectionState = newEditorState.getSelection();

        // Determine if the text exceeds the max limit
        if (plainTextLength > MAX_CHARACTERS) {
            // Create a selection state for the excess text
            const excessTextSelection = SelectionState.createEmpty(currentContent.getFirstBlock().getKey())
                .merge({
                    anchorOffset: MAX_CHARACTERS,
                    focusOffset: plainTextLength
                });

            // Apply the 'RED' style to the excess text
            contentState = Modifier.applyInlineStyle(
                currentContent,
                excessTextSelection,
                'RED'
            );

            // Push the modified content state to the editor state
            newEditorState = EditorState.push(newEditorState, contentState, 'change-inline-style');
        } else {
            // If no exceeding characters, ensure no 'RED' style is applied
            const allTextSelection = SelectionState.createEmpty(currentContent.getFirstBlock().getKey())
                .merge({
                    anchorOffset: 0,
                    focusOffset: plainTextLength
                });

            contentState = Modifier.removeInlineStyle(
                currentContent,
                allTextSelection,
                'RED'
            );

            newEditorState = EditorState.push(newEditorState, contentState, 'change-inline-style');
        }

        // Maintain the current selection state
        newEditorState = EditorState.forceSelection(newEditorState, selectionState);

        const lastWord = plainText.split(" ").pop() || '';
        const isHashtag = /^#\w+$/.test(lastWord);
        const isMention = /^@\w+$/.test(lastWord);

        if (isHashtag) handleShowSpecialWordList("hashtag", true);
        else handleShowSpecialWordList("hashtag", false);

        if (isMention) handleShowSpecialWordList("mention", true);
        else handleShowSpecialWordList("mention", false);

        if (isHashtag || isMention) handleChangeSearchWord(lastWord.slice(1));
        else handleChangeSearchWord('');

        handleSetEditorState(newEditorState);
        handleSetContent(plainText);
    };

    const handlePastedText = (text: string, html: string | undefined, editorState: EditorState): DraftHandleValue => {
        const currentContent = editorState.getCurrentContent();
        const currentPlainText = currentContent.getPlainText();
        const newPlainText = currentPlainText + text;
        const currentCharactersCount = newPlainText.length;

        // Create a content state with the new plain text
        let newContentState = ContentState.createFromText(newPlainText);

        // Create a selection state pointing to the end of the new content
        let newSelectionState = SelectionState.createEmpty(newContentState.getLastBlock().getKey())
            .set('focusOffset', newContentState.getLastBlock().getLength())
            .set('anchorOffset', newContentState.getLastBlock().getLength());

        // Push the new content state to the editor state
        let newEditorState = EditorState.push(editorState, newContentState, 'insert-characters');

        // If the pasted text exceeds the max limit, apply the red color style to the excess text
        if (currentCharactersCount > MAX_CHARACTERS) {
            // Create a selection state for the excess text
            const excessTextSelection = SelectionState.createEmpty(newContentState.getLastBlock().getKey())
                .set('anchorOffset', MAX_CHARACTERS)
                .set('focusOffset', currentCharactersCount);

            // Apply the 'red' style to the excess text
            if (excessTextSelection instanceof SelectionState) {
                newContentState = Modifier.applyInlineStyle(
                    newContentState,
                    excessTextSelection,
                    'RED'
                );
            }

            // Update the editor state with the styled content state
            newEditorState = EditorState.push(newEditorState, newContentState, 'apply-entity');
            if (newSelectionState instanceof SelectionState) {
                newEditorState = EditorState.forceSelection(newEditorState, newSelectionState);
            }
        } else {
            if (newSelectionState instanceof SelectionState) {
                newEditorState = EditorState.forceSelection(newEditorState, newSelectionState);
            }
        }

        handleSetEditorState(newEditorState);

        return 'handled';
    };

    const styleMap = {
        RED: {
            color: 'red',
        },
    };

    return (
        <div className="postEditor noScroll" ref={editorRef}>
            <Editor
                editorState={editorState}
                onChange={handleChange}
                customStyleMap={styleMap}
                handlePastedText={handlePastedText}
                placeholder={`Reply to ${profileName}...`}
                spellCheck={true}
            />
        </div>
    );
};

export default PostTextEditor;