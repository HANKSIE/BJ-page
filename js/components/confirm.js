import $ from "jquery";
import CLASSNAME from "../constant/css/className";
import ID from "../constant/css/id";

const { CONFIRM_LOCK, CONFIRM_PANEL, CONFIRM_OVERLAY } = ID;
const { OVERLAY, CONFIRM, LOCK } = CLASSNAME;

const unlock = () => {
  $(`#${CONFIRM_LOCK}`).removeClass(LOCK);
  $(`#${CONFIRM_OVERLAY}`).removeClass(OVERLAY);
};

const lock = () => {
  $(`#${CONFIRM_LOCK}`).addClass(LOCK);
  $(`#${CONFIRM_OVERLAY}`).addClass(OVERLAY);
};

class Confirm {
  static get defaultConfig() {
    //回傳預設值
    return {
      message: "",
      ok: "確定",
      cancel: "取消",
    };
  }

  static launch(
    config,
    okHandle = function () {},
    cancelHandle = function () {}
  ) {
    config = Object.assign(Confirm.defaultConfig, config);

    let ref = $(
      `<div class="${CONFIRM.CONFIRM}"><div class="${CONFIRM.MESSAGE}">${config.message}</div></div>`
    );

    let cancel = $(`<div class="${CONFIRM.CANCEL_BTN}">${config.cancel}</div>`);
    cancel.click(function () {
      cancel.unbind("click"); //解除綁定事件
      ref.fadeOut(300, () => {
        ref.remove();
        unlock();
      });
      cancelHandle();
    });

    let ok = $(`<div class="${CONFIRM.OK_BTN}">${config.ok}</div>`);
    ok.click(function () {
      ok.unbind("click"); //解除綁定事件

      ref.fadeOut(300, () => {
        ref.remove();
        unlock();
      });

      okHandle();
    });

    let btnGroup = $(`<div class="${CONFIRM.BTN_GROUP}"></div>`).append(
      ok,
      cancel
    );

    ref.append(btnGroup);
    //右上角關閉按鈕
    let close = $(
      `<div class="${CONFIRM.CLOSE_BTN}"><i class="fas fa-times"></i></div>`
    );
    close.click(function () {
      slideUpRemove(ref, 500);
      unlock();
    });
    ref.append(close);

    //隱藏後淡入
    ref.hide();
    ref.fadeIn("slow");

    lock();

    //沒有confirm-panel
    if ($(`#${CONFIRM_PANEL}`).length < 1) {
      //新增confirm-panel
      $(document.body).append(`<div id="${CONFIRM_PANEL}"></div>`);
    }

    $(`#${CONFIRM_PANEL}`).append(ref);
  }
}

export default Confirm;
