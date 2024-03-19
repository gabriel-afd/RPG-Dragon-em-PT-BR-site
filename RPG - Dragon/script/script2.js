
// Variáveis de estado inicial

let xp = 0;
let saude = 100;
let dinheiro = 50;
let armaAtual =  0;
let lutando;
let saudeMonstro;
let inventario = ["bastão"];


// Elementos HTML

const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const text = document.querySelector('#text');
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const moneyText = document.querySelector('#moneyText');
const monsterStats = document.querySelector('#monsterStats');
const monsterName = document.querySelector('#monsterName');
const monsterHealthText = document.querySelector('#monsterHealth');




// Arrays de armas, monstros e locais

const armas = [
    {nome: 'bastão', poder: 5},
    {nome: 'punhal', poder: 30},
    {nome: 'martelo', poder: 50},
    {nome: 'espada', poder: 100}
];


const monstros = [
    { nome: "O lodo viscoso",
     level: 2,
     saude: 15
    },

    { nome: "besta indomável",
     level: 8,
     saude: 60
    },

    { nome: "dragao",
     level: 20,
     saude: 300
    },

];


const locais = [
    {
        nome: "praca da cidade",
        "button text": ["Vá para a loja","Vá para a caverna","Enfrente o Dragao"],
        "button functions": [goStore2, goCave2 ,fightDragon2],
        text: "Você está na praça da cidade. Consegue ver uma placa dizendo \"LOJA\"."
    },

    {
        nome: "Loja",
        "button text": ["Compre 10 de saúde (10 de dinheiro)", "Compre arma (30 de ouro)", "Vá para a praça da cidade"],
        "button functions": [buyHealth2,buyWeapon2,goTown2],
        text: "Você entrou na loja"
    },

    {
        nome: "Caverna",
        "button text": ["Lute com o lodo viscoso","lute com a besta indomável","Volte para a paraca da cidade"],
        "button functions": [fightSlime2,fightBeast2,goTown2],
        text: "Você entrou na caverna. Você vê alguns monstros."
    },

    {
        nome: "Luta",
        "button text": ["Ataque", "Esquive-se","Saia da luta"],
        "button functions": [attack2,dodge2,goTown2],
        text: "Você está lutando contra um monstro"
    },

   {
        nome: "O monstro morreu!",
        "button text": ["Volte para a paraca da cidade", "Volte para a paraca da cidade","Volte para a paraca da cidade"],
        "button functions": [goTown2,goTown2,easterEgg2],
        text: "O monstro grita à medida que morre. Você ganha pontos de experiência e encontra dinheiro."
    },

    {
        nome: "Você perdeu!",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart2, restart2, restart2],
        text: "Você morreu!. &#x2620;"
    },

     {
        nome: "Parabéns, você ganhou!",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart2, restart2, restart2],
        text: "Você derrotou o dragão! VOCÊ GANHOU O JOGO! & #x1F389;"
    },

    {
        nome: "easter egg",
        "button text": ["2", "8", "Ir para a praça da cidade?"],
        "button functions": [pickTwo2, pickEight2, goTown2],
        text: "Você encontrou um jogo secreto. Escolha um número acima. Dez números serão escolhidos aleatoriamente entre 0 e 10. Se o número escolhido corresponder a um dos números aleatórios, você ganha!"
    }
];

//Definindo funções ao botões

button1.onclick = goStore2;
button2.onclick = goCave2;
button3.onclick = 'fightDragon2';

//Definindo as funções de ação do jogo

function update2(locais){
    monsterStats.style.display = 'none';
    button1.innerText = locais["button text"][0];
    button2.innerText = locais["button text"][1];
    button3.innerText = locais["button text"][2];
    button1.onclick = locais["button functions"][0];
    button2.onclick = locais["button functions"][1];
    button3.onclick = locais["button functions"][2];
    text.innerHTML = locais.text;
}

function goTown2(){
    update2(locais[0]);
}

function goStore2(){
    update2(locais[1]);
}

function goCave2(){
    update2(locais[2]);
}

function buyHealth2(){
    if (dinheiro >=10){ 
        
        dinheiro -= 10;
        saude += 10; 
        moneyText.innerText = dinheiro;
        healthText.innerText = saude;
       
    } else {
        text.innerText = "Você não tem dinheiro suficiente para comprar saúde"
    }
}

function buyWeapon2(){
    if(armaAtual < armas.length - 1){
        if(dinheiro >=30){
            dinheiro -=30;
            armaAtual++;
            moneyText.innerText = dinheiro;
            let novaArma = armas[armaAtual].nome;
            text.innerText = "Você agora tem o/a " + novaArma +  ".";
            inventario.push(novaArma); // o metodo push modifica o array original adicionando elementos ao final dele
            text.innerText += " Em seu inventário você tem: " + inventario;
        } else {
            text.innerText = "Você não tem dinheiro suficiente para comprar uma nova arma. "
        }
    } else {
        text.innerText = "Você já tem o conjunto de armas mais poderosas! ";
        button2.innerText = "Venda suas armas por 15 dinheiros"
        button2.onclick = venderArmas;
    }
}

