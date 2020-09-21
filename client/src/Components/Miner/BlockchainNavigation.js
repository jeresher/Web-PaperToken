import React, {useEffect} from 'react';

function BlockchainNavigation({blockchain, currentBlockIndex, setCurrentBlockIndex}) {

    function configurePaginationButtons() {
        let leftButtons = document.getElementsByClassName('left-buttons');
        let rightButtons = document.getElementsByClassName('right-buttons');

        function enableButtons(boolean, buttons) {

            if (boolean === true) {
                for (let i=0; i < buttons.length; i++) {
                    buttons[i].disabled = false;
                    buttons[i].style.color = "#5a5a5a";
                    buttons[i].style.cursor = "pointer";
                }
            } else {
                for (let i=0; i < buttons.length; i++) {
                    buttons[i].disabled = true;
                    buttons[i].style.color = "#242424";
                    buttons[i].style.cursor = "auto";
                }
            }

        }

        if (currentBlockIndex === 0) enableButtons(false, leftButtons);
        else enableButtons(true, leftButtons);

        if (currentBlockIndex === blockchain.length - 1) enableButtons(false, rightButtons);
        else enableButtons(true, rightButtons);
    }

    useEffect(() => configurePaginationButtons(), [currentBlockIndex])

    return (
        <div className="blockchain-navigation">

            <button
                className="left-buttons"
                onClick={() => setCurrentBlockIndex(0)}
            >{"<<"}</button>

            <button
                className="left-buttons"
                onClick={() => {
                    if (currentBlockIndex <= 0) setCurrentBlockIndex(0);
                    else setCurrentBlockIndex(currentBlockIndex - 1);
                }}
            >{"<"}</button>

            <h6>Block {currentBlockIndex}</h6>

            <button
                className="right-buttons"
                onClick={() => {
                    if (currentBlockIndex >= blockchain.length-1) setCurrentBlockIndex(blockchain.length-1);
                    else setCurrentBlockIndex(currentBlockIndex + 1);
                }}
            >{">"}</button>

            <button
                className="right-buttons"
                onClick={() => setCurrentBlockIndex(blockchain.length - 1)}
            >{">>"}</button>
        </div>
    )
}

export default BlockchainNavigation;