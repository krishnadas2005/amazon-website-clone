function calculateTip(){
let billAmount=parseFloat(document.getElementById("billAmount").value);
let tipPercentage=parseFloat(document.getElementById("tipPercentage").value);

if(isNaN(billAmount)|| billAmount<=0){
alert("Please enter a valid bill amount.");
return;
}
let tipAmount = billAmount*tipPercentage;
let totalBill = billAmount+tipAmount;

document.getElementById("tipAmount").innerText = tipAmount.toFixed(2);
document.getElementById("totalBill").innerText = totalBill.toFixed(2);
}