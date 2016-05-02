var ctx = document.getElementById('canvas').getContext('2d');
var img = new Image();


var mergeData = function(newData, color){
    var oData = orginalData.data;
    var bit, offset;

    switch(color){
        case 'R':
            bit = 0;
            offset = 3;
            break;
        case 'G':
            bit = 1;
            offset = 2;
            break;
        case 'B':
            bit = 2;
            offset = 1;
            break;
    }

    // 只处理目标通道
    for(var i = bit; i < oData.length;i = i+4){
          if(newData[i + offset] === 0 && (oData[i] % 2 === 1)){
              // 没有信息的像素并且最低位为1，把该通道最低位置0，但不要越界，（这边只是一个简单的处理方式，还可以其他加密方式）
              if(oData[i] === 255){
                  oData[i]--;
              } else {
                  oData[i]++;
              }
          } else if ( newData[i + offset] !== 0 && (oData[i] % 2 === 0)){
              // // 有信息的像素并且最低位为0，该通道最低位置1，
              if(oData[i] === 255){
                  oData[i]--;
              } else {
                  oData[i]++;
              }
          }
    }
    ctx.putImageData(orginalData, 0, 0);
    alert("加密结束,可以右击保存图片");
}


var processData = function(originalData,value){
    var ctx_hide = document.getElementById('hidetext').getContext('2d');
    ctx_hide.font = '30px Microsoft Yahei';
    ctx_hide.fillText(value, 60, 130);
    var textData = ctx_hide.getImageData(0, 0, ctx_hide.canvas.width, ctx_hide.canvas.height).data;
    mergeData(textData,'R')
    // 将结果绘制到画布
    ctx.putImageData(originalData, 0, 0);
}


img.onload = function() {
    ctx.drawImage(img, 0, 0);
    // 获取指定区域的canvas像素信息
    orginalData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
};

$("#encode").on('click',function (e) {
  var text = $("#text");
  if (!text.val()){
    alert("请输入你要加密的东西")
    return;
  }
  // img.src = '/static/img/zk.png';
  // orginalData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  processData(orginalData,text.val());
})

$("#decode").on('click',function (e) {
  var data = orginalData.data;
  for(var i = 0; i < data.length; i++){
      if(i % 4 == 0){
          if(data[i] % 2 == 0){
              data[i] = 0;
          } else {
              data[i] = 255;
          }
      } else if(i % 4 == 3){
          continue;
      } else {
          data[i] = 0;
      }
  }
  ctx.putImageData(orginalData, 0, 0);
})



img.src = '/static/img/zk.png'
