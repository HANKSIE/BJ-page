import $ from "jquery";
import "../scss/index.scss";
import CLASSNAME from "./constant/css/className";

import Toast from "./components/toast";
import Confirm from "./components/confirm";
import PopWindow from "./components/popWindow";

const { DROPDOWN, NAVBAR } = CLASSNAME;
/**
 * nav event init
 */
$(window).resize(function () {
  if (!window.matchMedia("(max-width: 600px)").matches) {
    $(`.${NAVBAR.MENU_BTN}`)
      .siblings(`.${NAVBAR.ITEM_GROUP}`)
      .first()
      .css("display", "flex");
  } else {
    $(`.${NAVBAR.MENU_BTN}`)
      .siblings(`.${NAVBAR.ITEM_GROUP}`)
      .first()
      .css("display", "none");
  }
});

$(`.${NAVBAR.MENU_BTN}`).click(function () {
  let itemGroup = $(this).siblings(`.${NAVBAR.ITEM_GROUP}`);
  itemGroup.slideToggle();
});

/**
 * dropdow event init
 */

$(`.${DROPDOWN.BTN}`).click(function () {
  let dropList = $(this).siblings(`.${DROPDOWN.LIST}`);
  dropList.slideToggle();
});

$(`.${NAVBAR.NAV_FIXED}`).each(function () {
  let h = $(this).css("height");
  let w = $(this).css("width");
  let keep = `<div style="width:${w};height:${h};"></div>`;
  $(keep).insertBefore($(this)); //填充fixed原本的位置
});

//demo
(function launchToast() {
  Confirm.launch(
    {
      message: "Confirm Message",
      ok: "確定",
      cancel: "取消",
    },
    function () {
      console.log("ok");
    },
    function () {
      console.log("cancel");
    }
  );

  Toast.launch({
    message:
      '\
          Toast說明: Toast類型有\
          Toast.SUCCESS, Toast.WARN, Toast.ERROR,\
          要創建一個新的Toast使用Toast.create(config),\
          並將Toast.create()回傳的DOM插入欲顯示toast之dom\
          ex:(div class="toast-panel")\
          config類型為object，屬性介紹:\
          message:text=>文字內容,\
          type:int=>Toast.[類型], \
          delay:int => delay毫秒後執行消失動畫\
          close:boolean=>是否有關閉功能，若有則toast需按下關閉才執行消失動畫,\
          ',
    type: Toast.WARN,
    close: true,
  });
  setTimeout(function () {
    Toast.launch({
      message:
        "Normal Toast, it will not be disappear automatically. If you want to close it, please click 'X'. ",
      close: true,
    });
  }, 1000);
  setTimeout(function () {
    Toast.launch({ message: "Success", type: Toast.SUCCESS });
  }, 2000);
  setTimeout(function () {
    Toast.launch({ message: "Warn", type: Toast.WARN });
  }, 3000);
  setTimeout(function () {
    Toast.launch({ message: "Error", type: Toast.ERROR });
  }, 4000);
})();

PopWindow.register({
  btnID: "alter-pwd-btn",
  popID: "alter-pop",
});
