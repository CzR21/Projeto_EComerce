let validacao = false;

let login = localStorage.getItem('login');

if(login){

    document.getElementById("login").disabled = "true";

}else{

    document.getElementById("login").disabled = "false";

}

function validarSenha(senha){
    
    let x = document.getElementById("inputSenha");
    
    if(senha.length < 8 || senha == ""){
        console.log("Senha muito pequena");
        x.classList.add("border-danger");
        validacao = false;
    }else{
        console.log("Senhas Validas");
        x.classList.remove("border-danger");
        validacao = true;
    }
    
}

function validarEmail(email) {
    
    var re = /\S+@\S+\.\S+/;
    
    let x = document.getElementById("inputEmail");
    
    if(!re.test(email)){
        x.classList.add("border-danger");
        validacao = false;
    }else{
        x.classList.remove("border-danger");
        validacao = true;
    }
}


function validarCPF(cpf) {	
    
    if(cpf == '') {
        
        console.log("CPF Invalido");
        return;
    }
    
    if (cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999"){
        
        console.log("CPF Invalido");
        
        let classCpf = document.getElementById('inputCpf');
        classCpf.className("border border-danger");
        
        return;
    }
    
    let add = 0;
    
    for (i = 0; i < 9; i++){
        add += parseInt(cpf.charAt(i)) * (10 - i);
    }	
    
    let rev = 11 - (add % 11);
    
    if (rev == 10 || rev == 11){
        rev = 0;
    }
    
    if (rev != parseInt(cpf.charAt(9))){
        console.log("CPF Invalido");
        return;
    }
    
    add = 0;
    
    for (i = 0; i < 10; i ++){
        add += parseInt(cpf.charAt(i)) * (11 - i);	
    }	
    
    rev = 11 - (add % 11);
    
    if (rev == 10 || rev == 11){
        rev = 0;
    }
    
    if (rev != parseInt(cpf.charAt(10))){
        console.log("CPF Invalido");
        return;
    }		
    
    console.log("CPF Valido");
    validacao = true;
    return;  
}


//Preecher Cep
function limparFormulario() {
    
    document.getElementById('inputRua').value = ("");
    document.getElementById('inputBairro').value = ("");
    document.getElementById('inputCidade').value = ("");
    document.getElementById('inputUf').value = ("");
}

function bloquearFormulario() {
    
    document.getElementById('inputRua').disabled = "true";
    document.getElementById('inputBairro').disabled = "true";
    document.getElementById('inputCidade').disabled = "true";
    document.getElementById('inputUf').disabled = "true";
}

function meu_callback(conteudo) {
    
    let x = document.getElementById("inputCep");
    
    if (!("erro" in conteudo)) {
        document.getElementById('inputRua').value = (conteudo.logradouro);
        document.getElementById('inputBairro').value = (conteudo.bairro);
        document.getElementById('inputCidade').value = (conteudo.localidade);
        document.getElementById('inputUf').value = (conteudo.uf);
        
    } 
    else {
        limparFormulario();
        x.classList.add("border-danger");
    }
}

function pesquisacep(valor) {
    
    let x = document.getElementById("inputCep");
    
    var cep = valor.replace(/\D/g, '');
    
    if (cep != "") {
        
        var validacep = /^[0-9]{8}$/;
        
        if(validacep.test(cep)) {
            
            document.getElementById('inputRua').value = "...";
            document.getElementById('inputCidade').value = "...";
            document.getElementById('inputUf').value = "...";
            
            var script = document.createElement('script');
            
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';
            
            document.body.appendChild(script);
            x.classList.remove("border-danger");
            bloquearFormulario();
            
        }
        else {
            limparFormulario();
            console.log("Formato de CEP inv??lido.");
            x.classList.add("border-danger");
        }
    }
    else {
        
        limparFormulario();
        
    }
}

function validarIdade(dataNasc){ 
    
    var dataAtual = new Date();
    var anoAtual = dataAtual.getFullYear();
    var anoNascParts = dataNasc.split('-');
    var diaNasc = anoNascParts[2];
    var mesNasc = anoNascParts[1];
    var anoNasc = anoNascParts[0];
    var idade = anoAtual - anoNasc;
    var mesAtual = dataAtual.getMonth() + 1; 
    //Se mes atual for menor que o nascimento, nao fez aniversario ainda;  
    if(mesAtual < mesNasc){
        idade--; 
    } else {
        //Se estiver no mes do nascimento, verificar o dia
        if(mesAtual == mesNasc){ 
            if(new Date().getDate() < diaNasc ){ 
                //Se a data atual for menor que o dia de nascimento ele ainda nao fez aniversario
                idade--; 
            }
        }
    }
    
    if(idade < 18){
        console.log("Usuario menor de idade");
        validacao = false;
        
    }else{
        console.log("Usuario maior de idade"); 
        validacao = true;
    }
}

