<?php
include 'connect.php';
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Treasure</title>
  <!--Google Fonts-->
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
  <!-- Stylesheet -->
  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <audio id="player" autoplay loop>
    <source src="sounds/tre.mp3" type="audio/mp3">
  </audio>

  <div class="wrapper">
    <!-- <div class="image"> -->
    <img src="img/0.png" alt="" id="treasures">
    <!-- </div> -->
    <div id="message"></div>

    <div class="hint-ref"></div>



    <div id="user-input-section"></div>

    <div id="letter-container"></div>



  </div>




  <div class="controls-container">


    <div class="card" id="card">
      <div id="result"></div>
      <div id="resultl"></div>
      <div id="result1"></div>
      <button type="button" id="back" onclick="back();">Ok</button>
    </div>

    <div id="word"></div>
    <select id="difficulty" style="width: 300px; font-size: 14px">
      <option value="">Select User</option>
      <?php
      $querypro = "SELECT * FROM book1 where played != '1' order by user ASC ";
      $resultpro = mysqli_query($connect, $querypro);
      while ($rowpro = mysqli_fetch_assoc($resultpro)) { ?>
        <option value="<?= $rowpro['USER'] ?>"><?= $rowpro['USER'] ?></option>
      <?php
      }
      ?>
    </select>
    <br>
    <button id="start">Start</button>
    <br>
    <button id="back" style="display: none !important;">Back</button>
  </div>
  <!-- Script here -->
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script src="script.js"></script>
  <script>
    function back() {
      const card = document.querySelector(".card");
      card.classList.add("dont_show");
      location.reload();

    }
  </script>
</body>

</html>