import myAxios from '@/utils/request4.js'

export function getListAPI (paramsList) {
  return myAxios({
    url: '/api/roles',
    method: 'get'
  }, {
    repeat_request_cancel: true
  })
}