function validarContato(){
    
    let nome = document.getElementById("inputNome").value;
    let sobrenome = document.getElementById("inputLastName").value;
    let assunto = document.getElementById("assunto").value;
    let mensagem = document.getElementById("mensagem").value;

    if(nome == "" || sobrenome == "" || !validacao || assunto == "" || mensagem == ""){
        alert ("formulario invalido");
    }else{
        alert("formulario valido");
    }
    
}




function validarFormulario(){
    
    let nome = document.getElementById("inputNome").value;
    let numero = document.getElementById("inputNumero").value;

    if(nome == "" || numero == "" || !validacao){
        console.log("formulario invalido");
    }else{
        console.log("formulario valido");
        x.classList.add("border-danger");
        cadastrarUsuario();
        window.location.href = "home.html";
    }
    
}

function cadastrarUsuario(){

    let email = document.getElementById("inputEmail").value;
    let senha = document.getElementById("inputSenha").value;

    let credenciais = {Email: email, Senha: senha}

    localStorage.setItem('credenciais', JSON.stringify(credenciais));
    localStorage.setItem('login', false);
}

function logar(){

    let emailString = document.getElementById("inputEmailLogin").value;
    let senhaString = document.getElementById("inputSenhaLogin").value;

    let email = document.getElementById("inputEmailLogin");
    let senha = document.getElementById("inputSenhaLogin");

    let credenciaisString = localStorage.getItem('credenciais');

    let credenciaisObj = JSON.parse(credenciaisString);

    if(credenciaisObj.Email == emailString && credenciaisObj.Senha == senhaString){
        console.log("Login valido");
        localStorage.setItem('login', true);

        window.Location.href = "home.html";

    }else{
        console.log("Login invalido");
        email.classList.add("border-danger");
        senha.classList.add("border-danger");
    }

}


function sortListDir() {
    var list, i, switching, b, shouldSwitch, dir, switchcount = 0;
    list = document.getElementById("sort");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    // Make a loop that will continue until no switching has been done:
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      b = list.getElementsByTagName("h5");
      // Loop through all list-items:
      for (i = 0; i < (b.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Check if the next item should switch place with the current item,
        based on the sorting direction (asc or desc): */
        if (dir == "asc") {
          if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
            /* If next item is alphabetically lower than current item,
            mark as a switch and break the loop: */
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {
            /* If next item is alphabetically higher than current item,
            mark as a switch and break the loop: */
            shouldSwitch= true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;
        // Each time a switch is done, increase switchcount by 1:
        switchcount ++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
  
  
  function addcarrinho(produto, qtd, valor, posicao){
  
      localStorage.setItem("produto" + posicao, produto);
      localStorage.setItem("qtd" + posicao, qtd);
      valor = valor * qtd;
      localStorage.setItem("valor" + posicao, valor);
      alert("Produto adicionado ao carrinho!");
  
  }
  
  
  
   var total = 0; // vari??vel que retorna o total dos produtos que est??o na LocalStorage.
   var i = 0;     // vari??vel que ir?? percorrer as posi????es
   var valor = 0; // vari??vel que ir?? receber o pre??o do produto convertido em Float.
   
   for(i=1; i<=99; i++) // verifica at?? 99 produtos registrados na localStorage
   {
       var prod = localStorage.getItem("produto" + i + ""); // verifica se h?? recheio nesta posi????o. 
       if(prod != null) 
       {  
           // exibe os dados da lista dentro da div itens
           document.getElementById("itens").innerHTML += localStorage.getItem("qtd" + i) + " x ";
           document.getElementById("itens").innerHTML += localStorage.getItem("produto" + i);
           document.getElementById("itens").innerHTML += " ";
           document.getElementById("itens").innerHTML += "R$: " + localStorage.getItem("valor" + i) + "<hr>";
           
           // calcula o total dos recheios
           valor = parseFloat(localStorage.getItem("valor" + i)); // valor convertido com o parseFloat()
           total = (total + valor); // arredonda para 2 casas decimais com o .toFixed(2)
       }
   } 


   let n = 1;
var rolar = true;

function carousel(x){

    let imagem = document.getElementById("carousel");


    if(x == 1){

        if(n == 0){

            imagem.src = 'iphone13.png';
            console.log(n);
            n++;

        }else if(n == 1){

            imagem.src = 'S20.png';
            a.href = "galaxyS20.html"
            console.log(n);
            n++;

        }else if(n ==2){
            imagem.src = 'note9.png';
            a.href = "redminote9.html"
            console.log(n);
            n = 0;
        }


    }else{
        if(n == 0){

            imagem.src = 'iphone13.png';
            console.log(n);
            n=2;

        }else if(n == 1){

            imagem.src = 'S20.png';
            console.log(n);
            n--;

        }else if(n ==2){
            imagem.src = 'note9.png';
            console.log(n);
            n --;
        }
        
    }
}

//###############
//back to top

