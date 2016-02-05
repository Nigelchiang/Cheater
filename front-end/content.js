/**
 * Created by Nigel on 2016/2/3.
 */
//! 插入页面的元素的id和class命名要特殊一点，不然会和原来的page冲突
$("body").append($("<div id='jh-wrap'><div class='jh-icon'></div></div>"));

var selection = '';
$(document).mouseup(function (e) {
    $(".jh-bubble").remove();

    selection = window.getSelection().toString();
    if (selection) {
        //$("#xy").html("x: " + e.clientX + " | y: " + e.clientY + "<br\>" + selection);
        //! css的绝对定位left、top都是相对于整个文档的，而不是当前的窗口
        $("#jh-wrap")
            .show()
            .css({"left": e.pageX + 5, "top": e.pageY - 20})
            .mouseup(function (e) {
                $(this).hide();
                $("<div class='jh-bubble'></div>")
                    .appendTo($("body"))
                    .css({"left": e.pageX + 10, "top": e.pageY + 10})
                    .load("http://5.nigel.top/search.php", {q: selection})
                    .mouseup((e)=> {
                        e.stopPropagation();
                    });
                //! 给同一个元素同时注册事件冒泡和事件捕获，捕获的函数先执行。同时注册的多个捕获事件，先注册的先执行。
                e.stopPropagation();
            });

    } else {
        $("#jh-wrap").hide();
    }
});

