/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-console */

const gameBoard = (() => {
    /** @type {Array} array representation of gameBoard */
    const gameBoardArray = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

    /**
     *  Make a move on gameBoard
     *  @param {number} index - index to move on
     *  @param {char} symbol - symbol (X or O) to place at index
     *  @returns {boolean} true if valid move, else false
     */
    const makeMove = (index, symbol) => {
        if (gameBoardArray[index] === " ") {
            gameBoardArray[index] = symbol;
            return true;
        }

        return false;
    };

    /**
     * Reset gameBoard
     */
    const resetBoard = () => {
        gameBoardArray.splice(
            0,
            gameBoardArray.length,
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " "
        );
    };

    /**
     * Print ASCII representation of gameBoard to console
     * Used for debugging
     */
    const printBoard = () => {
        console.log(
            ` ${gameBoardArray[0]} | ${gameBoardArray[1]} | ${gameBoardArray[2]} `
        );
        console.log(`---+---+---`);
        console.log(
            ` ${gameBoardArray[3]} | ${gameBoardArray[4]} | ${gameBoardArray[5]} `
        );
        console.log(`---+---+---`);
        console.log(
            ` ${gameBoardArray[6]} | ${gameBoardArray[7]} | ${gameBoardArray[8]} `
        );
    };

    /**
     * Check if the game has been won or tied
     * @returns {char} 'X' if player X has won
     *                 'O' if player O has won
     *                 'T' if game tied
     *                 'N' if no winner or tie
     */
    const checkWin = () => {
        // Check if winner exists
        if (
            gameBoardArray[0] !== " " &&
            gameBoardArray[0] === gameBoardArray[1] &&
            gameBoardArray[1] === gameBoardArray[2]
        ) {
            return gameBoardArray[0];
        }
        if (
            gameBoardArray[3] !== " " &&
            gameBoardArray[3] === gameBoardArray[4] &&
            gameBoardArray[4] === gameBoardArray[5]
        ) {
            return gameBoardArray[3];
        }
        if (
            gameBoardArray[6] !== " " &&
            gameBoardArray[6] === gameBoardArray[7] &&
            gameBoardArray[7] === gameBoardArray[8]
        ) {
            return gameBoardArray[6];
        }
        if (
            gameBoardArray[0] !== " " &&
            gameBoardArray[0] === gameBoardArray[3] &&
            gameBoardArray[3] === gameBoardArray[6]
        ) {
            return gameBoardArray[0];
        }
        if (
            gameBoardArray[1] !== " " &&
            gameBoardArray[1] === gameBoardArray[4] &&
            gameBoardArray[4] === gameBoardArray[7]
        ) {
            return gameBoardArray[1];
        }
        if (
            gameBoardArray[2] !== " " &&
            gameBoardArray[2] === gameBoardArray[5] &&
            gameBoardArray[5] === gameBoardArray[8]
        ) {
            return gameBoardArray[2];
        }
        if (
            gameBoardArray[0] !== " " &&
            gameBoardArray[0] === gameBoardArray[4] &&
            gameBoardArray[4] === gameBoardArray[8]
        ) {
            return gameBoardArray[0];
        }
        if (
            gameBoardArray[6] !== " " &&
            gameBoardArray[6] === gameBoardArray[4] &&
            gameBoardArray[4] === gameBoardArray[2]
        ) {
            return gameBoardArray[6];
        }

        // If no winner, check if tie exists
        for (let i = 0; i < gameBoardArray.length; i += 1) {
            // If a square remains empty, no tie
            if (gameBoardArray[i] === " ") {
                return "N";
            }
        }
        // If all squares filled but no winner, tie
        return "T";
    };

    return { gameBoardArray, makeMove, resetBoard, printBoard, checkWin };
})();

