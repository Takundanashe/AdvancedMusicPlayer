const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const playlist = document.querySelector(".playlist");
const volumeControl = document.getElementById("volume");

let ctrlIcon = document.getElementById("ctrlIcon");
let totaltime = document.querySelector(".totaltime");
let currenttime = document.querySelector(".currentime");
let progress = document.getElementById("progress");
const musicPlaylist =[];

let currentSongIndex=0;

const musicPlayer = document.getElementById("song");

//control volume;

volumeControl.addEventListener('input',function(){
    musicPlayer.volume = volumeControl.value;

})
dropArea.addEventListener("dragover",function(e){
    e.preventDefault();

})



dropArea.addEventListener("drop",function(e){
    e.preventDefault();
    files = e.dataTransfer.files;
    
    console.log(files);
    UploadMusic(files);


})

inputFile.addEventListener("change",handleFileSelect);

function handleFileSelect(event)
{
    const files = event.target.files;
    UploadMusic(files);
    
}
function UploadMusic(files){
    for(const file of files)
    {
        const musicObject = {
            name:file.name,
            artist:"unknown",
            img:"468-thumbnail.png",
            src:"",
            duration:0,
        };

        //reading the file path of the music file
        const reader = new FileReader();
        reader.onload = function(event)
        {
            musicObject.src= event.target.result;
            musicPlaylist.push(musicObject);

            const audio = new Audio(event.target.result);
            audio.addEventListener('loadedmetadata', function() {
              musicObject.duration = audio.duration;
              // Update the playlist display
              updatePlaylist();
            });
            //console.log(musicPlaylist);
           

        };
        reader.readAsDataURL(file);

    }
}

musicPlayer.onloadedmetadata = function()
        {
            progress.max = song.duration;
            progress.value = song.currentTime;
            totalmin = Math.floor(song.duration/60);
            totalsec = Math.floor(song.duration%60);
            totaltime.innerHTML=`${totalmin}:${totalsec}`;

}

function playMusic(index)
{
    if(index>=0 && index<musicPlaylist.length)
    {
        currentSongIndex=index;

        musicPlayer.src=musicPlaylist[index].src;
        musicPlayer.play();
        totaltime.innerHTML=musicPlaylist[index].duration;
        document.querySelector(".container h1").innerHTML = musicPlaylist[index].name;
        document.querySelector(".container p").innerHTML=musicPlaylist[index].artist;
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
        updateProgress();

        musicPlayer.volume = volumeControl.value;
    }
}


let totalmin,totalsec;
let currSec,currMin;



function updatePlaylist()
{
    playlist.innerHTML = '';
    musicPlaylist.forEach((music,index)=>{
        const item = document.createElement("ul");
        item.innerHTML= `<li>${music.artist}</li><li>${music.name}</li>`;

        item.onclick = function()
        {
            playMusic(index);

        }
        playlist.appendChild(item);

    });

}

if(musicPlayer.play())

        {
            setInterval(()=>{
                progress.value = musicPlayer.currentTime;
                currMin = Math.floor(musicPlayer.currentTime/60);
                currSec = Math.floor(musicPlayer.currentTime%60);

                if(currSec<10)
                {
                    currSec = `0${currSec}`;

                }
                currenttime.innerHTML =`${currMin}:${currSec}`;

                console.log(currMin);

            },500);
        }

        function formatDuration(duration){
            const minutes = Math.floor(duration / 60);
            const seconds = Math.floor(duration % 60);
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }

        function playPause()
        {
            if(ctrlIcon.classList.contains("fa-pause"))
            {
                musicPlayer.pause();
                ctrlIcon.classList.remove("fa-pause");
                ctrlIcon.classList.add("fa-play");

            }else {
                musicPlayer.play();
                ctrlIcon.classList.add("fa-pause");
                ctrlIcon.classList.remove("fa-play");
            }
        }

        progress.onchange = function()
        {
            musicPlayer.play();
            musicPlayer.currentTime = progress.value;
            ctrlIcon.classList.add("fa-pause");
            ctrlIcon.classList.remove("fa-play");
        }
        function closePlaylist()
        {
            document.querySelector(".music-list").style.display ="none";

        }
        function openPlaylist()
        {
            document.querySelector(".music-list").style.display ="block";
        }

        function playNext() {
            if (currentSongIndex < musicPlaylist.length - 1) {
              currentSongIndex++; // Increment the currently playing song index
              playMusic(currentSongIndex);
            } else {
              // Optionally, you can loop back to the beginning of the playlist or stop playback
              // For simplicity, we'll stop playback when reaching the end of the playlist
              currentSongIndex=0;
                playMusic(currentSongIndex);
             // musicPlayer.pause();
            }
          }
          function updateProgress(){
            musicPlayer.addEventListener("timeupdate",function(){
                const currtime = musicPlayer.currentTime;
                const dur = musicPlayer.duration;
                progress.value = currtime;
                progress.max= dur;
                currenttime.innerHTML = formatDuration(currtime);
                totaltime.innerHTML = formatDuration(dur);

            })
          }

          function playPrevious() {
            if (currentSongIndex > 0) {
              currentSongIndex--; // Decrement the currently playing song index
              playMusic(currentSongIndex);
            } else {
              currentSongIndex =(musicPlaylist.length-1);

              playMusic(currentSongIndex);

            }

          }
     
