import path from 'path'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ProtoGrpcType } from './proto/creation'
import { CreationHandlers } from './proto/creationPackage/Creation'
import { CreationRequest } from './proto/creationPackage/CreationRequest'

const PORT = 8080

const PROTO_FILE = './proto/creation.proto'
const packageOf = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE))

const grpcObject = (grpc.loadPackageDefinition(packageOf) as unknown) as ProtoGrpcType
const creationPackage = grpcObject.creationPackage

function getConnection () {
  const server = new grpc.Server()
  server.addService(creationPackage.Creation.service, {
    CreateItem: (call) => {
      call.on('data', (chunk: CreationRequest) => {
        const moduleName = call.metadata.get('moduleName')[0] as string

        if (moduleName === 'userModule') {
          const userId = chunk.userId!

          console.log(chunk)

          if (!userId) {
            call.write({ message: 'You must to specify a userId', status: false })
            call.end()
          }

          call.write({ message: 'userId received', userId, status: true })
          call.end()
        } else {
          call.write({ message: 'Module name is not valid', status: false })
          call.end()
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