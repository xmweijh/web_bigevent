// 每次juuery发送请求前会调用该函数
$.ajaxPrefilter(function (options) {
    // console.log(options.url)
    reg = /^\/my\//
    if (reg.test(options.url)) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        } // 不论成功还是失败，最终都会调用 complete 回调函数
        options.complete = function (res) {
            // console.log('执行了 complete 回调：')
            // console.log(res)
            // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 1. 强制清空 token
                localStorage.removeItem('token')
                // 2. 强制跳转到登录页面
                location.href = '/login.html'
            }
        }
    }

    // 发起真正的请求前拼接url
    options.url = 'http://www.liulongbin.top:3007' + options.url;

    // 统一为有权限的接口，设置 headers 请求头
    // if (options.url.indexOf('/my/') !== -1) {
    //     options.headers = {
    //         Authorization: localStorage.getItem('token') || ''
    //     }
    // }
})