class AudioHandler{
  constructor(){
    window.audioHandler = this
    this.audioArray = []
  }

  setAudio(url){
    var last = this.audioArray.length
    var id = "music" + last
    var typeAudio = url.substr(url.length-3)
    if (typeAudio == "mp3"){
      typeAudio = "mpeg"
    }
    document.write("<audio " + "id = \""+id +"\">")
    document.write("<source src = \""+ url +"\" type = \"audio/" + typeAudio+"\">" )
    document.write("</audio>")
    this.audioArray[last] = document.getElementById(id)
    this.audioArray[last].play();
    return last;

  //<source src="horse.ogg" type="audio/ogg">
  //<source src="horse.mp3" type="audio/mpeg">
  }

 stopAudio(index){
   this.audioArray[index].pause();
 }

 playAudio(index){
   this.audioArray[index].play();
 }






}
