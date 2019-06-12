'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 16;
var HIST_HEIGHT = 140;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var cloudGap = CLOUD_X + GAP;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, cloudGap, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', cloudGap, CLOUD_Y + GAP + FONT_GAP);
  ctx.fillText('Список результатов:', cloudGap, CLOUD_Y + (GAP + FONT_GAP) * 2);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var colomnSpace = CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i;
    var barHeight = CLOUD_HEIGHT - GAP - FONT_GAP - GAP - HIST_HEIGHT * times[i] / maxTime;
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], colomnSpace, CLOUD_HEIGHT - GAP);
    ctx.fillText(Math.floor(times[i]), colomnSpace, barHeight - GAP);
    ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, 1)';

    ctx.globalAlpha = names[i] !== 'Вы' ? Math.random() : 1;

    ctx.fillRect(colomnSpace, barHeight, BAR_WIDTH, HIST_HEIGHT * times[i] / maxTime);
  }
};
