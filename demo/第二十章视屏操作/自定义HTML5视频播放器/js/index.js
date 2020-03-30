let els = {
    videoPlayer: document.querySelector('#video-player')
};

let configs = {
    messageTimer: 0,
    canplay: false,
    bufferedEnd: 0,
    mutedChangeed: false,
    prevClickTimestamp: Date.now(),
    dblClickTimer: 0,
    fullScreenTimer: 0
};

let helpers = {
    convertToCamelCase(str) {
        return str.replace(/\-(\w)/g, ($0, $1) => {
            return $1.toUpperCase();
        });
    },
    formatDuration(ms) {
        let h = helpers.addZero(parseInt(ms / 3600000));
        ms = ms % 3600000;
        let m = helpers.addZero(parseInt(ms / 60000));
        ms = ms % 60000;
        let s = helpers.addZero(parseInt(ms / 1000));
        return `${h}:${m}:${s}`;
    },
    addZero(val) {
        return val < 10 ? '0' + val : val;
    },
    getDisCursorToElement(el, e) {
        let {x, y} = el.getBoundingClientRect();
        return {
            x: e.clientX - x,
            y: e.clientY - y
        }
    }
}


'video,control,play,time,progress-container,progress-loaded,progress-played,progress-bar,fullscreen,volume,control-volume-box,control-volume-range,control-volume-slider,control-volume-bar,speed,control-speed-box,message'.split(',').forEach( k => {
    els[ helpers.convertToCamelCase(k) ] = els.videoPlayer.querySelector( '.' + k )
});
els.controlSpeedList = els.controlSpeedBox.querySelectorAll('li');


let methods = {
    canplay() {
        configs.canplay = true;
    },
    playOrPause() {
        if (!configs.canplay) {
            return;
        }
        if (els.video.paused) {
            els.video.play();
        } else {
            els.video.pause();
        }
    },
    playing() {
        els.play.classList.remove('play');
        els.play.classList.add('pause');
    },
    pause() {
        els.play.classList.remove('pause');
        els.play.classList.add('play');
    },
    durationchange() {
        methods.timeupdate();
    },
    timeupdate() {
        // 更新时间
        let duration = els.video.duration * 1000;
        let currentTime = els.video.currentTime * 1000;

        els.time.innerHTML = `${helpers.formatDuration(currentTime)} / ${helpers.formatDuration(duration)}`;

        // 更新进度
        let v = currentTime / duration;
        let width = els.progressContainer.clientWidth;
        els.progressPlayed.style.width = width * v + 'px';
        els.progressBar.style.left = (width - els.progressBar.offsetWidth) * v + 'px';
    },
    showMessage(message) {
        clearTimeout(configs.messageTimer);
        els.message.innerHTML = message;
        els.message.style.opacity = 1;
        configs.messageTimer = setTimeout(() => {
            els.message.style.opacity = 0;
        }, 2000);
    },
    progress() {
        // console.log('progress');
        let buffered = els.video.buffered;
        // console.log(buffered);

        if ( buffered.length > 0 ) {
            configs.bufferedEnd = buffered.end(buffered.length - 1) || 0;
        }

        // console.log(configs.bufferedEnd);

        let containerWidth = els.progressContainer.clientWidth;
        els.progressLoaded.style.width = containerWidth * ( configs.bufferedEnd / els.video.duration ) + 'px';

    },
    ratechange() {
        els.controlSpeedList.forEach( list => {
            if (list.dataset.rate == els.video.playbackRate) {
                list.classList.add('focus');
            } else {
                list.classList.remove('focus');
            }
        } );
    },
    volumechange() {

        if (configs.mutedChangeed) {
            // 表示当前的事件是由静音变化导致的
            configs.mutedChangeed = false;
        } else {
            if (els.video.volume <= 0) {
                els.video.volume = 0;
                els.video.muted = true;
            } else {
                els.video.muted = false;
            }
        }


        if (els.video.muted) {
            els.volume.classList.remove('volume');
            els.volume.classList.add('muted');
            els.controlVolumeSlider.style.height = '0px';
        } else {
            els.volume.classList.remove('muted');
            els.volume.classList.add('volume');
            els.controlVolumeSlider.style.height = els.video.volume * 160 + 'px';
        }
    },
    requestOrExitFullScreen() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            els.videoPlayer.requestFullscreen();
        }
    }
};






