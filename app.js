class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    // index tracks the track
    this.index = 0;
    // beats per minute
    this.bpm = 150;
  }

  activePad() {
    // console.log(this);
    this.classList.toggle("active");
  }

  repeat() {
    // will create a loop for the pads
    // if reaches 8 then will become 0
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    activeBars.forEach((bar) => {
      bar.style.animation = `playtrack 0.3s alternate ease-in-out 2`;
      // check if current pad is active
      if (bar.classList.contains("active")) {
        // which type of pad is active
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }

  start() {
    // *1000 because setInterval takes milliseconds
    const interval = (60 / this.bpm) * 1000;
    setInterval(() => {
      this.repeat();
    }, interval);
  }
}

const drumKit = new DrumKit();

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.playBtn.addEventListener("click", () => {
  drumKit.start();
});
