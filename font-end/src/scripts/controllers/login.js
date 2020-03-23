import loginView from '../views/login.art'
import httpModel from '../../models/http'

export const list = (req, res) => {
    res.render(loginView())
    new Login()
}
class Login {
    constructor() {
        this.render()

    }
    async render() {
        $('#loginbtn').on('click', this.handleSubmit.bind(this))
    }
    async handleSubmit() {
        let data = $('#form-horizontal').serialize()
        console.log(data);
        let result = await httpModel.get({
            //this.type 存储了用户点了"登录"或”注册“按钮
            url: '/api/users/singin',
            data,
            type: 'POST'
        })
        this.handleSubmitSucc(result)
        location.hash = 'index'
        location.reload()
    }

    handleSubmitSucc(result) {
        console.log(0);
        if (result.ret) {
            console.log(result.ret);
        } else {
            alert(result.data.message)
        }
    }

}
export default new Login();