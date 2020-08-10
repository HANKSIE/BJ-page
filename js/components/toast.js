import $ from "jquery";
import { TOAST } from "../constant/css/className";
import { TOAST_PANEL } from "../constant/css/id";
import { slideUpRemove } from "../animations/animate";

class Toast {
  static get NORMAL() {
    return 0;
  }

  static get SUCCESS() {
    return 1;
  }

  static get ERROR() {
    return 2;
  }

  static get WARN() {
    return 3;
  }

  static get defaultConfig() {
    //回傳預設值
    return {
      message: "",
      type: Toast.NORMAL,
      delay: 3000,
      close: false,
    };
  }

  static launch(config) {
    const { type, delay, message, close } = Object.assign(
      Toast.defaultConfig,
      config
    );

    //創造基礎toast
    let ref = $(
      `<div class="${TOAST.TOAST}"><div class="${TOAST.MESSAGE}">${message}</div></div>`
    );


    //依照類型塞入class
    switch (type) {
      case Toast.SUCCESS:
        ref.addClass(TOAST.SUCCESS);
        ref.prepend($(`<i class="fas fa-check-circle"></i>`));
        break;
      case Toast.ERROR:
        ref.addClass(TOAST.ERROR);
        ref.prepend($(`<i class="fas fa-times-circle"></i>`));
        break;
      case Toast.WARN:
        ref.addClass(TOAST.WARN);
        ref.prepend($(`<i class="fas fa-exclamation-triangle"></i>`));
        break;
    }

    if (close) {
      //加入關閉按鈕
      let close = $(
        `<div class="${TOAST.CLOSE_BTN}"><i class="fas fa-times"></i></div>`
      );
      close.click(() => {
        slideUpRemove(ref, 0);
      });
      ref.append(close);
    } else {
      slideUpRemove(ref, delay);
    }

    //沒有toast-panel
    if ($(`#${TOAST_PANEL}`).length < 1) {
      //新增toast-panel
      $(document.body).append(`<div id="${TOAST_PANEL}"></div>`);
    }

    $(`#${TOAST_PANEL}`).append(ref);

    //隱藏後淡入
    ref.hide();
    ref.fadeIn("slow");
  }
}

export default Toast;
