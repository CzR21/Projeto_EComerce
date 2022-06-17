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



function validarFormulario(){
    
    if(validacao){
        alert("formulario valido");
    }else{
        alert ("formulario invalido");
    }
    
}



//##########################################################################################################
//Script do carousel

// var indicators = document.querySelector('.indicators')
// var qtde = document.querySelectorAll('.carousels .img_carousel')
// var actual = 0
// var image = document.getElementById('atual')
// var next = document.getElementById('next')
// var back = document.getElementById('back')
// var rolar = true

// for(let i=0; i < qtde.length; i++)
// {
//     var div = document.createElement('div')
//     div.id = indicators.appendChild(div)
// }
// document.getElementById('0').classList.add('img_Atcual')

// var pos = document.querySelectorAll('.indicators div')

// for(let i=o; i < pos.length; i++)
// {
//     pos[i].addEventListener('click', function()
//     {
//         actual = pos[i].id
//         rolar=false
//         carousel()
//     })
// }

// back.addEventListener('click', ()=>
// {
//     actual--
//     rolar=false
//     carousel()
// })

// next.addEventListener('click', ()=>
// {
//     actual++
//     rolar=false
//     carousel()
// })

// function carousel()
// {
//     if(actual >= qtde.length) //para voltar a imagem inicial
//     {
//         actual = 0
//     }
//     else if(actual < 0)
//     {
//         actual = qtde.length-1  //voltar para ultima imagem
//     }
//     document.querySelectorAll('.img_Actual').classList.remove('img_Actual')
//     image.style.marginLeft = -1024*actual+'px'
//     document.getElementById(actual).classList.add('img_Actual')
// }
// carousel()
// setInterval(()=>
// {
//     if(rolar)
//     {
//         actual++
//         carousel()
//     }
//     else
//     {
//         rolar = true
//     }
    
// },4000)

const slides = document.querySelectorAll('[data-js="carousel__item"]') //armazenar referencia das divs
const nextButton = document.querySelector('[data-js="carousel__button--next"]') //executar seta direita,
const prevButton = document.querySelector('[data-js="carousel__button--prev"]')//executar seta esquerda

let currentSlideIndex = 0

nextButton.addEventListener('click', ()=>{
    if(currentSlideIndex === slides.length - 1) //-1 para se o carousel tiver mais slides futuramente a função continuar efetiva
    {
        currentSlideIndex = 0
    } else
    {
        currentSlideIndex++
    }

    slides.forEach(slide =>{
        slide.classList.remove('carousel__item--viseible')//viajar e remover pelo carousel
    })

    slides[currentSlideIndex].classList.add('carousel__item--viseible')
})

prevButton.addEventListener('click',()=>{
    if(currentSlideIndex === 0)
    {
        currentSlideIndex = slides.length - 1
    }else
    {
        currentSlideIndex--
    }

    slides.forEach(slide => {
        slide.classList.remove('carousel__item--viseible')
    })

    slides[currentSlideIndex].classList.add('carousel__item--viseible')
})





