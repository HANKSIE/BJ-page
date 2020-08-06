import $ from "jquery";
import CLASSNAME from "../constant/css/className";

const { POP_WINDOW } = CLASSNAME;

class PopWindow {
  static createDefaultConfig() {
    //回傳預設值
    return {
      btnID: "",
      popID: "",
      delay: 300,
    };
  }

  static register(config) {
    config = Object.assign(PopWindow.createDefaultConfig(), config);

    const { btnID, popID, delay } = config;

    let btn = $(`#${btnID}`);
    let pop = $(`#${popID}`);

    let close = pop.find(`.${POP_WINDOW.CLOSE_BTN}`).first();

    close.click(() => {
      pop.fadeOut(delay);
    });
    btn.click(() => {
      if (pop.css("display") == "none") {
        pop.fadeIn(delay);
      } else {
        pop.fadeOut(delay);
      }
    });
  }
}

export default PopWindow;
