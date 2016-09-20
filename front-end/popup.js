/**
 * Created by Nigel on 2016/2/1.
 */
//
$(()=> {
    $("#file").change(()=> {
        $("button:submit").removeClass("btn-danger").addClass("btn-primary").html("<span class='glyphicon" +
                                                                                  " glyphicon-send'></span> 上传");
    });

    $('form').submit(() => {
        var checkFiles = ()=> {
            var files = $("#file")[0].files;

            var flag = 0;
            if (files.length !== 0) {
                for (var i = 0; i < files.length; ++i) {
                    var elem = files[i];
                    if (elem.name.search(/\w+\.(json|html?)$/i) !== -1) {
                        if (!(elem.size / 1024 < 2500)) {
                            alert("文件过大");
                            return false;
                        } else {
                            ++flag;
                        }
                    } else {
                        alert("不支持该文件类型");
                    }
                }

                if (flag == files.length) {
                    return true;
                }
            }

            return false;
        };

        if (checkFiles()) {

            $("button:submit").html("<span class='glyphicon glyphicon-cloud-upload'></span> 上传中...");

            $.ajax({
                type: 'POST',
                url: 'http://5.nigel.top/upload.php',
                //! FormData对象要用form初始化！！
                data: new FormData($("form")[0]),
                processData: false,
                contentType: false,
                cache: false,
                dataType: "json",
                complete: (data, status) => {
                    console.log(data);
                    console.log(status);
                }
            }).done((data) => {
                if (data.every((elem)=> {
                        return !elem.error;
                    })) {
                    $("button:submit").removeClass("btn-primary").addClass("btn-success")
                        .html("<span class='glyphicon glyphicon-ok'></span> 上传成功");
                } else {
                    $("button:submit").removeClass("btn-primary").addClass("btn-danger")
                        .html("<span class='glyphicon glyphicon-remove'></span> 上传失败");
                }
            }).fail(()=> {
                $("button:submit").removeClass("btn-primary").addClass("btn-danger")
                    .html("<span class='glyphicon glyphicon-remove'></span> 上传失败");
            });
        }


        return false;
    });
});

