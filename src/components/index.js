import EleDataTables from './EleDataTables'
import config from './config'

EleDataTables.install = function (Vue, { httpInstance }) {
  config.$http = httpInstance
}
export default EleDataTables
