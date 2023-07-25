import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { CreationClient as _creationPackage_CreationClient, CreationDefinition as _creationPackage_CreationDefinition } from './creationPackage/Creation';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  creationPackage: {
    Creation: SubtypeConstructor<typeof grpc.Client, _creationPackage_CreationClient> & { service: _creationPackage_CreationDefinition }
    CreationRequest: MessageTypeDefinition
    CreationResponse: MessageTypeDefinition
  }
}