const GameAI = (name, symbol) => {
    /** @type {string} Game AI's name */
    this.name = name;
    /** @type {char} Game AI's symbol (X or O) */
    this.symbol = symbol;

    // Helper function to get random int between min (inclusive) and max (exclusive)
    function getRandomInt(min, max) {
        this.min = Math.ceil(min);
        this.max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    /**
     * Make an AI move
     * Current algorithm is random play
     * @param {char} symbol - symbol for the AI to use in its play
     * @returns {boolean} - true if valid move, else false
     */
    const makeAIMove = () => {
        // Array of empty indices on the board
        const emptyIndexArray = [];

        // Fill emptyIndexArray
        for (let i = 0; i < gameBoard.gameBoardArray.length; i += 1) {
            if (gameBoard.gameBoardArray[i] === " ") {
                emptyIndexArray.push(i);
            }
        }

        // Choose random index from emptyIndexArray
        const index = getRandomInt(0, emptyIndexArray.length);

        // Make move
        return gameBoard.makeMove(emptyIndexArray[index], symbol);
    };

    return { name, symbol, makeAIMove };
};

const Player = (name, symbol) => {
    /** @type {string} Player's name */

    this.name = name;
    /** @type {char} Player's symbol (X or O) */
    this.symbol = symbol;

    /**
     * Make a player move
     * @param {number} index - Index for the player to play on
     * @returns {boolean} True if valid move, else false
     */
    const makePlayerMove = (index) => gameBoard.makeMove(index, symbol);

    return { name, symbol, makePlayerMove };
};

const gameController = (() => {
    /** @type {boolean} Whether the game is single-player or not */
    let isSinglePlayer;
    /** @type {Player} Player 1 of the game */
    let playerOne;
    /** @type {Player || gameAI} Player 2 of the game */
    let playerTwo;
    /** @type {String} Game AI's name */
    const gameAIName = "TTT_AI_V1";
    /** @type {Array} Valid game symbols */
    const gameSymbols = ["X", "O"];
    /** @type {Player} Active player */
    let activePlayer;

    return {
        isSinglePlayer,
        playerOne,
        playerTwo,
        gameAIName,
        gameSymbols,
        activePlayer,
    };
})();

const displayController = (() => {
    /** @type {string} Color to indicate active player */
    const activePlayerColor = "#95e884";
    // Main header for site
    const mainHeader = document.getElementById("main-header");
    // Start page div
    const startPage = document.getElementById("start-page");
    // One player name entry page div
    const onePlayerNameEntryPage = document.getElementById(
        "one-player-name-entry-page"
    );
    // Two player name entry page div
    const twoPlayerNameEntryPage = document.getElementById(
        "two-player-name-entry-page"
    );
    // Game board page div
    const gameBoardPage = document.getElementById("game-board-page");

    // Game over page div
    const gameOverPage = document.getElementById("game-over-page");

    // Game over message div
    const gameOverMessage = document.getElementById("game-over-message");

    const onePlayerButton = document.getElementById("one-player-button");
    const twoPlayerButton = document.getElementById("two-player-button");
    const onePlayerNameEntryForm = document.getElementById(
        "one-player-name-entry-form"
    );
    const twoPlayerNameEntryForm = document.getElementById(
        "two-player-name-entry-form"
    );
    const playerOneNameDisplay = document.getElementById("player-one-name");
    const playerTwoNameDisplay = document.getElementById("player-two-name");

    const gameBoardSquares =
        document.getElementsByClassName("game-board-square");

    const playAgainButton = document.getElementById("play-again-button");
    const homeButton = document.getElementById("home-button");

    mainHeader.style.display = "none";
    onePlayerNameEntryPage.style.display = "none";
    twoPlayerNameEntryPage.style.display = "none";
    gameBoardPage.style.display = "none";
    gameOverPage.style.display = "none";

    const updateBoardDisplay = () => {
        for (let i = 0; i < gameBoard.gameBoardArray.length; i += 1) {
            if (gameBoard.gameBoardArray[i] === "X") {
                gameBoardSquares[i].src = "images/x.png";
                gameBoardSquares[i].style["pointer-events"] = "none";
            } else if (gameBoard.gameBoardArray[i] === "O") {
                gameBoardSquares[i].src = "images/o.png";
                gameBoardSquares[i].style["pointer-events"] = "none";
            }
        }
    };

    const displayWinPage = () => {
        if (gameBoard.checkWin() === "N") {
            return false;
        }

        gameBoardPage.style["pointer-events"] = "none";
        gameBoardPage.style["user-select"] = "none";
        setTimeout(() => {
            if (gameBoard.checkWin() === "X") {
                gameOverMessage.textContent = `${gameController.playerOne.name} wins!`;
            } else if (gameBoard.checkWin() === "O") {
                gameOverMessage.textContent = `${gameController.playerTwo.name} wins!`;
            } else if (gameBoard.checkWin() === "T") {
                gameOverMessage.textContent = `Tie!`;
            }

            gameBoardPage.style.opacity = "1%";
            gameOverPage.style.display = "";
        }, 1000);
        return true;
    };

    onePlayerButton.addEventListener("click", () => {
        mainHeader.style.display = "";
        startPage.style.display = "none";
        onePlayerNameEntryPage.style.display = "";

        gameController.isSinglePlayer = true;
    });

    twoPlayerButton.addEventListener("click", () => {
        mainHeader.style.display = "";
        startPage.style.display = "none";
        twoPlayerNameEntryPage.style.display = "";

        gameController.isSinglePlayer = false;
    });

    onePlayerNameEntryForm.addEventListener("submit", (event) => {
        event.preventDefault();

        onePlayerNameEntryPage.style.display = "none";
        gameBoardPage.style.display = "";

        const symbolIndex = Math.round(Math.random());

        if (gameController.gameSymbols[symbolIndex] === "X") {
            gameController.playerOne = Player(
                onePlayerNameEntryForm.elements["one-player-name-input"].value,
                gameController.gameSymbols[symbolIndex]
            );
            playerOneNameDisplay.style.backgroundColor = activePlayerColor;
            gameController.playerTwo = GameAI(
                gameController.gameAIName,
                gameController.gameSymbols[Math.abs(symbolIndex - 1)]
            );
        } else {
            gameController.playerTwo = Player(
                onePlayerNameEntryForm.elements["one-player-name-input"].value,
                gameController.gameSymbols[symbolIndex]
            );
            gameController.playerOne = GameAI(
                gameController.gameAIName,
                gameController.gameSymbols[Math.abs(symbolIndex - 1)]
            );
        }

        gameController.activePlayer = gameController.playerOne;

        playerOneNameDisplay.textContent = gameController.playerOne.name;
        playerTwoNameDisplay.textContent = gameController.playerTwo.name;

        if (gameController.activePlayer.name === gameController.gameAIName) {
            playerOneNameDisplay.style.backgroundColor = activePlayerColor;
            setTimeout(() => {
                gameController.activePlayer.makeAIMove();
                gameController.activePlayer = gameController.playerTwo;
                updateBoardDisplay();
                playerOneNameDisplay.style.backgroundColor = "white";
                playerTwoNameDisplay.style.backgroundColor = activePlayerColor;
            }, 1000);
        }

        for (let i = 0; i < gameBoardSquares.length; i += 1) {
            gameBoardSquares[i].addEventListener("click", () => {
                if (gameBoard.gameBoardArray[i] === " ") {
                    if (
                        gameController.activePlayer === gameController.playerOne
                    ) {
                        gameController.playerOne.makePlayerMove(i);
                        updateBoardDisplay();
                        if (!displayWinPage()) {
                            playerTwoNameDisplay.style.backgroundColor =
                                activePlayerColor;
                            playerOneNameDisplay.style.backgroundColor =
                                "white";
                            setTimeout(() => {
                                gameController.playerTwo.makeAIMove();
                                updateBoardDisplay();
                                displayWinPage();
                                playerTwoNameDisplay.style.backgroundColor =
                                    "white";
                                playerOneNameDisplay.style.backgroundColor =
                                    activePlayerColor;
                            }, 1000);
                        }
                    } else {
                        gameController.playerTwo.makePlayerMove(i);
                        updateBoardDisplay();
                        if (!displayWinPage()) {
                            playerOneNameDisplay.style.backgroundColor =
                                activePlayerColor;
                            playerTwoNameDisplay.style.backgroundColor =
                                "white";
                            setTimeout(() => {
                                gameController.playerOne.makeAIMove();
                                updateBoardDisplay();
                                if (!displayWinPage()) {
                                    playerOneNameDisplay.style.backgroundColor =
                                        "white";
                                    playerTwoNameDisplay.style.backgroundColor =
                                        activePlayerColor;
                                }
                            }, 1000);
                        }
                    }
                }
                updateBoardDisplay();
                displayWinPage();
            });
        }
    });

    twoPlayerNameEntryForm.addEventListener("submit", (event) => {
        event.preventDefault();

        twoPlayerNameEntryPage.style.display = "none";
        gameBoardPage.style.display = "";

        const symbolIndex = Math.round(Math.random());

        if (gameController.gameSymbols[symbolIndex] === "X") {
            gameController.playerOne = Player(
                twoPlayerNameEntryForm.elements["two-player-name-input-1"]
                    .value,
                gameController.gameSymbols[symbolIndex]
            );
            gameController.playerTwo = Player(
                twoPlayerNameEntryForm.elements["two-player-name-input-2"]
                    .value,
                gameController.gameSymbols[Math.abs(symbolIndex - 1)]
            );
        } else {
            gameController.playerTwo = Player(
                twoPlayerNameEntryForm.elements["two-player-name-input-1"]
                    .value,
                gameController.gameSymbols[symbolIndex]
            );
            gameController.playerOne = Player(
                twoPlayerNameEntryForm.elements["two-player-name-input-2"]
                    .value,
                gameController.gameSymbols[Math.abs(symbolIndex - 1)]
            );
        }

        gameController.activePlayer = gameController.playerOne;
        playerOneNameDisplay.style.backgroundColor = "#95e884";

        playerOneNameDisplay.textContent = gameController.playerOne.name;
        playerTwoNameDisplay.textContent = gameController.playerTwo.name;

        for (let i = 0; i < gameBoardSquares.length; i += 1) {
            gameBoardSquares[i].addEventListener("click", () => {
                if (gameBoard.gameBoardArray[i] === " ") {
                    gameController.activePlayer.makePlayerMove(i);
                    if (
                        gameController.activePlayer === gameController.playerOne
                    ) {
                        if (!displayWinPage()) {
                            playerOneNameDisplay.style.backgroundColor =
                                "white";
                            playerTwoNameDisplay.style.backgroundColor =
                                "#95e884";
                            gameController.activePlayer =
                                gameController.playerTwo;
                        }
                    } else if (!displayWinPage()) {
                        gameController.activePlayer = gameController.playerOne;
                        playerTwoNameDisplay.style.backgroundColor = "white";
                        playerOneNameDisplay.style.backgroundColor = "#95e884";
                    }
                    updateBoardDisplay();
                }
            });
        }
    });

    playAgainButton.addEventListener("click", () => {
        gameBoardPage.style.display = "";
        gameBoardPage.style.opacity = "100%";
        gameOverPage.style.display = "none";

        for (let i = 0; i < gameBoard.gameBoardArray.length; i += 1) {
            gameBoardSquares[i].src = "images/blank.png";
            gameBoardSquares[i].style["pointer-events"] = "auto";
        }

        gameBoard.resetBoard();
        updateBoardDisplay();

        playerOneNameDisplay.style.backgroundColor = "white";
        playerTwoNameDisplay.style.backgroundColor = "white";

        if (gameController.isSinglePlayer) {
            const symbolIndex = Math.round(Math.random());

            if (gameController.gameSymbols[symbolIndex] === "X") {
                gameController.playerOne = Player(
                    onePlayerNameEntryForm.elements["one-player-name-input"]
                        .value,
                    gameController.gameSymbols[symbolIndex]
                );
                playerOneNameDisplay.style.backgroundColor = activePlayerColor;
                gameController.playerTwo = GameAI(
                    gameController.gameAIName,
                    gameController.gameSymbols[Math.abs(symbolIndex - 1)]
                );
            } else {
                gameController.playerTwo = Player(
                    onePlayerNameEntryForm.elements["one-player-name-input"]
                        .value,
                    gameController.gameSymbols[symbolIndex]
                );
                gameController.playerOne = GameAI(
                    gameController.gameAIName,
                    gameController.gameSymbols[Math.abs(symbolIndex - 1)]
                );
            }

            gameController.activePlayer = gameController.playerOne;

            playerOneNameDisplay.textContent = gameController.playerOne.name;
            playerTwoNameDisplay.textContent = gameController.playerTwo.name;

            if (
                gameController.activePlayer.name === gameController.gameAIName
            ) {
                playerOneNameDisplay.style.backgroundColor = activePlayerColor;
                setTimeout(() => {
                    gameController.activePlayer.makeAIMove();
                    gameController.activePlayer = gameController.playerTwo;
                    updateBoardDisplay();
                    playerOneNameDisplay.style.backgroundColor = "white";
                    playerTwoNameDisplay.style.backgroundColor =
                        activePlayerColor;
                }, 1000);
            }
        } else {
            const symbolIndex = Math.round(Math.random());

            if (gameController.gameSymbols[symbolIndex] === "X") {
                gameController.playerOne = Player(
                    twoPlayerNameEntryForm.elements["two-player-name-input-1"]
                        .value,
                    gameController.gameSymbols[symbolIndex]
                );
                gameController.playerTwo = Player(
                    twoPlayerNameEntryForm.elements["two-player-name-input-2"]
                        .value,
                    gameController.gameSymbols[Math.abs(symbolIndex - 1)]
                );
            } else {
                gameController.playerTwo = Player(
                    twoPlayerNameEntryForm.elements["two-player-name-input-1"]
                        .value,
                    gameController.gameSymbols[symbolIndex]
                );
                gameController.playerOne = Player(
                    twoPlayerNameEntryForm.elements["two-player-name-input-2"]
                        .value,
                    gameController.gameSymbols[Math.abs(symbolIndex - 1)]
                );
            }

            gameController.activePlayer = gameController.playerOne;
            playerOneNameDisplay.style.backgroundColor = "#95e884";

            playerOneNameDisplay.textContent = gameController.playerOne.name;
            playerTwoNameDisplay.textContent = gameController.playerTwo.name;
        }
    });

    homeButton.addEventListener("click", () => {
        location.reload();
    });
})();

displayController();
