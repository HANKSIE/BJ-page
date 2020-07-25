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

//修改密碼按鈕切換修改密碼表單顯示/隱藏
$('#alter-pwd-btn').click(function () {
    $('#alter-form').fadeToggle('slow');
});

$('#close').click(function () {
    $('#alter-form').fadeOut('slow');
});

//toast

class Toast {

    static NORMAL = 0;

    static SUCCESS = 1;

    static FAIL = 2;

    static WARN = 3;

    static createDefaultConfig() { //回傳預設值
        return {
            message: '',
            type: Toast.NORMAL,
            delay: 1500,
            close: false,
        }
    }

    //如果type是Toast.KEEP, delay不生效
    static create(setting) {

        setting = Object.assign(Toast.createDefaultConfig(), setting);

        //創造基礎toast
        let ref = $(`<div class="toast"><div class='toast-msg'>${setting.message}</div></div>`);
        //依照類型塞入class
        switch (setting.type) {
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

        if (setting.type == Toast.KEEP || setting.close == true) {
            //加入關閉按鈕
            let close = $('<div class="toast-close-btn"><i class="fas fa-times"></i></div>');
            close.click(function () {
                Toast.fadeOut(ref, 0);
            });
            ref.append(close);
        } else {
            Toast.fadeOut(ref, setting.delay);
        }

        return ref;
    }

    static fadeOut(ref, delay) {

        setTimeout(() => { //delay毫秒後才開始動畫
            ref.animate({ opacity: 0 }, 800); //(delay + 1000)毫秒後變透明
            setTimeout(() => { //(delay + 800)毫秒後高度縮小
                let minify = 500;
                ref.animate({ height: 0, padding: 0, margin: 0 }, minify);
                setTimeout(() => {
                    ref.remove();
                }, minify + 500); //延遲消除dom
            }, 600);
        }, delay)
    }

}

//demo
function launchToast() {
    $('#toast-panel').append(Toast.create({
        message:
            "\
            Toast說明: Toast類型有Toast.NORMAL\
            Toast.SUCCESS, Toast.WARN, Toast.FAIL,\
            要創建一個新的Toast使用Toast.create(setting),\
            並將Toast.create()回傳的DOM插入欲顯示toast之dom\
            ex:(div class=\"toast-panel\")\
            setting類型為object，屬性介紹:\
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



