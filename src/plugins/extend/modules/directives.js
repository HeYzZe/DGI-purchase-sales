import Vue from 'vue';

// 边界拖拽 - 在 el-row 上添加 v-resize 属性即可
const resize = {
  bind(el) {
    // 配置参数定义
    const config = {
      minWidth: 0.1,              // 最小保留宽度
      dragClass: 'boundary-drag', // 中间间隔样式
      pressClass: 'is-extend',    // 按下扩大区域样式
    };

    // 获取元素宽度
    const getWidth = elem => parseInt(window.getComputedStyle(elem).getPropertyValue('width'), 10);
    // 循环给列绑定事件
    for (let i = 0; i < el.children.length; i++) {
      if (i !== el.children.length - 1) {
        let isResizing = false;
        let lastDownX = 0;
        const elL = el.children[i];
        const elR = el.children[i + 1];
        elL.classList.add(config.dragClass);
        elL.appendChild(document.createElement('span'));
        // 鼠标按下
        elL.lastChild.onmousedown = (e) => {
          isResizing = true;
          lastDownX = e.clientX;
          // 扩大可控制范围
          elL.classList.add(config.pressClass);
          const rowWidth = getWidth(el);
          const colLiftWidth = getWidth(elL);
          const colRightWidth = getWidth(elR);
          let timeoutd = '';
          // 鼠标移动
          elL.onmousemove = (e) => {
            if (!isResizing || e.buttons === 0) return;
            if (timeoutd) { clearTimeout(timeoutd); }
            timeoutd = setTimeout(() => {
              const offset = e.clientX - lastDownX;
              const colL = (colLiftWidth + offset) / rowWidth;
              const colR = (colRightWidth - offset) / rowWidth;
              // 偏移量
              if (colL >= config.minWidth && colR >= config.minWidth) {
                elL.style.width = `${colL * 100}%`;
                elR.style.width = `${colR * 100}%`;
              }
            }, 15);
          };
          // 鼠标弹起
          document.getElementsByTagName('body')[0].onmouseup = () => {
            elL.classList.remove(config.pressClass);
            elL.onmousemove = null;
            isResizing = false;
          };
        };
      }
    }
  },
};

// 自定义指令
const directives = {
  resize,
};

Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key]);
});
