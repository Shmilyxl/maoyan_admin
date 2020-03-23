import { update } from "../scripts/controllers/position";

export default {
    get({ url, type = 'GET', data = {} }) {
        return $.ajax({
            url,
            type,
            data,
            success: (result, textStatus, jqXHR) => {
                return result
            }
        });
    },
    update({
        url,
        data = {},
        type = 'post'
    }) {
        return $.ajax({
            url,
            data,
            type,
            success: function(result) {
                return result
            }
        });
    }
}