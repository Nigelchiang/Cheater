/**
 * Created by Nigel on 2016/2/3.
 */

$("body").append($("<div id='c-wrap'><div class='c-icon'></div></div><div class='c-bubble'></div>"));

//记得配置这个地址
let queryUrl = 'http://127.0.0.1:5000/q'

let selection = ''
//点击图标时这个回调先于图标的回调执行，会将selection设为空
$(document).mouseup((e) => {
    $(".c-bubble").hide()

    if ('' === window.getSelection().toString()) {
        $("#c-wrap").hide()
        return false
    }

    selection = window.getSelection().toString()

    //$("#xy").html("x: " + e.clientX + " | y: " + e.clientY + "<br\>" + selection);
    //! css的绝对定位left、top都是相对于整个文档的，而不是当前的窗口
    $("#c-wrap")
        .show()
        .css({
            "left": e.pageX + 5,
            "top": e.pageY - 20
        })
        .click((e) => {
            $(this).hide()

            $.get(queryUrl,
                {q: selection},
                (data, status) => {
                    "use strict";

                    $('.c-bubble')
                        .show()
                        .text(data)
                        .css({
                            "left": e.pageX + 10,
                            "top": e.pageY + 10
                        })
                        .click((e) => {
                            e.stopPropagation()
                        })
                })
            //! 给同一个元素同时注册事件冒泡和事件捕获，捕获的函数先执行。同时注册的多个捕获事件，先注册的先执行。
            //W3C模型采用折中方案，先由外向内做事件捕获，到达目标元素之后再由内向外进行事件冒泡
            e.stopPropagation()
        })

})

