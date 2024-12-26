
<?php

include('./connexion.php');

$firstname = $emial = $password = $lastname= '';

$sql = "INSERT INTO users";

($result = mysqli_query($conn,$sql)){

}

?>


<!-- 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>add une user</title>
</head>
<body>
    

<H4>ENTRE UNE USer</H4>
<form method="POST">

<label for="firstname">firstname:</label>
<input type="text" name="firstname">

<label for="lastname">lastname:</label>
<input type="text" name="lastname">

<label for="email">email:</label>
<input type="email" name="email">

<label for="password">password:</label>
<input type="password" name="password">

</form>

</body>
</html> -->