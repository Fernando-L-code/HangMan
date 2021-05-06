

Array.prototype.equals = function (getArray) {
    if (this.length != getArray.length) return false;
  
    for (var i = 0; i < getArray.length; i++) {
      if (this[i] instanceof Array && getArray[i] instanceof Array) {
        if (!this[i].equals(getArray[i])) return false;
      } else if (this[i] != getArray[i]) {
        return false;
      }
    }
    return true;
  };
  
    class game{
        constructor(word){
            this.start(word)
        }
        
        start(word) {
            this.start=this.start.bind(this)
            this.word=word;
            this.alphabet=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","ñ","o","p","q","r","s","t","u","v","w","x","y","z"]
            this.tries =[];
            this.goodtries =[];
            this.toggleBtnEmpezar()

            this.showInputs();
            this.showAlphabet();
        }
        

        toggleBtnEmpezar(){
        const btnStart = document.querySelector("#start");
            if (btnStart.classList.contains('hide')) {
                btnStart.classList.remove('hide')
               
            }else{
                btnStart.classList.add('hide')
            }
        }
        showInputs(){
            const container = document.querySelector("#word");
            let count =1;
            
            this.word.forEach(element => {
                const input = document.createElement("input");
                input.id="letter"+count;
                input.disabled=true;
                input.type="text"
                if (element===" ") {
                    input.style.backgroundColor = "var(--black)";
                }
                container.appendChild(input);
                count++;
            });
        }
        
        showAlphabet(){
        
            const container = document.querySelector("#alphabet");
            let count =1;
            
            this.alphabet.forEach(element => {
                const button = document.createElement("button");
                button.id= element;
                button.textContent=element
                button.addEventListener("click",()=> this.pressLetter(element))
                container.appendChild(button);
                count++;
            });
        }

   
        pressLetter(letter){
            const val= this.word.find(element=> element===letter);
            const btn= document.querySelector(`#${letter}`);
            
            if (!val) {
                btn.disabled=true;
                this.tries.push(letter);
            }else{
                for (let index = 0; index < this.word.length; index++) {
                    let element = this.word[index];
                    var input = document.querySelector(`#letter${index+1}`);
                    if (element===val) {
                        this.goodtries[index]=letter ;   
                        input.value=element;
                    }

                }
                if (this.goodtries.equals(this.word)) {
                    swal("Simon Dice", "Felicitaciones, Ganaste!", "success")
                    .then(this.toggleBtnEmpezar())
                    .then(this.cleanInputs())
                    .then(this.cleanAlphabet())
                }

            }

        }

        cleanInputs(){
            const container = document.querySelector("#word");  
            this.word.forEach(element => {
                const input = document.querySelector("input");
                container.removeChild(input);
            });
        }
        cleanAlphabet(){           
            const container = document.querySelector("#alphabet");
            this.alphabet.forEach(element => {
                const button = document.querySelector(`#${element}`);
                container.removeChild(button);
            });
        }
        
    }
    
    function empezarJuego() {
        var start;
        swal("Write something here:", {
            content: "input",
        })
        .then(text => {
            if (!text) {
                swal("Inserte un mensaje");
            }else{
                text =text.replace(/ /g, "")
                start = new game(text.split(""));
                
            }
        });
        

    }

