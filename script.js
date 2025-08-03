const base_url="https://v6.exchangerate-api.com/v6//c58ccf0820568d236b71ffca/pair";
const dropdown = document.querySelectorAll(".dropdown select");
const button = document.querySelector("button");
const formCurr=document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
 for(let select of dropdown){
    for(let currCode in countryList){
        let newOption=document.createElement("option");
         newOption.innerText=currCode;
         newOption.value=currCode;
         if(select.name=="from"&&currCode=="USD")
         {
            newOption.selected="selected";
         }
         else if(select.name=="to"&&currCode=="INR")
         {
            newOption.selected="selected";
         }
         select.append(newOption);
    }
    select.addEventListener("change",(event)=>{
        updateFlag(event.target);
    });

}
const updateFlag=(element)=>{
    let currCode = element.value;
    let contryCode = countryList[currCode];
    let newsrc=`https://flagsapi.com/${contryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newsrc;
}
button.addEventListener("click",(event)=>{
    event.preventDefault();
    updateExchange();
})
window.addEventListener("load",()=>{
    updateExchange();
})
const updateExchange=async()=>{
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    if(amountValue=="" || amountValue<1)
    {
        amountValue=1;
        amount.value="1";
    }
    const url =`${base_url}/${formCurr.value}/${toCurr.value}`;
    let reponse = await fetch(url) ;
    let data = await reponse.json();
    console.log(data);
    let rate = data.conversion_rate;
    console.log(rate);
    let finalamt=rate*amountValue;
    msg.innerText=`${amountValue }${formCurr.value} = ${finalamt }${toCurr.value}`;
}

 
