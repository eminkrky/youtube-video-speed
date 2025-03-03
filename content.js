

// Ana fonksiyon - Sayfada hazır olduğunda çalışacak
function init() {
  // YouTube video sayfasında olduğumuzdan emin olalım
  if (!document.querySelector("video")) {
    setTimeout(init, 1000); // Video yüklenene kadar bekle
    return;
  }

  // Butonun ekleneceği alanı bul
  const targetContainer = document.querySelector(".ytp-left-controls");
  if (!targetContainer) {
    setTimeout(init, 1000); // Sayfa tamamen yüklenene kadar bekle
    return;
  }

  // Hız kontrolü butonunu oluştur
  const speedButton = document.createElement("button");
  speedButton.className = "speed-control-button";
  speedButton.innerHTML = `
           <svg height="24" viewBox="0 0 24 24" width="24">
            <path d="M10,8v8l6-4L10,8L10,8z M6.3,5L5.7,4.2C7.2,3,9,2.2,11,2l0.1,1C9.3,3.2,7.7,3.9,6.3,5z M5,6.3L4.2,5.7C3,7.2,2.2,9,2,11 l1,.1C3.2,9.3,3.9,7.7,5,6.3z M5,17.7c-1.1-1.4-1.8-3.1-2-4.8L2,13c0.2,2,1,3.8,2.2,5.4L5,17.7z M11.1,21c-1.8-0.2-3.4-0.9-4.8-2 l-0.6,.8C7.2,21,9,21.8,11,22L11.1,21z M22,12c0-5.2-3.9-9.4-9-10l-0.1,1c4.6,.5,8.1,4.3,8.1,9s-3.5,8.5-8.1,9l0.1,1 C18.2,21.5,22,17.2,22,12z" fill="white"></path>
          </svg>`;
  speedButton.addEventListener("click", openSpeedControl);

  targetContainer.appendChild(speedButton);

  console.log("YouTube Gelişmiş Hız Kontrolü eklentisi yüklendi");
}

// Hız kontrol penceresini aç
function openSpeedControl() {
  // Overlay oluştur
  const overlay = document.createElement("div");
  overlay.className = "speed-control-overlay";
  document.body.appendChild(overlay);

  // Modal pencere oluştur
  const modal = document.createElement("div");
  modal.className = "speed-control-modal";

  // Modal içeriği
  modal.innerHTML = `
      <div class="speed-control-header">
        <div class="speed-control-title">Video Hızını Ayarla</div>
        <button class="speed-control-close">×
        </button>
      </div>
      
      <div class="speed-control-slider-container">
        <div class="speed-control-value">1.0x</div>
        <input type="range" class="speed-control-slider" min="0.1" max="10" step="0.1" value="1">
      </div>
      
      <div class="speed-control-presets">
        <div class="speed-control-preset" data-speed="0.25">0.25x</div>
        <div class="speed-control-preset" data-speed="0.5">0.5x</div>
        <div class="speed-control-preset" data-speed="1">1x</div>
        <div class="speed-control-preset" data-speed="1.5">1.5x</div>
        <div class="speed-control-preset" data-speed="2">2x</div>
        <div class="speed-control-preset" data-speed="3">3x</div>
        <div class="speed-control-preset" data-speed="5">5x</div>
        <div class="speed-control-preset" data-speed="10">10x</div>
      </div>
    `;

  document.body.appendChild(modal);

  // Kapatma düğmesi işlevselliği
  const closeButton = modal.querySelector(".speed-control-close");
  closeButton.addEventListener("click", closeSpeedControl);

  // Overlay'a tıklandığında kapatma
  overlay.addEventListener("click", closeSpeedControl);

  // Slider değişikliği takibi
  const slider = modal.querySelector(".speed-control-slider");
  const valueDisplay = modal.querySelector(".speed-control-value");

  slider.addEventListener("input", () => {
    const speed = slider.value;
    valueDisplay.innerText = `${speed}x`;
    setVideoSpeed(speed);
  });

  // Hazır ayar butonları
  const presets = modal.querySelectorAll(".speed-control-preset");
  presets.forEach((preset) => {
    preset.addEventListener("click", () => {
      const speed = preset.getAttribute("data-speed");
      slider.value = speed;
      valueDisplay.innerText = `${speed}x`;
      setVideoSpeed(speed);
    });
  });
}

// Hız kontrol penceresini kapat
function closeSpeedControl() {
  const overlay = document.querySelector(".speed-control-overlay");
  const modal = document.querySelector(".speed-control-modal");

  if (overlay) overlay.remove();
  if (modal) modal.remove();
}

// Video hızını ayarla
function setVideoSpeed(speed) {
  const video = document.querySelector("video");
  if (video) {
    video.playbackRate = parseFloat(speed);
    console.log(`Video hızı ${speed}x olarak ayarlandı`);
  }
}

// Sayfa yüklendikten sonra başlat
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
