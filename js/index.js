//**************************************
// Dragos Rotaru April 20, 2016
// DoctorBondage.com
// Landing page code
//**************************************

// Title canvas Code

var canvas = document.createElement("canvas"),
  ctx = canvas.getContext("2d"),
  cw = (canvas.width = 1000),
  ch = (canvas.height = 80),
  messageString = "I N I T I A T I N G  S E Q U E N C E . . .",
  messageArray = messageString.split(""),
  messageLength = messageArray.length,
  pointer = 0,
  typeTick = 0,
  typeTickMax = 2,
  typeResetTick = 0,
  typeResetMax = 140;

ctx.font = "bold 50px Helvetica";
ctx.textAlign = "left";
ctx.textBaseline = "top";
ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
ctx.shadowColor = "red";

function updateTypeTick() {
  if (pointer < messageLength) {
    if (typeTick < typeTickMax) {
      typeTick++;
    } else {
      typeTick = 0;
      pointer++;
    }
  } else {
  }
}

function renderMessage() {
  var text = messageArray.slice(0, pointer);
  ctx.shadowBlur = 10;
  ctx.fillStyle = "hsla(0, 100%, 50%, 0.65)";
  var x = 20,
    y = 20;

  if (Math.random() < 0.05) {
    ctx.fillStyle = "hsla(0, 0%, 0%, " + (0.25 + Math.random() * 0.5) + ")";
  }
  if (Math.random() < 0.1) {
    x += -3 + Math.random() * 6;
  }
  if (Math.random() < 0.1) {
    y += -3 + Math.random() * 6;
  }
  if (Math.random() < 0.99) {
    ctx.fillText(text.join(""), Math.round(x), Math.round(y));
  }
  ctx.shadowBlur = 0;
}

function renderLines() {
  ctx.globalCompositeOperation = "source-over";
  ctx.beginPath();
  for (var i = 0; i < ch / 2; i += 1) {
    ctx.moveTo(0, i * 2 + 0.5);
    ctx.lineTo(cw, i * 2 + 0.5);
  }
  ctx.stroke();
  ctx.globalCompositeOperation = "lighter";
}

function loop() {
  requestAnimationFrame(loop);
  //ctx.clearRect(0, 0, cw, ch);
  ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, cw, ch);
  ctx.globalCompositeOperation = "lighter";
  updateTypeTick();
  renderMessage();
  renderLines();
}

document.body.appendChild(canvas);
document.getElementById("title").appendChild(canvas);
loop();

$("#enter").on("click", function init() {
  $("#welcome").remove();
  // addToPlaylist("REZZ x Raito - Alien MASTER V2", "rezz.mp3");
  // play($("#playlist li:first"));
  setInterval(draw, 3);
});

// SIGNATURE PROGRESS
function moveProgressBar() {
  var getPercent = $(".progress-wrap").data("progress-percent") / 100;
  var getProgressWrapWidth = $(".progress-wrap").width();
  var progressTotal = getPercent * getProgressWrapWidth;
  var animationLength = 3000;

  // on page load, animate percentage bar to data percentage length
  // .stop() used to prevent animation queueing
  $(".progress-bar")
    .stop()
    .animate(
      {
        left: progressTotal
      },
      animationLength,
      function() {
        $(".progress").hide();
        $("#enter").show();
      }
    );
}

$(document).ready(function() {
  // on page load...
  moveProgressBar();
  // on browser resize...
  $(window).resize(function() {
    moveProgressBar();
  });
});
