 import SEMRouter from 'sme-router'

 import { home } from '../controllers/home'
 import * as position from '../controllers/position'
 import * as register from '../controllers/register'
 import * as login from '../controllers/login'
 import * as message from '../controllers/message'

 import titleView from '../views/title.art'

 const router = new SEMRouter('page-wrapper')


 router.use((req) => {
     let url = req.url.slice(1).split('_')[0]
     console.log(url);
     //面包屑导航
     //  let BreadcrumbMap = {
     //      'home': {
     //          levle1: '管理系统',
     //          level2: '首页'
     //      },
     //      'position': {
     //          levle1: '管理系统',
     //          level2: '电影管理'
     //      }
     //  }
     //  let TitleMap = {
     //      'home': {
     //          title: '首页',
     //          subtitle: '欢迎您'
     //      },
     //      'position': {
     //          title: "电影管理",
     //          subtitle: '职位管理'
     //      }
     //  }

     //  let info = {
     //      Breadcrumb: {
     //          levle1: BreadcrumbMap[url].levle1,
     //          level2: BreadcrumbMap[url].level2
     //      },
     //      Title: {
     //          title: TitleMap[url].title,
     //          subtitle: TitleMap[url].subtitle
     //      }
     //  }
     //  let html = titleView({
     //      title: info.Title,
     //      Breadcrumb: info.Breadcrumb
     //  })
     //  $('#l-heading').html(html)
 })

 window.router = router

 router.route('/home', home)
 router.route('/position', position.list)
 router.route('/register', register.list)
 router.route('/login', login.list)
 router.route('/position_update', position.update)
 router.route('/position_add', position.add)
 router.route('/position_list/:page', position.list)
 router.route('/message', message.msg)


 router.route('*', (req, res, next) => {
     res.redirect('/home')
 })
 export default router