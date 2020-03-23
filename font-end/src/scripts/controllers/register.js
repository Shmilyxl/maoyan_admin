import registerView from '../views/register.art'
import httpModel from '../../models/http'

export const list = (req, res) => {
    res.render(registerView())
    $('#btn-submit').on('click', function() {
        console.log(123);
    })

    new Register();
}
class Register {
    constructor() {
        this.render()
    }
    render() {
        //提交
        $('#btn-submit').on('click', this.handleSubmit.bind(this))

    }
    async handleSubmit() {
        let data = $('#form-horizontal').serialize()
        console.log(data);
        let result = await httpModel.get({
            //this.type 存储了用户点了"登录"或”注册“按钮
            url: '/api/users/registerin',
            data,
            type: 'POST'
        })
        if (/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test($('#email').val())) {
            this.handleSubmitSucc(result)
            location.hash = 'login'
        } else {
            alert('邮箱不对')
        }
    }
    handleSubmitSucc(result) {
        if (result.ret) {
            alert('注册成功')
        } else {
            alert(result.data.message)
        }
    }
}
export default new Register();