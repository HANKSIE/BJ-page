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

    static KEEP = 1;

    static SUCCESS = 2;

    static FAIL = 3;

    //如果type是Toast.KEEP, delay不生效
    static create(message, type = Toast.NORMAL, delay = 2000) {
        let ref = $(`<div class="toast">&nbsp;&nbsp;${message}</div>`);
        switch (type) {
            case Toast.NORMAL:
                ref.addClass('toast-normal');
                break;
            case Toast.KEEP:
                ref.addClass('toast-keep');
                let close = $('<div class="toast-close-btn"><i class="fas fa-times"></i></div>');
                close.click(function () {
                    Toast.fadeOut(ref, 0);
                });
                ref.append(close);

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

        if (type != Toast.KEEP) {
            Toast.fadeOut(ref, delay);
        }

        return ref;
    }

    static fadeOut(ref, delay) {
        setTimeout(() => {
            let interval = setInterval(() => {
                if (ref.css('opacity') > 0) {
                    ref.css('opacity', ref.css('opacity') - 0.1);
                } else {
                    ref.remove();
                    clearInterval(interval);
                }
            }, 50);
        }, delay)
    }

}

//demo
$('#toast-panel').append(Toast.create('一般提示框', Toast.NORMAL));
setTimeout(function () {
    $('#toast-panel').append(Toast.create('成功', Toast.SUCCESS));
}, 1000);
setTimeout(function () {
    $('#toast-panel').append(Toast.create('失敗', Toast.FAIL));
}, 2000);
setTimeout(function () {
    $('#toast-panel').append(Toast.create('我不會消失，除非你按下右上角的X', Toast.KEEP));
}, 3000);
