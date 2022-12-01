// 每次juuery发送请求前会调用该函数
$.ajaxPrefilter(function (options) {
    // console.log(options.url)
    // 发起真正的请求前拼接url
    options.url = 'http://www.liulongbin.top:3007' + options.url;
})