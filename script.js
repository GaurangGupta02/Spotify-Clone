console.log("Welcome to Spotify");
    
        let songindex = 0;
        let audioElement = new Audio('songs/1.mp3');
        let masterplay = document.getElementById('masterplay');
        let myprogressbar = document.getElementById('myprogressbar');
        let gif = document.getElementById('gif');
        let mastersongname = document.getElementById('mastername');
        let songitems = Array.from(document.getElementsByClassName('songitems'));
    
        let songs = [
            {songnames: 'Aaj Ki Raat', filepath: 'songs/1.mp3', coverpath: 'covers/cover1.jpg'},
            {songnames: 'Aayi Nai', filepath: 'songs/2.mp3', coverpath: 'covers/cover2.jpg'},
            {songnames: 'Arjan Vailly', filepath: 'songs/3.mp3', coverpath: 'covers/cover3.jpg'},
            {songnames: 'Dil Se Dil Tak', filepath: 'songs/4.mp3', coverpath: 'covers/cover4.jpg'},
            {songnames: 'Garmi', filepath: 'songs/5.mp3', coverpath: 'covers/cover5.jpg'},
            {songnames: 'Ik Vaari Aa', filepath: 'songs/6.mp3', coverpath: 'covers/cover6.jpg'},
            {songnames: 'Kamariya', filepath: 'songs/7.mp3', coverpath: 'covers/cover7.jpg'},
            {songnames: 'Keshava Madhava', filepath: 'songs/8.mp3', coverpath: 'covers/cover8.jpg'},
            {songnames: 'Millionare', filepath: 'songs/9.mp3', coverpath: 'covers/cover9.jpg'},
            {songnames: 'Tumhare Hi Rahenge', filepath: 'songs/10.mp3', coverpath: 'covers/cover10.jpg'},
            {songnames: 'Hare Ram Hare Ram', filepath: 'songs/11.mp3', coverpath: 'covers/cover11.png'}
        ];
    
        songitems.forEach((element, i) => { 
            element.getElementsByTagName("img")[0].src = songs[i].coverpath; 
            element.getElementsByClassName("songnames")[0].innerText = songs[i].songnames; 
        });
    
        masterplay.addEventListener('click', () => {
            if (audioElement.paused || audioElement.currentTime <= 0) {
                audioElement.play();
                masterplay.classList.remove('fa-play-circle');
                masterplay.classList.add('fa-pause-circle');
                gif.style.opacity = 1;
            } else {
                audioElement.pause();
                masterplay.classList.remove('fa-pause-circle');
                masterplay.classList.add('fa-play-circle');
                gif.style.opacity = 0;
            }
        });
    
        audioElement.addEventListener('timeupdate', () => { 
            progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); 
            myprogressbar.value = progress;
        });
    
        myprogressbar.addEventListener('change', () => {
            audioElement.currentTime = myprogressbar.value * audioElement.duration / 100;
        });
    
        const makeAllPlays = () => {
            Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
                element.classList.remove('fa-pause-circle');
                element.classList.add('fa-play-circle');
            });
        };
    
        Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
            element.addEventListener('click', (e) => { 
                makeAllPlays();
                songindex = parseInt(e.target.id);
                e.target.classList.remove('fa-play-circle');
                e.target.classList.add('fa-pause-circle');
                audioElement.src = `songs/${songindex + 1}.mp3`;
                mastersongname.innerText = songs[songindex].songnames;
                audioElement.currentTime = 0;
                audioElement.play();
                gif.style.opacity = 1;
                masterplay.classList.remove('fa-play-circle');
                masterplay.classList.add('fa-pause-circle');
            });
        });
    
        let shuffle = false;
        document.getElementById('shuffle').addEventListener('click', () => {
            shuffle = !shuffle; 
            document.getElementById('shuffle').classList.toggle('active'); 
        });
    
        let repeat = false; // Add repeat variable
        document.getElementById('repeat').addEventListener('click', () => {
            repeat = !repeat; // Toggle repeat
            document.getElementById('repeat').classList.toggle('active'); // Optionally add active state
        });
    
        audioElement.addEventListener('ended', () => {
            if (repeat) {
                audioElement.currentTime = 0; // Reset to start
                audioElement.play(); // Play the current song again
            } else {
                if (shuffle) {
                    songindex = Math.floor(Math.random() * songs.length);
                } else {
                    songindex = (songindex >= songs.length - 1) ? 0 : songindex + 1;
                }
                audioElement.src = songs[songindex].filepath;
                mastersongname.innerText = songs[songindex].songnames;
                audioElement.currentTime = 0;
                audioElement.play();
                masterplay.classList.remove('fa-play-circle');
                masterplay.classList.add('fa-pause-circle');
                gif.style.opacity = 1;
            }
        });
    
        document.getElementById('next').addEventListener('click', () => {
            if (shuffle) {
                songindex = Math.floor(Math.random() * songs.length); 
            } else {
                songindex = (songindex >= songs.length - 1) ? 0 : songindex + 1;
            }
            audioElement.src = songs[songindex].filepath;
            mastersongname.innerText = songs[songindex].songnames;
            audioElement.currentTime = 0;
            audioElement.play();
            masterplay.classList.remove('fa-play-circle');
            masterplay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
        });
    
        document.getElementById('previous').addEventListener('click', () => {
            if (shuffle) {
                songindex = Math.floor(Math.random() * songs.length); 
            } else {
                songindex = (songindex <= 0) ? songs.length - 1 : songindex - 1;
            }
            audioElement.src = songs[songindex].filepath;
            mastersongname.innerText = songs[songindex].songnames;
            audioElement.currentTime = 0;
            audioElement.play();
            masterplay.classList.remove('fa-play-circle');
            masterplay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
        });