let registrationState = false;
let regEvent = false;
window.addEventListener('load', function() {
  
  
  document.querySelector('#form').onsubmit = submitEvent;
  // document.querySelector('#form').onsubmit = submitEvent;
  document.querySelector("#registration-btn").onclick = function toRegister(){
    registrationState = !registrationState;
    this.innerText = `切換至${(registrationState ? "登入" : "註冊")}`;
    regEvent = true;
  }
});

function submitEvent( form_selector ){
  try{
    form = this;

    if(regEvent){
      let reg = form.querySelector(".registration");
      console.log( reg );
      if( registrationState ){
        reg.classList.remove("hidden");
      }else{
        reg.classList.add("hidden");
      }
      regEvent = false;
      return false;
    }
  }catch(e){
    console.log(e);
  }
  return false;
}