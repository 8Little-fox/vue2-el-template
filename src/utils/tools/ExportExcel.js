import XLSX from 'xlsx'

function downloadFile (url, fileName) {
  // console.log('download file: [name]', fileName, '[path]', url);
  const link = document.createElement('a')

  if (typeof url === 'object' && url instanceof Blob) {
    url = URL.createObjectURL(url) // 创建 blob 地址
  }

  link.download = fileName || new Date().getTime()
  link.style.display = 'none'
  link.href = url

  const e = document.createEvent('MouseEvents')
  e.initEvent('click', false, false)

  link.dispatchEvent(e)
}

/**
 * 生成 excel 表格
 * @param sheets 数组，数据列表，与工作表名一一对应
 * @param sheetNames 数组，工作表名列表
 * @returns {string|Blob} blob 文件
 */
function sheet2blob (sheets, sheetNames) {
  sheetNames = sheetNames || ['sheet1']

  if (!sheets) {
    return 'Give me sheets'
  }

  if (sheetNames.length < sheets.length) {
    for (let i = sheetNames.length; i < sheets.length; i += 1) {
      sheetNames[i] = 'sheet' + (i + 1)
    }
  }

  const SheetNames = [...sheetNames]
  const Sheets = {}
  SheetNames.forEach((name, index) => {
    Sheets[name] = sheets[index]
  })

  // 生成excel的配置项
  const options = {
    bookType: 'xlsx', // 要生成的文件类型
    bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
    type: 'binary'
  }
  const wbOut = XLSX.write({ SheetNames, Sheets }, options)

  // 字符串转ArrayBuffer
  function s2ab (s) {
    var buf = new ArrayBuffer(s.length)
    var view = new Uint8Array(buf)
    for (var i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF
    }
    return buf
  }

  return new Blob([s2ab(wbOut)], { type: 'application/octet-stream' })
}

// aoaList 数据格式 [aoa, aoa, aoa]
// aoa 数据格式，二维数组
// [
//   ['姓名', '性别', '年龄', '注册时间'],
//   ['张三', '男', 18, new Date()],
//   ['李四', '女', 22, new Date()],
// ];
/**
 * 本地数据导出 excel
 * @param data {Object} {aoaList: [], cell: {type: String, value: Object}[], sheetNames: String[], fileName: String} 表格数据
 */
function exportExcel ({ aoaList, cell, sheetNames, fileName } = {}) {
  if (!aoaList?.length) {
    console.log('exportExcel: No Given Data')
    return 'No Given Data'
  }
  if (!fileName) {
    fileName = 'sheet'
  }
  if (!/^.*\.xlsx$/g.test(fileName)) {
    fileName += '.xlsx'
  }
  const sheets = []

  aoaList.forEach((aoa, index) => {
    const sheet = XLSX.utils.aoa_to_sheet(aoa)
    if (cell[index]?.type) {
      // 合并表格 s: 开始，e：结束，r：行，c：列
      // sheet['!merges'] = [{s: {r: 0, c: 0}, e: {r: 0, c: 2}}];
      sheet[cell[index].type] = cell[index].value || []
    }
    sheets.push(sheet)
  })

  const file = sheet2blob(sheets, sheetNames || [])
  downloadFile(file, fileName)
}

export { exportExcel }
