import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

console.log(join(__dirname, './hero/hero.proto'));

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'hero',
    protoPath: join(__dirname, './hero/hero.proto'),
  },
};
