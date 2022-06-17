let validacao = false;

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
            console.log("Formato de CEP inválido.");
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
        alert ("formulario invalido");
    }else{
        alert("formulario valido");
    }
    
}

let n = 0;

function carrossel(x){

    let imagem = document.getElementById("carrossel");

    if(x == 0){

        if(n == 0){

            imagem.src = 'Carrossel/Carrossel1.png';
            n++;

        }else if(n == 1){

            imagem.src = 'Carrossel/Carrossel2.png';
            n++;

        }else{

            imagem.src = 'Carrossel/Carrossel3.png';
            n = 0;
        }

    }else{
        
        if(n == 0){

            imagem.src = 'Carrossel/Carrossel1.png';
            n = 2;

        }else if(n == 1){

            imagem.src = 'Carrossel/Carrossel2.png';
            n--;

        }else{

            imagem.src = 'Carrossel/Carrossel3.png';
            n--;
        }
    }
}