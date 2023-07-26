import path from 'path'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ProtoGrpcType } from './proto/creation'
import { CreationHandlers } from './proto/creationPackage/Creation'
import { CreationRequest } from './proto/creationPackage/CreationRequest'
import { CreationResponse } from './proto/creationPackage/CreationResponse'

const PORT = 8080

const PROTO_FILE = './proto/creation.proto'
const packageOf = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE))

const grpcObject = (grpc.loadPackageDefinition(packageOf) as unknown) as ProtoGrpcType
const creationPackage = grpcObject.creationPackage

const callObjects = new Map<string, grpc.ServerDuplexStream<CreationRequest, CreationResponse>>()

function getConnection () {
  const server = new grpc.Server()
  server.addService(creationPackage.Creation.service, {
    CreateItem: (call) => {
      call.on('data', (chunk: CreationRequest) => {
        const moduleName = call.metadata.get('moduleName')[0] as string
        console.log(`${moduleName} => ${chunk.message}`)

        if (callObjects.get('moduleName') === undefined) {
          callObjects.set(moduleName, call)
        }
        
        if (moduleName === 'userModule') {
          const userId = chunk.userId!

          if (!userId) {
            for(let [module, moduleCall] of callObjects) {
              if (module === 'userModule') {
                moduleCall.write({ message: 'Must specify a user id', status: false })
              }
            }
          }

          for(let [module, moduleCall] of callObjects) {
            moduleCall.write({ message: 'userId received', userId, status: true })
          }
        }        
      })
    }
  } as CreationHandlers)

  return server
} 

function main () {
  const server = getConnection()

  server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
      console.log(error)
    }

    console.log(`gRPC server running on port ${port}`)
    server.start()
  })
}

main()