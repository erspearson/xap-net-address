  
import os = require('os')
import dgram = require('dgram')
import ipaddr = require('ipaddr.js')
import defaultGateway = require('default-gateway')

export module xAPnetAddress {

  // Determine an IPv4 broadcast address bound to the local LAN to use for sending xAP messages
  // 1) use a platform dependent exec to determine the default gateway from the routing tables (using the default-gateway module)
  // 2) lookup the network interface for the gateway in os.networkInterfaces
  // 3) lookup the first IPv4 address assigned to that interface
  // 4) generate a broadcast address from the CIDR form of that address.

  export function defaultBroadcastIP() : ipaddr.IPv4 | undefined {
    const da = defaultInterface()
    if(da && da.cidr) {
      return ipaddr.IPv4.broadcastAddressFromCIDR(da.cidr)
    } else {
      return undefined
    }
  }
  
  export function defaultIP() : ipaddr.IPv4 {
    let ip = ipaddr.IPv4.parse('0.0.0.0')
    let addr = defaultInterface()
    if(addr && addr.address) { ip = ipaddr.IPv4.parse(addr.address) }
    return ip;
  }

  let defaultInterfaceInfo: string | undefined = undefined;

  export function defaultInterface() : os.NetworkInterfaceInfoIPv4 | undefined {
    let defaultAddress: os.NetworkInterfaceBase | undefined = undefined;
    if(!defaultInterfaceInfo) {
      let gateway = defaultGateway.v4.sync()
      if(gateway && gateway.interface) {
        defaultInterfaceInfo = gateway.interface
      }
    }
    if(defaultInterfaceInfo) {
      defaultAddress = os.networkInterfaces()[defaultInterfaceInfo].find( (a) => { return a.family == 'IPv4' } )
    }
    return defaultAddress as os.NetworkInterfaceInfoIPv4 | undefined;
  }
}