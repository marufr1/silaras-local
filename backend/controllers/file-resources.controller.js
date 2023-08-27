const fs = require('fs')

exports.getAllFiles = async (req, res) => {
  const {text} = req.query
  let time = process.hrtime()
  const fileName = new Promise((resolve, reject) => {
    return fs.readdir('public/uploads', (err, files) => err != null ? reject(err) : resolve(files))
  })
  let data = await fileName
  data = data.map((file) => {
    const teks = text.toLowerCase()
    const pattern = file.toLowerCase()
    const output = 0
    for (let i = 0; i <= teks.length - pattern.length; i++) {
      let ok = true
      time = process.hrtime()
      for (let k = 0; k < pattern.length; k++) {
        if (teks.charAt(i + k) != pattern.charAt(k)) {
          ok = false
          break
        }
      }
      if (ok) {
        output++
        const NS_PER_SEC = 1e9
        const SEC_PER_NS = 1e-9 // nanoseconds to seconds
        const diff = process.hrtime(time)
        console.log(`${((diff[0] * NS_PER_SEC + diff[1]) * SEC_PER_NS).toFixed(7)} detik`);
      }
    }
    if (pattern.includes(teks)) {
      const NS_PER_SEC = 1e9
      const SEC_PER_NS = 1e-9 // nanoseconds to seconds
      const diff = process.hrtime(time)
      return {
        'file': file,
        'time': `${((diff[0] * NS_PER_SEC + diff[1]) * SEC_PER_NS).toFixed(7)} detik`
      }
    }
  }).filter(v => v != null)

  if (data.length > 0) {
    return res.status(200).json({
      'status': 200,
      'files': data,
      'message': 'Success'
    })
  } else {
    return res.status(404).json({
      'status': 404,
      'message': 'File not found'
    })
  }

}
