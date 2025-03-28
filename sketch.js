let seaweeds = [];
let colors = ['#dad7cd', '#a3b18a', '#588157', '#3a5a40', '#344e41']; // 指定的水草顏色

function setup() {
  // 設置透明背景的畫布
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('position', 'absolute'); // 讓畫布絕對定位
  canvas.style('z-index', '1'); // 設置畫布在 iframe 之上
  canvas.style('pointer-events', 'none'); // 禁止畫布阻擋 iframe 的互動

  // 初始化水草
  initializeSeaweeds();

  // 在視窗中間生成 iframe
  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.tku.edu.tw/');
  iframe.style('position', 'absolute');
  iframe.style('width', '50vw'); // 寬度為視窗的 50%
  iframe.style('height', '50vh'); // 高度為視窗的 50%
  iframe.style('top', '25%'); // 垂直置中
  iframe.style('left', '25%'); // 水平置中
  iframe.style('border', 'none'); // 移除邊框
  iframe.style('z-index', '0'); // 設置 iframe 在畫布之下
}

function draw() {
  clear(); // 清除畫布背景，保持透明效果

  // 繪製每條水草
  for (let seaweed of seaweeds) {
    drawSeaweed(seaweed);
  }
}

function drawSeaweed(seaweed) {
  push();
  // 設置顏色並加入透明度
  let transparentColor = color(seaweed.color);
  transparentColor.setAlpha(128); // 設置透明度為 50%（128/255）
  stroke(transparentColor);
  strokeWeight(seaweed.thickness);
  noFill();

  // 繪製水草
  beginShape();
  for (let y = height; y > height - seaweed.height; y -= 10) {
    // 計算每個節點的搖晃偏移量
    let localSway = sin(frameCount * seaweed.swaySpeed + seaweed.swayOffset + y * 0.05) * seaweed.swayAmplitude;
    let x = seaweed.x + localSway; // 每個節點的水平位置隨偏移量改變
    vertex(x, y);
  }
  endShape();
  pop();
}

// 初始化水草屬性
function initializeSeaweeds() {
  seaweeds = []; // 清空現有的水草
  for (let i = 0; i < 40; i++) {
    seaweeds.push({
      x: random(width), // 水草的水平位置
      height: random(100, 300), // 水草的高度
      color: random(colors), // 隨機選擇一個顏色
      thickness: random(5, 15), // 水草的粗細
      swaySpeed: random(0.01, 0.05), // 水草搖晃的頻率
      swayOffset: random(TWO_PI), // 搖晃的初始偏移
      swayAmplitude: random(5, 15) // 搖晃的最大幅度
    });
  }
}

// 當視窗大小改變時重新調整畫布和水草
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // 重新計算水草的水平位置
  initializeSeaweeds(); // 重新初始化水草
}