// console.log( helpers.formatDuration(3800 * 1000) );200
els.video.oncanplay = methods.canplay;
els.video.onplaying = methods.playing;
els.video.onpause = methods.pause;
els.video.ondurationchange = methods.durationchange;
els.video.ontimeupdate = methods.timeupdate;
els.video.onprogress = methods.progress;
els.video.onratechange = methods.ratechange;
els.video.onvolumechange = methods.volumechange;





// console.log(els.video.volume);
methods.volumechange();


els.videoPlayer.onclick = function(e) {
    let target = e.target;

    if (target === els.play) {
        methods.playOrPause();
    }

    if (target === els.video) {
       if ( Date.now() - configs.prevClickTimestamp < 500 ) {
           // 双击
           //console.log('双击');
           clearTimeout(configs.dblClickTimer);
           methods.requestOrExitFullScreen();
       } else {
           //console.log('单击');
           // methods.playOrPause();
           configs.dblClickTimer = setTimeout(() => {
               methods.playOrPause();
           }, 500);
       }
    }
    configs.prevClickTimestamp = Date.now();
}
els.progressContainer.onclick = function(e) {
    let pos = helpers.getDisCursorToElement(this, e);
    let v = pos.x / els.progressContainer.clientWidth;
    els.video.currentTime = els.video.duration * v;

    
    methods.showMessage(`当前时间：${helpers.formatDuration(els.video.currentTime * 1000)}`);
}
// 显示隐藏播放速度面板
els.speed.onmouseenter = function() {
    els.controlSpeedBox.style.display = 'block';
}
els.speed.onmouseleave = function() {
    els.controlSpeedBox.style.display = 'none';
}
els.controlSpeedList.forEach( list => {
    list.onclick = function() {
        els.video.playbackRate = this.dataset.rate;

        methods.showMessage(`当前速度：${els.video.playbackRate}`);
    }
} );
// 显示隐藏播放音量面板
els.volume.onmouseenter = function() {
    els.controlVolumeBox.style.display = 'block';
}
els.volume.onmouseleave = function() {
    els.controlVolumeBox.style.display = 'none';
}
// 拖拽改变音量
els.controlVolumeBar.onmousedown = function(e) {
    document.onmousemove = function(e) {

        // console.log(1 - helpers.getDisCursorToElement(els.controlVolumeRange, e).y / 160);

        try{
            els.video.volume = (1 - helpers.getDisCursorToElement(els.controlVolumeRange, e).y / 160).toFixed(2);

            console.log(els.video.volume);
        } catch(e){}
    }
    document.onmouseup = function() {
        document.onmousemove = null;
    }

    return false;
}
// 点击改变音量
els.controlVolumeBox.onclick = function(e) {
    if (e.target === els.controlVolumeRange || e.target === els.controlVolumeSlider) {
        els.video.volume = ( 1 - helpers.getDisCursorToElement(els.controlVolumeRange, e).y / 160 ).toFixed(2);
    }
}
// 静音切换
els.volume.onclick = function(e) {
    if (e.target === this) {
        els.video.muted = !els.video.muted;
        configs.mutedChangeed = true;
    }
}
// 点击全屏和退出全屏
els.fullscreen.onclick = methods.requestOrExitFullScreen;

// 全屏播放隐藏鼠标和控制面板
els.videoPlayer.onmousemove = function() {
    if (!els.video.paused) {
        clearTimeout(configs.fullScreenTimer);
        els.control.style.opacity = 1;
        els.videoPlayer.style.cursor = 'pointer';
        configs.fullScreenTimer = setTimeout(() => {
            els.control.style.opacity = 0;
            els.videoPlayer.style.cursor = 'none';
        }, 2000);
    }
}