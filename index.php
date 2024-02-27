<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Word Guessing Game</title>
    <!--Google Fonts-->
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <!-- Stylesheet -->
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <audio id="player" autoplay loop>
        <source src="sounds/tre.mp3" type="audio/mp3">
    </audio>

    <div class="wrapper">
      <div class="hint-ref"></div>
      <div id="user-input-section"></div>
      <div id="message"></div>
      <div id="letter-container"></div>
    </div>
    <div class="controls-container">
      <div id="result"></div>
      <div id="word"></div>
      <select id="difficulty">
        <option value="">Select Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <br>
      <button id="start">Start</button>
    </div>
    <!-- Script -->
    <script src="script.js"></script>
  </body>
</html>
