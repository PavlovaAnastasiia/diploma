<!-- <?php
function loadGoods(){
   $conn = connect(); 
   $sql = "SELECT * FROM goods";
   $result = mysqli_query($conn, $sql);

   if(mysqli_num_rows($result)>0){ //если больше 0 строк
       $out = array(); //пустой массив
       while($row = mysqli_fetch_assoc($result)){
           $out[$row["id"]] = $row;
       }
       echo json_encode($out);
   } else{
       echo "0";
   }
   mysqli_close($conn);
}
 -->