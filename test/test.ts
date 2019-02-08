import { xAPnetAddress } from '../lib/xap-net-address'
import { NetworkInterfaceInfoIPv4 } from 'os';

console.log('Test xAPnetAddress:')

var myint: NetworkInterfaceInfoIPv4 | undefined

try {
  myint = xAPnetAddress.defaultInterface()
} catch {
  console.log('  Exception thrown: default gateway could not be determined - is there a network?')
  process.exit(1)
}

if(myint) {
  console.log('  Selected network interface is: ' + myint.mac)

  let myip = xAPnetAddress.defaultIP()
  if(myip) {
    console.log('  Default IP calculated as: ' + myip.toString())
  } else {
    console.log('  Default IP could not be determined')
  }

  let mybr = xAPnetAddress.defaultBroadcastIP()
  if(mybr) {
    console.log('  Default broadcast IP calculated as: ' + mybr.toString())
  } else {
    console.log('  Default broadcast IP could not be determined')
  }
} else {
  console.log('  Error: Appropriate network interface could not be determined - are there any?')
}




