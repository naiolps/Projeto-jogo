
window.onload = function(){
  jogoInicio();
  document.querySelector("#direita").addEventListener("click", function(){
     right();
     setTimeout(pare, 1000);
  });

   document.querySelector("#esquerda").addEventListener("click", function(){
     left();
     setTimeout(pare, 1000);
  });

   document.querySelector("#subir").addEventListener("click", function(){
     sobe();
     setTimeout(pare, 1000);
  });

   document.querySelector("#descer").addEventListener("click", function(){
     desce();
     setTimeout(pare, 1000);
  });

  document.querySelector("#reset").addEventListener("click", function(){
     reload();
  });

    document.querySelector("#corA").addEventListener("click", function(){
    document.querySelector("#reset").style.color = "#0000FF";
    document.querySelector("canvas").style.backgroundImage = "url('https://images.unsplash.com/photo-1602498456745-e9503b30470b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80')";
  });

    document.querySelector("#corB").addEventListener("click", function(){
    document.querySelector("#reset").style.color = "#f00";
    document.querySelector("canvas").style.backgroundImage = "url('https://image.freepik.com/fotos-gratis/figura-triangular-geometrica-legal-em-uma-luz-de-laser-neon-otima-para-fundos-e-papeis-de-parede_181624-9331.jpg')";
  });

}

var personagemObj;

var osbtaculos = [];

var pontos;


function jogoInicio(){
  jogoArea.start();
  personagemObj = new componentes("#F00", 10, 120, 30, 30);
  pontos = new componentes("black", 30, 30, 'Consolas', '20px', 'texto');
  //osbtaculos = new componentes('yellow', 120, 80, 10, 100);
}

let jogoArea = {
   canvas : document.createElement("canvas"),
   start: function(){
     this.canvas.height = 300,
     this.context = this.canvas.getContext("2d");
     document.body.insertBefore(this.canvas, document.body.childNodes[0]);
     this.frame = 0;
     this.intervalo = setInterval(jogoAtualizar, 20);
   },
   limpa: function(){
     this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
   },
   stop: function(){
     clearInterval(this.interval);
   }
}

function contarI(n){
  if((jogoArea.frame / n ) % 1 == 0) {
    return true;
  }else {
    return false;
  }
}

function componentes(cor, x, y, largura, altura, tipo){
      this.tipo = tipo,
      this.altura = altura,
      this.largura = largura,
      this.texto = 0,
      this.x = x,
      this.y = y,
      this.veloX = 0,
      this.veloY = 0,
      this.atualizar = function(){
      contexto = jogoArea.context;
      if(this.tipo == 'texto'){
      contexto.font = this.altura + " " + this.largura;  
      contexto.fillStyle = cor;
      contexto.fillText(this.texto, this.x, this.y);
      }else{
      contexto.fillStyle = cor,
      contexto.fillRect(this.x, this.y, this.altura, this.largura);
      }
      },
      this.posicaoNova = function(){
        this.x += this.veloX;
        this.y += this.veloY; 
      },
      this.colisao = function(obj){
        let esq = this.x;
        let dir = this.x + this.largura;
        let sup = this.y;
        let inf = this.y + this.altura;
        
        let objEsq = obj.x;
        let objDir = obj.x + obj.altura;
        let objSup = obj.y;
        let objInf = obj.y + obj.largura;

        let batida = true;

        if(
          (inf < objSup) || (sup > objInf) ||
          (dir < objEsq) || (esq > objDir)
          ){
          batida = false;

          }
          return batida;
      }
}

function jogoAtualizar(){
  let x, y;

  for(i = 0 ; i < osbtaculos.length; i++){
    if(personagemObj.colisao(osbtaculos[i])){
    jogoArea.stop();
    return;
     }
  }
  
  jogoArea.limpa();
  jogoArea.frame += 1;

  if(jogoArea.frame == 1 || contarI(150)) {
   x = jogoArea.canvas.width;
   miniAltura = 20;
   maxAltura = 200; 
   altura = Math.floor (Math.random() * (maxAltura - miniAltura + 1 ) + miniAltura);
   minVazio = 50
   maxVazio = 200;
   vazio = Math.floor(Math.random() * (maxVazio - minVazio + 1) + minVazio);
   //y = jogoArea.canvas.height - 200;
   osbtaculos.push(new componentes('#FFD700', x, 0 , altura, 10));
   osbtaculos.push(new componentes('#FFD700', x, altura  + vazio , x - altura - vazio, 10));
  }

  //osbtaculos.atualizar();

  for(i = 0; i < osbtaculos.length; i++) {
    osbtaculos[i].x += -1;
    osbtaculos[i].atualizar();
  }

  pontos.texto = "PONTOS: " + jogoArea.frame;
  pontos.atualizar();
  personagemObj.posicaoNova();
  personagemObj.atualizar();
 

}


function sobe(){
  personagemObj.veloY -= 1;
}

function desce(){
  personagemObj.veloY += 1;
}

function right(){
  personagemObj.veloX += 1;
}

function left(){
  personagemObj.veloX -= 1;
}

function pare() {
  personagemObj.veloX = 0;
  personagemObj.veloY = 0;
}

function reload() {
location.reload();
}