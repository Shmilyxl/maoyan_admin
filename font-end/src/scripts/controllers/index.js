import layoutView from '../views/layout.art'
import httpModel from '../../models/http'
class Layout {
    constructor() {
        this.render();
    }
    async render() {
        let that = this
        this.username = ''
        let html = layoutView()
        $('#wrapper').html(html)
        await this.auth()
        let result = await httpModel.get({ url: '/api/users/isSignin' })
        console.log(result.data.username);
        if (result.data.username) {
            $('#login-succ').html(`欢迎你，${result.data.username}`)
            $('#login-succ').append(` <div class="btn btn-danger" id="loginout" title="Logout">注销</div>`)
        } else {
            $('#login-succ').html('未登录')
        }
        //注销
        $('#loginout').on('click', async() => {
            let result = await httpModel.get({
                url: 'api/users/signout'
            })
            location.reload()
            console.log(result.ret);
            if (result.ret) {}

        })
    }
    async auth() {
        let result = await httpModel.get({
            url: '/api/users/isSignin'
        })
        let username = result.data.username
        this.isSingin = username ? true : false
        this.usernname = username
    }
}

export default new Layout()