function venderArmas(){
    if(inventario.length > 1){
        dinheiro += 15;
        moneyText.innerText = dinheiro;
        let armaAtual = inventario.shift();
        text.innerText = "Você vendeu o/a " + armaAtual + ". ";
        text.innerText += " Em seu inventário resta: " + inventario;
    } else {
        text.innerText = "Você não pode vender a sua única arma! "
    } 
}

function fightSlime2(){
    lutando = 0;
    goFight2();
}

function fightBeast2(){
    lutando = 1;
    goFight2();
}

function fightDragon2(){
    lutando = 2;
    goFight2();
}

function goFight2(){
    update2(locais[3]);
    saudeMonstro = monstros[lutando].saude;
    monsterStats.style.display = 'block';
    monsterName.innerText = monstros[lutando].nome;
    monsterHealth.innerText = saudeMonstro;
    
}

function attack2(){
    text.innerText = "O monstro " + monstros[lutando].nome + " ataca!";
    text.innerText += " Você está atacando com o/a " + armas[armaAtual].nome; + ".";
    saude -= valorAtaqueMonstro(monstros[lutando].level);

    if(AcertaMonstro()){
        saudeMonstro -= armas[armaAtual].poder + Math.floor((Math.random()*xp)) +1;
    } else {
        text.innerText += " Você perdeu! ";
    }

    healthText.innerText = saude;
    monsterHealth.innerText = saudeMonstro;

    if(saude <= 0){
        lose2();
        text.innerText = "Você perdeu "
        
    } else if(saudeMonstro <= 0){
        if(lutando === 2){
            winGame2();
        } else{
            derrotaMonstro();
        }
    }

    if(Math.random() <= .1 && inventario.length !== 1){
        text.innerText += " Sua/Seu " + inventario.pop() + " quebrou, você perdeu a arma" //o metodo pop remove o utlimo elemento de uma array e retoran esse elemento
        armaAtual--;  
    }
}

function valorAtaqueMonstro(nivel){ //Esta função calcula o valor de ataque de um monstro com base em um nível fornecido como entrada. Math.random() gera um número aleatório entre 0 e 1. Math.floor() arredonda o número para o inteiro mais próximo.
    //hit é o cálculo do valor do ataque dado pela expressão:

    const hit = (nivel*5) - (Math.floor(Math.random()*xp));
    return hit > 0 ? hit : 0;

}

function AcertaMonstro(){ //Esta função determina se o monstro acerta seu alvo.
    //O monstro acertará o alvo com uma probabilidade de acerto determinada pela expressão:

    return Math.random() > .2 || saude < 20;

}

function dodge2(){
    text.innerText = " Você fugiu do ataque do " + monstros[lutando].nome;
}

function derrotaMonstro(){
    dinheiro += Math.floor((monstros[lutando].level * 6.7));
    xp += monstros[lutando].level;
    moneyText.innerText = dinheiro;
    xpText.innerText = xp;
    update2(locais[4]); 
}

function lose2(){
    update2(locais[5]);
}

function winGame2(){
    update2(locais[6]);
}

function restart2(){
 xp = 0;
 saude = 100;
 dinheiro = 50;
 armaAtual =  0;
 inventario = ["bastão"];
 moneyText.innerText = dinheiro;
 healthText.innerText = saude;
 xpText.innerText = xp;
 goTown2();
}


//O easterEgg será acionando quando o monstro morrer e o jogador clicar no terceiro botão
function easterEgg2() {
    update2(locais[7]);
  }
  
  function pickTwo2() {
    pick(2);
  }
  
  function pickEight2() {
    pick(8);
  }
  
  function pick(guess) {
    const numbers = [];
    while (numbers.length < 10) {
      numbers.push(Math.floor(Math.random() * 11));
    }
    text.innerText = "Você escolheu " + guess + ". Aqui estão os números aleatórios\n";
    for (let i = 0; i < 10; i++) {
      text.innerText += numbers[i] + "\n";
    }
    if (numbers.includes(guess)) {
      text.innerText += "Certo! Você ganha 20 de dinehiro!";
      dinheiro += 20;
      moneyText.innerText = dinheiro;
    } else {
      text.innerText += "Errado! Você perdeu 10 de saúde!";
      saude -= 10;
      healthText.innerText = saude;
      if (saude <= 0) {
        lose2();
      }
    }
  }


