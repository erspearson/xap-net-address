import { xAPnetAddress } from '../lib/xap-net-address'

console.log('Test xAPnetAddress:')

let myint = xAPnetAddress.defaultInterface()
if(myint) {
  console.log('  Appropriate network interface is: ' + myint.mac)
  let myip = xAPnetAddress.defaultIP()
  console.log('  Default IP calculated as: ' + myip.toString())

  let mybr = xAPnetAddress.defaultBroadcastIP()
  if(mybr) {
  console.log('  Default broadcast IP calculated as: ' + mybr.toString())
  } else {
    console.log('  Default broadcast IP could not be determined')
  }
} else {
  console.log('  Error: Appropriate network interface could not be determined - are there any?')
}




