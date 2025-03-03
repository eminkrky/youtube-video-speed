Video accelerator extension for youtube

Youtube sitesinde videoların hızını 0.1x ile 10x arasında hızını ayarla özelliği bulunan açık kaynaklı chrome uzantısı.
Sade ve kullanışlı arayüze sahip 


```
// Video hızını ayarla
function setVideoSpeed(speed) {
  const video = document.querySelector("video");
  if (video) {
    video.playbackRate = parseFloat(speed);
    console.log(`Video hızı ${speed}x olarak ayarlandı`);
  }
}
```

![SS1](https://github.com/eminkrky/youtube-video-speed/blob/main/Screenshots/s1.png)
![SS2](https://github.com/eminkrky/youtube-video-speed/blob/main/Screenshots/s2.png)
