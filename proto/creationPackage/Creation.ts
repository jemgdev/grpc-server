// Original file: proto/creation.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreationRequest as _creationPackage_CreationRequest, CreationRequest__Output as _creationPackage_CreationRequest__Output } from '../creationPackage/CreationRequest';
import type { CreationResponse as _creationPackage_CreationResponse, CreationResponse__Output as _creationPackage_CreationResponse__Output } from '../creationPackage/CreationResponse';

export interface CreationClient extends grpc.Client {
  CreateItem(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_creationPackage_CreationRequest, _creationPackage_CreationResponse__Output>;
  CreateItem(options?: grpc.CallOptions): grpc.ClientDuplexStream<_creationPackage_CreationRequest, _creationPackage_CreationResponse__Output>;
  createItem(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_creationPackage_CreationRequest, _creationPackage_CreationResponse__Output>;
  createItem(options?: grpc.CallOptions): grpc.ClientDuplexStream<_creationPackage_CreationRequest, _creationPackage_CreationResponse__Output>;
  
}

export interface CreationHandlers extends grpc.UntypedServiceImplementation {
  CreateItem: grpc.handleBidiStreamingCall<_creationPackage_CreationRequest__Output, _creationPackage_CreationResponse>;
  
}

export interface CreationDefinition extends grpc.ServiceDefinition {
  CreateItem: MethodDefinition<_creationPackage_CreationRequest, _creationPackage_CreationResponse, _creationPackage_CreationRequest__Output, _creationPackage_CreationResponse__Output>
}
