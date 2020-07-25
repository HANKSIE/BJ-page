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

    static createDefaultConfig() { //回傳預設值
        return {
            message: '',
            type: Toast.NORMAL,
            delay: 1500,
            keep: false,
        }
    }

    //如果type是Toast.KEEP, delay不生效
    static create(setting) {

        setting = Object.assign(Toast.createDefaultConfig(), setting);

        //創造基礎toast
        let ref = $(`<div class="toast">&nbsp;&nbsp;${setting.message}</div>`);
        //依照類型塞入class
        switch (setting.type) {
            case Toast.NORMAL:
                ref.addClass('toast-normal');
                break;
            case Toast.SUCCESS:
                ref.addClass('toast-success');
                break;
            case Toast.FAIL:
                ref.addClass('toast-fail');
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
$('#toast-panel').append(Toast.create({ message: '一般提示框', type: Toast.NORMAL }));
setTimeout(function () {
    $('#toast-panel').append(Toast.create({ message: '成功', type: Toast.SUCCESS }));
}, 1000);
setTimeout(function () {
    $('#toast-panel').append(Toast.create({ message: '不會自動消失的失敗提示', type: Toast.FAIL, close: true }));
}, 2000);
setTimeout(function () {
    $('#toast-panel').append(Toast.create({ message: '我不會自動消失', close: true }));
}, 3000);
