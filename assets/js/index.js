$(function() {

    // 调用getUserInfo获取用户基本信息
    getUserInfo()

    $("#btnLoginOut").on('click', function() {
        //提示用户是否确认退出
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' },
            function(index) {
                // 1.清空本地存储中的token
                localStorage.removeItem('token');
                //2.重新跳转到登录页
                location.href = "/login.html"

                // 关闭confirm询问框
                layer.close(index)
            })
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败！');
            }

            //调用renderAvatar渲染用户的头像
            renderAvatar(res.data)
        }

    })
}

// 渲染用户的头像
function renderAvatar(users) {


    // 获取用户的名称
    var name = users.nickname || users.username
        // 设置欢迎的文本
    $("#welcome").html('欢迎&nbsp;' + name);

    // 按需渲染用户的头像
    if (users.user_pic !== null) {
        // 渲染图像头像
        $(".layui-nav-img").attr('src', users.user_pic).show()
        $(".text-avatar").hide()
    } else {
        // 渲染文本头像
        $(".layui-nav-img").hide()
        var first = name[0].toUpperCase()
        $(".text-avatar").html(first).show()
    }


}