$(function () {
    const link_reg = $('#link_reg');
    const link_login = $('#link_login');
    const login_box = $('.login-box');
    const reg_box = $('.reg-box');

    // 点击按列切换盒子
    link_reg.on('click', () => {
        login_box.hide();
        reg_box.show();
    })

    link_login.on('click', () => {
        reg_box.hide();
        login_box.show();
    })

    // 自定义验证规则
    //从layui获取form对象
    const form = layui.form;
    const layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码是否一致
        repwd: function (value) {
            const pwdvalue = $('.reg-box [name=password]').val();
            if (value !== pwdvalue) {
                return '两次密码不一致';
            }
        }
    });


    // 监听注册表单的提交
    $('#form-reg').on('submit', (e) => {
        e.preventDefault();
        let data = { username: $('#form-reg [name=username]').val(), password: $('#form-reg [name=password]').val() };
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            link_login.click();
        });
    })

    // 监听登录的提交
    $('#form-login').submit(function (e) {
        e.preventDefault();

        $.ajax({
            url: "/api/login", method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(), success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("登录失败");
                    layer.msg("登陆成功");
                    location.href = "/index.html"
                }
            }
        })
    })
})


