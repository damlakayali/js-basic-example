function CalculateBMI(){
    var weight = document.getElementById('weight').value;
    var height = document.getElementById('height').value;

    var result= weight/Math.pow(height,2);

    document.getElementById('result').innerText=result.toFixed(2);

    if(result<18.5){
        document.getElementById('result-statu').innerText="Under Weight";
        document.getElementById('result-statu').style.color='#2196f3';
    }
    else if(result>=18.5 && result<25){
        document.getElementById('result-statu').innerText="Normal";
        document.getElementById('result-statu').style.color="#43a047";
    }
    else if( result>=25 && result<30){
        document.getElementById('result-statu').innerText="Over Weight";
        document.getElementById('result-statu').style.color="#fb8c00";
    }
    else if (result>=30){
        document.getElementById('result-statu').innerText="Obese";
        document.getElementById('result-statu').style.color="#c62828";
    }
}

function Reset(){
    document.getElementById('weight').value=0;
    document.getElementById('height').value=0;
    document.getElementById('result').innerText='';
    document.getElementById('result-statu').innerText='';
}