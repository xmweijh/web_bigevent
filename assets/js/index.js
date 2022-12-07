$(function () {
    getUserInfo();

    $('#btnLogout').on('click', function () {
        // 确认是否退出
        const layer = layui.layer;
        layer.confirm('确认退出登录?', { icon: 3, title: '提示' },
            // 确定后的回调
            function (index) {
                //do something
                //清空token
                localStorage.removeItem('token');
                //重新定位到登陆界面
                location.href = './login.html'

                // 关闭confirm弹出框
                layer.close(index);
            });
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers是请求头对象s
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败!')
            }
            // 使用renderAvatar渲染用户头像
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username
    // 渲染欢迎用户名
    $('#welcome').html("欢迎&nbsp&nbsp" + name)

    // 渲染头像
    if (user.user_pic) {
        $('.text-avatar').hide()
        $('.layui-nav-img').attr('src', user.user_pic).show()
    } else {
        $('.layui-nav-img').hide()
        $('.text-avatar').html(name[0].toUpperCase()).show()
    }
}