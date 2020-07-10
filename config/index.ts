// import os from "os"

// const getIP = () => {
//   const networkInterfaces = os.networkInterfaces()

//   const addresses = Object.keys(networkInterfaces)
//     .map((key) =>
//       networkInterfaces[key]
//         .map((item) => ({ ...item, key }))
//         .filter((item) => item.family === "IPv4")
//     )
//     .filter((item) => item.length > 0)
//     .reduce((prev, curr) => [...prev, ...curr], [])
//     .filter((item) => !item.internal)

//   console.log(addresses)

//   if (addresses.length < 1) {
//     return "127.0.0.1"
//   }

//   return addresses[0].address
// }

type ENVs = "production" | "development"
interface Config {
  baseUrl: string
}

const config: Record<ENVs, Config> = {
  production: {
    baseUrl: "https://s.zekan.tk",
  },
  development: {
    baseUrl: `http://192.168.1.2:3001`,
  },
}

const currConfig = config[process.env.NODE_ENV as ENVs]

export default currConfig
