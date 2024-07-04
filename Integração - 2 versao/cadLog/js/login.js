function checkData(){
    let email, password;
    emailLogin=document.getElementById("emailLogin").value;
    passwordLogin=document.getElementById("passwordLogin").value;
    console.log(emailLogin+passwordLogin);

    let user_record = new Array();
    user_record= JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
    if(user_record.some((v)=>{
        return v.emailLogin==email && v.passwordLogin==password
    })){
        alert("Login efetuado com sucesso");
        let current_user=user_record.filter((v)=>{
          return v.emailLogin==email && v.passwordLogin==password
        })[0]
        localStorage.getItem("name", current_user.name);
        localStorage.getItem("email", current_user.email);
        /*window.location.href="perfil.html";*/
        
    }else{
        alert("Erro ao realizar o login");
    }
}
