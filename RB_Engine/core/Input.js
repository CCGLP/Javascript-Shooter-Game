class Input{

  constructor(){
      if (window.input == null){
          window.input = this;
        
      }
      else{
          return window.input; 
      }



  }

  



}
