import positionView from '../views/position.art'
import http from '../../models/http'
import positionUpdateView from '../views/position.update.art'
import positionAddView from '../views/position.add.art'
import _ from 'lodash'

let count = 3

function _handleAddClick(res) {
    $("#add_btn").on('click', function() {
        res.go('/position_add')
    })
}

function _handleUpdateClick(res, obj) {
    let id = $(obj).attr('data-id')
    res.go('/position_update', { id })
}

function _handlePageNumberClick(req, res, obj, type, pageCount) {
    if (type) {
        let page = ~~req.url.replace('/position_list/', ' ')
        console.log(page);
        if (type === 'prev' && page > 1) {
            res.go('/position_list/' + (page - 1))
        } else if (type === 'next' && page < pageCount.length) {

            res.go('/position_list/' + (page + 1))
        }
    } else {
        res.go('/position_list/' + ~~$(obj).text())
    }
}

async function _handledeleteClick(req, res, obj) {
    let id = $(obj).attr('data-id')
    let tempmovieslogo = $(obj).attr('data-img')
    console.log(tempmovieslogo);

    let result = await http.update({
        url: '/api/position',
        type: 'delete',
        data: { id, tempmovieslogo }
    })
    console.log(result.ret);

    if (result.ret) {
        res.go('/position_list/' + (req.params.page) + '?r=' + (new Date().getTime()))
    }
}

async function _handleSubmit() {
    let data = $('#form_add').serialize()
    console.log(data);

    let result = await http.get({
        url: '/api/position',
        data,
        type: "POST"
    })
    if (result.ret) {
        $('#form_add')[0].reset()
    } else {
        alert(result.data.message)
    }
}
async function _handleSearch(res, keywords) {
    if (keywords === '') {
        res.go('/position_list/1' + "?r=" + (new Date().getTime()))
        return
    }

    let result = await http.update({
        url: '/api/position/search',
        data: {
            keywords
        }
    })
    if (result.ret) {
        res.render(positionView({
            list: result.data.list
        }))
    } else {
        res.go('/position')
    }
}
export const list = async(req, res, next) => {
    let currentPage = ~~req.params.page || 1
    let result = await http.get({
        url: '/api/position',
        data: {
            start: (currentPage - 1) * count,
            count
        }
    })
    console.log(result.data.list.list.length);

    if (result.data.list.list.length == 0 && currentPage > 1) {
        res.go('/position_list/' + (currentPage - 1))
        return
    }
    let pageCount = _.range(1, Math.ceil(result.data.list.total / count) + 1)
    if (result.ret) {

        let { list } = result.data.list
        res.render(positionView({
            list,
            pageCount,
            currentPage
        }))

        _handleAddClick(res)
    } else {
        res.go('/home')
    }
    $('body').on('click', '.update_btn', function() {
        _handleUpdateClick(res, this)
    })
    $('body').on('click', '.danger_btn', function() {
        _handledeleteClick(req, res, this)
    })
    $('body').on('keyup', '#search', (ev) => {
        if (ev.keyCode === 13) {
            console.log(ev.target.value);
            console.log(res);

            _handleSearch(res, ev.target.value)
        }
    })
    $('#box-footer a.page-number').on('click', function() {
        _handlePageNumberClick(req, res, this)
    })

    $('#box-footer a.page-prev').on('click', function() {
        _handlePageNumberClick(req, res, this, 'prev')
    })

    $('#box-footer a.page-next').on('click', function() {
        _handlePageNumberClick(req, res, this, 'next', pageCount)
    })
}
export const add = async(req, res, next) => {
    res.render(positionAddView())
        // $('#add_btn').on('click', _handleSubmit)
    $('#form_add').ajaxForm({
        resetForm: true
    })
}

export const update = async(req, res, next) => {
    let id = req.body.id
    let result = await http.get({
        url: '/api/position/findOne',
        data: {
            id
        }
    })
    console.log(result.data);

    res.render(positionUpdateView({
            item: result.data
        }))
        /*    $('#u_btn').on('click', async() => {
               console.log(111);
               let data = $('#update_from').serialize()
               console.log(data);

               let result = await http.update({
                   url: '/api/position',
                   data: data + '&id=' + id,
                   type: 'patch'
               })
               if (result.ret) {
                   res.go('/position')
               } else {
                   alert(result.data.message)
               }
           }) */
    $('#update_from').ajaxForm({
        resetForm: true,
        dataType: 'json',
        url: '/api/position',
        method: 'patch',
        success: (result) => {
            if (result.ret) {
                res.go('/position')
            } else {
                alert(result.data.message)
            }
        }
    })
}