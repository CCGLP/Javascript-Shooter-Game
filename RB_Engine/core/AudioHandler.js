class AudioHandler{
  constructor(){
    window.audioHandler = this
    this.audioArray = []
  }

  setAudio(url, loop = false, autoPlay = true){
    var last = this.audioArray.length
    var id = "music" + last
    var typeAudio = url.substr(url.length-3)
    if (typeAudio == "mp3"){
      typeAudio = "mpeg"
    }
      
    if (!loop)
        document.write("<audio "+ "id = \""+id +"\">")
      else{
        document.write("<audio loop "+ "id = \""+id +"\">")

      }
    document.write("<source src = \""+ url +"\" type = \"audio/" + typeAudio+"\">" )
    document.write("</audio>")
    
    this.audioArray[last] = document.getElementById(id)
    if (autoPlay)
        this.audioArray[last].play();
    return last;
  }

 stopAudio(index){
   this.audioArray[index].pause();
 }

 playAudio(index){
   this.audioArray[index].play();
 }






}
