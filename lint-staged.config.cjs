const path = require('path')

const formatCommand = 'prettier --write .'
const buildEslintCommand = (filenames) =>
  `eslint --fix --max-warnings=0 ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`

module.exports = {
  '*.{js,jsx,ts,tsx}': [formatCommand, buildEslintCommand]
}
