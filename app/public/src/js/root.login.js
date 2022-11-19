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

  try{

    // get all user info
    let username = form.querySelector("[name='username']").value;
    let password = form.querySelector("[name='password']").value;
    let email = form.querySelector("[name='email']").value;
    let email_confirm = form.querySelector("[name='email-comfirm']").value;
    console.log( username, password, email, email_confirm );
    if( registrationState ){
      if( email != email_confirm ){
        alert("信箱不一致");
        return false;
      }
      let data = {
        username: username,
        password: password,
        email: email,
      };
      // send to server
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "/user", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.callback = signupCallback;
      xhr.onreadystatechange = receviceXHR;
      xhr.send(JSON.stringify(data));
    }else{
      // login
      let data = {
        username: username,
        password: password,
      };
      // send to server
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "/user/session", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.callback = signinCallback;
      xhr.onreadystatechange = receviceXHR;
      xhr.send(JSON.stringify(data));
    }
  
    return false;
  }catch(e){
    console.log(e);
    return false;
  }

}

function receviceXHR( ){
  if (this.readyState == 4) {
    if( this.status == 200 ){
      let res = JSON.parse(this.responseText);
      console.log( res );
      if(res.status == "success"){
        this. callback( res );
      }else{
        document.querySelector("#error").classList.remove("hidden");
        document.querySelector("#error").innerText = res.error;
      }
    }
  }
}

function signupCallback( ){
  document.querySelector("#registration-btn").click();
  alert("註冊成功");
}

function signinCallback( ){
  alert("登入成功");
  location.href = "/dashboard";
}