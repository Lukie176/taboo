
# Taboo
Taboo is an online port of the popular tabletop word game Taboo, allowing users to play the game online with friends across the world.

It is assumed that the players in a game are connected through some form of voice/video chat using a different application (such as Zoom, Discord, etc.).

Taboo is currently hosted at [lukesorensen.dev](lukesorensen.dev).

## Background Information
This web application is entirely server-less and is designed using a React.js frontend. It uses a Firebase Realtime Database to maintain game data and store all sets of guess/taboo words. 

If you encounter any bugs while playing, please inform me of them at lukesorensen@college.harard.edu.

## Gameplay

### Game Setup
Players are divided into two teams, with one team referred to as Team 1 and the other team referred to as Team 2.  

Before each round, a player from either Team 1 or Team 2 is selected to be the Clue-giver. The rest of the players on the Clue-giver's team are Guessers, and members of the opposing team are Watchdogs.

When the round begins, the Clue-giver will be given a clue card. Clue cards have the guess word on the top of the card and the taboo words listed below the guess word. When all players are ready, the Clue-giver starts a 60 second timer. The Clue-giver must get their team to say the guess-word on the card without using one of the taboo words in one of their clues. If a taboo word is used, then the opposing team must tap the buzzer which penalizes the guessing team by discarding the current card and removing a point.

Play is continued until time runs out. Each time a teammate successfully guesses a clue-word, a new card is drawn and the guessing team receives a point.

### Gameplay and Scoring
The team not giving clues must watch for Taboos or other violations of the rules. If they successfully spot a rule being broken, they may use their buzzer to interrupt play and very briefly explain the infraction. Clue-givers must discard the current card and will be given a new card. Each card in the discard pile represents a point lost by the guessing team. Once time runs out, the teams are swapped and roles are reversed. In this version of the game, play continues indefinitely. Players may choose to end the game at any time and start a new one by simply leaving the current game lobby and creating a new one.

### Rules
1. Clue-givers may not use any taboo words, including abbreviations and any part of the taboo word.  
2. Clue-givers may not use sound effects or use gestures to indicate the clue word.  
3. Clue-givers may pass on any card at any time, but the card is then placed in the discard pile.  
4. When time is called, the final card does not go into the discard pile, but is instead removed from play.

### Scoring
Every card guessed successfully represents a point gained by the guessing-team.  
Every card discarded represents a point lost by the guessing-team.  
The final card in play when time runs out is worth no points.  
At the end of play, points are tallied for each team, the winner is declared by the team with the most points.

## Creating a Game
### Setup (/new)
To create a game, select "New Game" either in the navigation bar or by the link at the bottom of the home page.

You will be prompted to enter a name. This name must only be unique to the other player names in your lobby and must be at least one character long. Select "Continue" when you have entered your name.

You will then be placed in the Waiting Room and be prompted with a 4-character game code. Share this game code with whomever you will be playing with.

As the game creator, only you have the ability to start the game and start subsequent rounds.

## Joining a Game
### Setup (/join)
To join a game, take note of the game code given to you and select "Join Game" from either the navigation bar or the link at the bottom of the homepage. Enter the game code in the given text box and select "Join Game"

Alternatively, you may also place the game code at the end of the join URL (ex. `lukesorensen.dev/join/ABCD`).

You will be prompted to enter a name. This name must only be unique to the other player names in your lobby and must be at least one character long. Select "Continue" when you have entered your name.

You will then be placed in the Waiting Room.

## Waiting Room 
### Changing Teams
While you wait for everyone to join, you may switch teams by selecting your name.

### Game Modes
**Team Play**
Setup: At least 2 players on each team
This is how Taboo is typically played. Each team must have at least 2 players so that when a team is playing, they will have both a Clue-giver and a Guesser.

**Local Play**
Setup: Only 1 player in the entire lobby
If you would like to only use one device, such as if all players are physically present, only the game creator should join the game and should immediately start the game. Teams will still switch for each round, but the only player will be provided with the clues each round.

**Free for All**
Setup: All players on the same team
All players should join the same team for this game mode. The Clue-giver role will change each round, but all other players will be Guessers. Individual scores will need to be kept separately and the Team Scores should be ignored.

## Playing the Game
### Clue-Giver
The Clue-Giver is given a digital card with the guess-word and five taboo-words, a 60 second timer (that is not synchronized across players), the current scores, buttons to indicate that the word was either discarded or guessed correctly, and a button to end the round.

When a Watchdog buzzes to indicate that a taboo word was used, the background of the Clue-Giver's interface will become white.

Only the current Clue-Giver has the ability to end the round.

### Guesser
The Guesser has no access to the words and must guess the guess-word using the clues given to them.

### Watchdog
The Watchdog is also given the digital card with the current guess-word and five taboo-words, a 60 second timer (that is not synchronized across players), the current scores, and a button to indicate that the Clue-giver has said a taboo word.