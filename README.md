# xap-net-address
A NodeJS utility module that calulates the broadcast and network addresses to use for the xAP home automation UDP transport.

Written in TypeScript (v3.1.1). Tested on NodeJS (v8.12.0). May work with earlier versions.

Uses the [silverwind/default-gateway](https://github.com/silverwind/default-gateway) excellent, cross-platform library to do the heavy lifting.

## Installation

```shell
> npm install xap-net-address
```

## Usage

```typescript
// TypeScript
import { xAPnetAddress } from 'xap-net-address'
```
```javascript
// JavaScript
var xAPnetAddress = require('xap-net-address')
```

## API
Three static methods:
* **xAPnetAddress.defaultInterface()**
determines the default gateway and returns the interface info for the adapter that connects to it.

* **xAPnetAddress.defaultIP()**
examines the defaultInterface and returns the local address to bind to for receiving xAP UDP messages from the local area network.

* **xAPnetAddress.defaultBroadcastIP()**
examines the defaultInterface and returns the broadcast address for transmitting xAP UDP messages to the local area network.

All methods may return `undefined` or will throw an exception if the default gateway cannot be determined (e.g., when there is no network).

Representations for IP addresses and network interfaces are from [whitequark/ipaddr.js](https://github.com/whitequark/ipaddr.js) and Node's `os.networkInterfaces()`.

See [test/test.ts](./test/test.ts) for an example of using this module.

[xap-hub](https://github.com/erspearson/xap-hub) uses `xap-net-address`.
If you are creating a [xap-framework](https://github.com/erspearson/xap-framework) application
that is to be a client of `xap-hub` then you do not need to use `xap-net-address`.

## Background
Implementers of xAP software have sometimes struggled to determine reliably the correct IPv4 addresses to use in xAP UDP communication.
It is a simple enough task for embedded hardware with a single network interface but it becomes non-trivial
when the host has multiple physical or virtual network interfaces,
possibly supporting both IPv4 and IPv6 and with multiple IP addresses.
Any need to work on more than one platform makes this even harder.

The correct network interface to use for xAP is generally the one with the route to the LAN's default gateway.
There is no consistent way to determine this across platforms but silverwind's default-gateway library implements a number of
platform-specific methods behind a single API to do this. xap-net-address uses default-gateway to suggest the most likely default addresses
for sending and receiving xAP UDP messages.

This library is an add-on for the xap-framework library for NodeJS.
It is split out from the main library since, necessarily, default-gateway
needs quite a few dependencies to do its work cross-platform.
A consumer of xap-framework may not require
the xAP network addresses to be determined dynamically and may prefer to avoid these dependencies
in their work by providing the addresses via other means (e.g., .ini files).

## TypeScript
The TypeScript source is in the `src` directory on the [GitHub repository](https://github.com/erspearson/xap-net-address).

The compiled JavaScript and TypeScript definitions are in the `lib` directory on NPM.

To build from source:
* Clone the Git repository
* `npm install` to download dependencies
* `tsc` to compile the source.

To run the test example:
* `cd test`
* `tsc` to compile
* `node test.js` to run.

xap-net-address is part of a family of modules for xAP  
![xAP family diagram](/img/xap-family-net-address.png?raw=true)