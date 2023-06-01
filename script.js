console.log('welcome to spotify');

//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Jamila by Manindar Buttar", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Yeah Baby - Garry Sandhu", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"}, 
    {songName: "High Life - Bohemia", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Zeher - Bohemia", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Koka by Sukh-E", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Old Skool - Moose Wala", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sitara - Divine", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Grind - Emiway Bantai", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Lethal - Bilal Saeed", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Kendi Hundi c - AP Dhillon", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"}
]

songItems.forEach((e, i)=>{

    e.getElementsByTagName('img')[0].src = songs[i].coverPath;
    e.getElementsByClassName('songName')[0].innerText = songs[i].songName;
    
})

//Handle Play/Pause Click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play(); 
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;

    }

})

//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //update seekbar
   let progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
   myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100; 
});

const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');


    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
     element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.add('fa-circle-pause');
        e.target.classList.remove('fa-circle-play');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

     })
});

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= 9){
        songIndex = 0
    }
    else{
        songIndex += 1
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        masterSongName.innerText = songs[songIndex].songName;

});


document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0){
        songIndex = 0
    }
    else{
        songIndex -= 1
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
     audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    masterSongName.innerText = songs[songIndex].songName;
    
});