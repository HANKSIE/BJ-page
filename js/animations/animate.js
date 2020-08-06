export default {
  slideUpRemove: (ref, delay = 1000, next = () => {}) => {
    setTimeout(() => {
      //delay毫秒後才開始動畫
      ref.animate({ opacity: 0 }, 800).slideUp(500, () => {
        ref.remove();
        next();
      });
    }, delay);
  },
};
