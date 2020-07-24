/**
 * nav event init
 */
$(window).resize(function () {
    if (!window.matchMedia('(max-width: 600px)').matches) {
        $('.nav-menu-btn').siblings('.nav-item-group').first().css('display', 'flex');
    }
});

$('.nav-menu-btn').click(function (e) {

    if (!window.matchMedia('(max-width: 600px)').matches) {
        return;
    }

    let itemGroup = $(this).siblings('.nav-item-group').first();
    itemGroup.slideToggle();

});

/**
 * dropdow event init
 */

$('.drop-btn').click(function (e) {
    let dropList = $(this).siblings('.drop-list').first();
    dropList.slideToggle();
});

if ($('.nav-fixed').length > 0) {
    $('.nav-fixed').each(function (index, el) {
        let h = $(el).css('height');
        let w = $(el).css('width');
        let keep = `<div style="width:${w};height:${h};"></div>`;
        $(keep).insertBefore(el); //填充fixed原本的位置
    });
}