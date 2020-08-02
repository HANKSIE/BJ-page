import $ from "jquery";
import "../css/index.css";
// import "../scss/index.scss";


/**
 * nav event init
 */
$(window).resize(function () {
    if (!window.matchMedia('(max-width: 600px)').matches) {
        $('.nav-menu-btn').siblings('.nav-item-group').first().css('display', 'flex');
    } else {
        $('.nav-menu-btn').siblings('.nav-item-group').first().css('display', 'none');
    }
});

$('.nav-menu-btn').click(function (e) {
    let itemGroup = $(this).siblings('.nav-item-group');
    itemGroup.slideToggle();
});

/**
 * dropdow event init
 */

$('.drop-btn').click(function (e) {
    let dropList = $(this).siblings('.drop-list');
    dropList.slideToggle();
});

$('.nav-fixed').each(function (index, el) {
    let h = $(this).css('height');
    let w = $(this).css('width');
    let keep = `<div style="width:${w};height:${h};"></div>`;
    $(keep).insertBefore(el); //填充fixed原本的位置
});

//toast
class Toast {

    static NORMAL = 0;

    static SUCCESS = 1;

    static FAIL = 2;

    static WARN = 3;

    static viewHandle = {
        enable() {
            $(document.body).css('pointer-events', 'initial');
        },

        disable() {
            $(document.body).css('pointer-events', 'none');
        }
    }

    static confirm(config, okHandle = function () { }, cancelHandle = function () { }) {
        config = Object.assign(Toast.createConfirmDefaultConfig(), config);

        let ref = $(`<div class="toast confirm"><div class='confirm-msg'>${config.message}</div></div>`);

        let cancel = $(`<div class="confirm-cancel-btn">${config.cancel}</div>`);
        cancel.click(function () {

            cancel.unbind('click'); //解除綁定事件

            ref.fadeOut(300, () => {
                ref.remove();
            });

            Toast.viewHandle.enable();
            cancelHandle();
        });

        let ok = $(`<div class="confirm-ok-btn">${config.ok}</div>`);
        ok.click(function () {

            ok.unbind('click'); //解除綁定事件

            ref.fadeOut(300, () => {
                ref.remove();

            });

            Toast.viewHandle.enable();
            okHandle();

        });

        let btnGroup = $('<div class="confirm-btn-group"></div>').append(ok, cancel)

        ref.append(btnGroup);
        //右上角關閉按鈕
        let close = $('<div class="confirm-close-btn"><i class="fas fa-times"></i></div>');
        close.click(function () {
            ref.fadeOut(500, () => {
                ref.remove();
                Toast.viewHandle.enable();
            });
        });
        ref.append(close);

        //隱藏後淡入
        ref.hide();
        ref.fadeIn('slow');

        Toast.viewHandle.disable();
        config.parent.append(ref);
    }

    static createConfirmDefaultConfig() { //回傳預設值
        return {
            message: '',
            ok: '確定',
            cancel: '取消',
            parent: $('#confirm-panel')
        };
    }

    static createDefaultConfig() { //回傳預設值
        return {
            message: '',
            type: Toast.NORMAL,
            delay: 3000,
            close: false,
        }
    }

    static create(config) {

        config = Object.assign(Toast.createDefaultConfig(), config);

        //創造基礎toast
        let ref = $(`<div class="toast"><div class='toast-msg'>${config.message}</div></div>`);
        //依照類型塞入class
        switch (config.type) {
            case Toast.NORMAL:
                ref.addClass('toast-normal');
                break;
            case Toast.SUCCESS:
                ref.addClass('toast-success');
                ref.append('<i class="fas fa-check-circle toast-icon"></i>');
                break;
            case Toast.FAIL:
                ref.addClass('toast-fail');
                ref.append('<i class="fas fa-times-circle toast-icon"></i>');
                break;
            case Toast.WARN:
                ref.addClass('toast-warn');
                ref.append('<i class="fas fa-exclamation-triangle toast-icon"></i>');
                break;
            default:
                ref.addClass('toast-normal');
                break;
        }

        if (config.close == true) {
            //加入關閉按鈕
            let close = $('<div class="toast-close-btn"><i class="fas fa-times"></i></div>');
            close.click(function () {
                Toast.fadeOut(ref, 0);
            });
            ref.append(close);
        } else {
            Toast.fadeOut(ref, config.delay);
        }

        //隱藏後淡入
        ref.hide();
        ref.fadeIn('slow');

        return ref;
    }

