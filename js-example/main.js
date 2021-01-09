function GetTime(){
    var now = new Date(); // Anlık saati alıyoruz.
    var hour= now.getHours();
    var minute=now.getMinutes();
    var second= now.getSeconds();

    var day=now.getDate();
    var month=now.getMonth()+1; // Javascript ayı array gibi 0'dan başlatıyor.
    var year= now.getFullYear();

   (hour<10) ? document.getElementById("hour").innerHTML="0"+hour : 
               document.getElementById("hour").innerHTML=hour;

   (minute<10) ? document.getElementById("minute").innerHTML="0"+minute :
                 document.getElementById("minute").innerHTML=minute;
   (second<10) ? document.getElementById("second").innerHTML="0"+second :
                 document.getElementById("second").innerHTML=second;

document.getElementById("date").innerHTML= day+" / "+month+" / "+year;
}

setInterval(function(){GetTime();},1000);