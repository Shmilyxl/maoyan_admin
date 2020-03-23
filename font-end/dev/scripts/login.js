class Login {
    render() {
        $('#loginbtn').on('click', this.handleSubmit.bind(this))
    }
    async handleSubmit() {
        let data = $('#form-horizontal').serialize()
        console.log(data);
        let result = await httpModel.get({
            //this.type 存储了用户点了"登录"或”注册“按钮
            url: '/api/users/singin',
            data,
        })
        this.handleSubmitSucc(result)
        location.hash = 'index'
    }
    handleSubmitSucc(result) {
        console.log(0);
        /*  if (result.ret) {
             let html = navView({
                 isSignin: true
             })
             $('#nav').html(html)
         } else {
             alert(result.data.message)
         } */
    }

}
new Login();