    static fadeOut(ref, delay) {

        setTimeout(() => { //delay毫秒後才開始動畫
            ref.animate({ opacity: 0 }, 800)
                .slideUp(500, () => {
                    ref.remove();
                });
        }, delay)
    }

}

//demo
function launchToast() {
    Toast.confirm({
        message: 'Confirm Message',
        ok: '確定',
        cancel: '取消',
    }, function () {
        console.log('ok');
    }, function () {
        console.log('cancel');
    });

    $('#toast-panel').append(Toast.create({
        message:
            "\
            Toast說明: Toast類型有Toast.NORMAL\
            Toast.SUCCESS, Toast.WARN, Toast.FAIL,\
            要創建一個新的Toast使用Toast.create(config),\
            並將Toast.create()回傳的DOM插入欲顯示toast之dom\
            ex:(div class=\"toast-panel\")\
            config類型為object，屬性介紹:\
            message:text=>文字內容,\
            type:int=>Toast.[類型], \
            delay:int => delay毫秒後執行消失動畫\
            close:boolean=>是否有關閉功能，若有則toast需按下關閉才執行消失動畫,\
            ",
        type: Toast.WARN,
        close: true
    }));
    setTimeout(function () {
        $('#toast-panel').append(Toast.create({ message: 'Normal Toast, it will not be disappear automatically. If you want to close it, please click \'X\'. ', type: Toast.NORMAL, close: true }));
    }, 1000)
    setTimeout(function () {
        $('#toast-panel').append(Toast.create({ message: 'Success', type: Toast.SUCCESS }));
    }, 2000);
    setTimeout(function () {
        $('#toast-panel').append(Toast.create({ message: 'Warn', type: Toast.WARN }));
    }, 3000);
    setTimeout(function () {
        $('#toast-panel').append(Toast.create({ message: 'Fail', type: Toast.FAIL }));
    }, 4000);
}

launchToast();
//pop window
class PopWindow {

    static ANIMATE = Object.freeze({
        FADE: 1,
        ZOOM: 2,
    });

    static createDefaultConfig() { //回傳預設值
        return {
            btnID: '',
            popID: '',
            animate: PopWindow.ANIMATE.FADE,
            delay: 300
        };
    }

    static register(config) {

        config = Object.assign(PopWindow.createDefaultConfig(), config);

        let btn = $(`#${config.btnID}`);
        let pop = $(`#${config.popID}`);

        let close = pop.find('.pop-window-close-btn').first();

        let animate = PopWindow.createAnimate(config.animate, pop);
        ;
        close.click(() => {
            animate.out(config.delay);
        });
        btn.click(() => {
            if (pop.css('display') == 'none') {
                animate.in(config.delay);
            } else {
                animate.out(config.delay);
            }
        });
    }

    static createAnimate(animate, pop) {
        switch (animate) {
            case PopWindow.ANIMATE.FADE:
                return {
                    in: function (delay) {
                        pop.fadeIn(delay);
                    },
                    out: function (delay) {
                        pop.fadeOut(delay);
                    }
                };
            case PopWindow.ANIMATE.ZOOM:
                let origin = pop.css(['height', 'padding']);
                return {
                    in: function (delay) {
                        pop.show();
                        pop.css({ 'height': 0, 'padding': 0 });
                        pop.animate(origin, delay);
                    },
                    out: function (delay) {
                        pop.animate({ height: 0, padding: 0 }, delay, function () {
                            pop.hide();
                        });
                    }
                };
            default:
                return {
                    in: function (delay) {
                        pop.fadeIn(delay);
                    },
                    out: function (delay) {
                        pop.fadeOut(delay);
                    }
                };
        }
    }
}

PopWindow.register({
    btnID: 'alter-pwd-btn',
    popID: 'alter-pop',
});


