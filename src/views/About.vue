<template>
  <div class="turn-box">
    <canvas id="chart" ref="turnBox" height="400" width="600">
      你的浏览器不支持HTML5 canvas
    </canvas>
    <canvas id="centerChart" ref="centerChart" height="400" width="600">
      你的浏览器不支持HTML5 canvas
    </canvas>
  </div>
</template>
<script>
export default {
  name: "TurnBox",
  data() {
    return {
      canvas: null,
      ctx: null,
      width: 262, // 宽
      height: 262, // 高
      count: 12,
      running: null,
      turnplate: {
        restaraunts: [], //大转盘奖品名称
        lucky: [], //奖品内容
        colors: [], //大转盘奖品区块对应背景颜色
        goodsimgArr: [], //奖品图片页面标签
        outsideRadius: 175, //大转盘外圆的半径
        textRadius: 140, //大转盘奖品位置距离圆心的距离
        insideRadius: 65, //大转盘内圆的半径
        startAngle: 0, //开始角度
        bRotate: false, //false:停止;ture:旋转
      },
      turnInfo: [
        {
          id: 1,
          content: "谢谢参与",
          prize: "111",
          probability: 0.75,
          img: "https://img.stringon.com/dd4cffa524bf46f790520a46fefd1726-S375",
        },
        {
          id: 2,
          content: "现金红包2元",
          prize: "222",
          probability: 0.05,
          img: "https://img.stringon.com/c0f57be115e541fd90b8df5ef163110b-S375",
        },
        {
          id: 3,
          content: "现金红包10元",
          prize: "333",
          probability: 0.02,
          img: "https://img.stringon.com/c0f57be115e541fd90b8df5ef163110b-S375",
        },
        {
          id: 4,
          content: "现金红包3元",
          prize: "444",
          probability: 0.04,
          img: "https://img.stringon.com/c0f57be115e541fd90b8df5ef163110b-S375",
        },
        {
          id: 5,
          content: "现金红包3元",
          prize: "555",
          probability: 0.04,
          img: "https://img.stringon.com/c0f57be115e541fd90b8df5ef163110b-S375",
        },
        {
          id: 6,
          content: "现金红包1元",
          prize: "666",
          probability: 0.1,
          img: "https://img.stringon.com/c0f57be115e541fd90b8df5ef163110b-S375",
        },
        {
          id: 7,
          content: "现金红包1元",
          prize: "666",
          probability: 0.1,
          img: "https://img.stringon.com/c0f57be115e541fd90b8df5ef163110b-S375",
        },
        {
          id: 8,
          content: "现金红包1元",
          prize: "666",
          probability: 0.1,
          img: "https://img.stringon.com/c0f57be115e541fd90b8df5ef163110b-S375",
        },
      ],
    };
  },
  computed: {
    randList() {
      let start = 0;
      return this.turnInfo.map((item) => {
        start = item.probability + start;
        return Number(start.toFixed(2));
      });
    },
  },
  mounted() {
    // 获得canvas上下文
    this.canvas = document.getElementById("chart");
    if (this.canvas && this.canvas.getContext) {
      this.ctx = this.canvas.getContext("2d");
    }
    this.drawCharts();
    const that = this;
    // 点击抽奖
    this.canvas.onclick = async function () {
      if (that.count === 0) return;
      if (that.running) return;
      const rand = that.getPrize();
      that.$refs.turnBox.style.transform = "unset";
      that.$refs.turnBox.style.transition = "all 0s";
      await setTimeout(() => {
        let deg = 1800 + 360 - (360 / that.turnInfo.length) * rand;
        that.$refs.turnBox.style.transform = `rotate(${deg}deg)`;
        that.$refs.turnBox.style.transition = "all 3s ease-in-out";
      });
      console.log(that.turnInfo[rand].content);
      that.running = setTimeout(() => {
        clearTimeout(that.running);
        that.running = null;
        that.count -= 1;
      }, 3000);
    };
  },
  methods: {
    // 图表初始化
    initChart() {
      //   这里是对高清屏幕的处理，
      // 方法：先将canvas的width 和height设置成本来的两倍
      //     然后将style.height 和 style.width设置成本来的宽高
      //     这样相当于把两倍的东西缩放到原来的 1/2，这样在高清屏幕上 一个像素的位置就可以有两个像素的值
      //     这样需要注意的是所有的宽高间距，文字大小等都得设置成原来的两倍才可以。
      // w:370 h:275
      this.canvas.width = this.width * 2;
      this.canvas.height = this.height * 2;
      this.canvas.style.height = `${this.height}px`;
      this.canvas.style.width = `${this.width}px`;

      this.ctx.translate(0.5, 0.5); // 当只绘制1像素的线的时候，坐标点需要偏移，这样才能画出1像素实线
    },
    // 绘制文本
    drawText() {
      let num = this.turnInfo.length;
      this.ctx.font = "24px Arial";
      let arc = Math.PI / (num / 2);
      for (let i = 0; i < num; i++) {
        let angle = 0 + i * arc;

        this.ctx.save();
        //奖品默认字体颜色
        // this.ctx.fillStyle = "#fff";
        let text = this.turnInfo[i].content;
        this.ctx.translate(
          this.width + Math.cos(angle + arc / 2) * (this.width - 40),
          this.width + Math.sin(angle + arc / 2) * (this.width - 40)
        );
        // this.ctx.translate(this.width - 2, this.width - 2);
        // this.ctx.moveTo(0, 0);
        this.ctx.rotate(angle + arc / 2 + Math.PI / 2);
        // this.ctx.rotate((360 / num) * (i + 1) * (Math.PI / 180 / num));
        //由于设计的转盘色块是交错的，所以这样可以实现相邻奖品区域字体颜色不同
        // if (i % 2 == 0) {
        //   this.ctx.fillStyle = "#fff";
        // }
        //将字体绘制在对应坐标
        this.ctx.fillText(text, -this.ctx.measureText(text).width / 2, 20);
        //设置字体
        // this.ctx.font = " 14px Microsoft YaHei";
        //绘制奖品名称
        // if (text != "优胜奖") {
        //   ctx.fillText(lukyname, -ctx.measureText(lukyname).width / 2, 25);
        // } else {
        //   ctx.fillText("优麦币", -ctx.measureText("优麦币").width / 2, 25);
        // }
        // this.ctx.fill();
        //把当前画布返回（插入）到上一个save()状态之前
        this.ctx.restore();
        //绘制奖品图片
        if (this.turnInfo[i].img) {
          let img = new Image();
          img.src = this.turnInfo[i].img;
          img.onload = () => {
            this.ctx.save();
            this.ctx.translate(
              this.width + Math.cos(angle + arc / 2) * this.width,
              this.width + Math.sin(angle + arc / 2) * this.width
            );
            this.ctx.rotate(angle + arc / 2);

            this.ctx.drawImage(img, -this.width / 2 + 10, -50, 42, 94);
            this.ctx.restore();
          };
        }
      }
    },
    drawTurnBox() {
      // let turnplate = this.turnplate;
      let num = this.turnInfo.length;
      //根据奖品个数计算圆周角度
      // let arc = Math.PI / (this.turnInfo.length / 2);
      this.ctx.font = "bold 18px Microsoft YaHei";
      for (let i = 0; i < num; i++) {
        //根据当前奖品索引 计算绘制的扇形开始弧度
        // let angle = this.turnplate.startAngle + i * arc;
        //根据奖品参数 绘制扇形填充颜色
        // ctx.fillStyle = turnplate.colors[i];
        //开始绘制扇形
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(this.width, this.width);
        // // 从(0, 0)坐标开始定义一条新的子路径
        this.ctx.moveTo(0, 0);
        this.ctx.rotate(((360 / num) * (i + 1) * Math.PI) / 180);
        //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
        this.ctx.arc(0, 0, this.width, 0, (2 * Math.PI) / num, false);
        this.ctx.arc(0, 0, this.width / 2 - 50, (2 * Math.PI) / num, 0, true);
        if ((i + 1) % 2 == 0) {
          this.ctx.fillStyle = "#ffb820";
        } else {
          this.ctx.fillStyle = "#ffcb3f";
        }
        // this.ctx.lineWidth = 0.5;
        this.ctx.strokeStyle = "transparent";
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.restore();
      }
    },
    drawCenter() {
      const canvas = document.getElementById("centerChart");
      canvas.style.top = `${63}px`;
      let ctx = null;
      if (canvas && canvas.getContext) {
        ctx = canvas.getContext("2d");
      }
      let arc = Math.PI / (this.turnInfo.length / 2);
      canvas.width = this.width;
      canvas.height = this.height;
      canvas.style.height = `${this.height / 2}px`;
      canvas.style.width = `${this.width / 2}px`;
      ctx.translate(0.5, 0.5);
      ctx.save();
      ctx.fillStyle = "#ffcb3f";
      ctx.beginPath();
      ctx.translate(this.width / 2, this.width / 2);
      ctx.rotate(arc / this.turnInfo.length + Math.PI / 180);
      ctx.moveTo(0, 40);
      // ctx.lineTo(0, 40);
      ctx.lineTo(this.width / 2, 40);

      // ctx.arc(0, 0, this.width - 2, 0, 2 * Math.PI, false);
      ctx.arc(0, 0, this.width / 2 - 40, 2 * Math.PI, 0, true);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(0,0,0,0.45)";
      ctx.stroke();
      ctx.fill();
      ctx.restore();
    },
    drawCharts() {
      this.drawCenter();

      this.initChart(); // 图表初始化
      this.drawTurnBox(); // 绘制转盘
      this.drawText(); // 绘制文字
    },
    getPrize() {
      let rand = Number(Math.random().toFixed(2));
      let prizeIndex = -1;
      let index = 0;
      while (prizeIndex === -1 && index < this.randList.length) {
        prizeIndex = this.randList[index] >= rand ? index : -1;
        index++;
      }
      return prizeIndex;
    },
  },
};
</script>
<style lang="less" scoped>
.turn-box {
  position: relative;
}
canvas {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 0;
}
#centerChart {
  top: 50px;
}
</style>
