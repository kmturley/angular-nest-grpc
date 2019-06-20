# angular-nest-grpc

Example full-stack Typescript project using:

* Angular 7.2.x
* NestJS 5.6.x
* Protocol Buffers 3.2.x


## Installation

Install dependencies using:

    docker-compose build


## Usage

Run backend, frontend and proxy together using:

    docker-compose up

Access the Nest gRPC microservice at:

    http://localhost:50051/

Access the Envoy Proxy at:

    http://localhost:8080/

View the Angular frontend at:

    http://localhost:4200/


## Protocol Buffers

If you update backend .proto files, then you will need to recompile them to frontend services using:

    cd frontend
    npm run compile

You can find out more information about gRPC requests and generated client-side code here:

    https://github.com/improbable-eng/grpc-web/blob/master/client/grpc-web/docs/code-generation.md


## Exploring and testing endpoints

Install grpc_cli using:

    brew tap grpc/grpc
    brew install --with-plugins grpc

Then view the endpoints using:

    export GRPC_VERBOSITY=DEBUG
    grpc_cli ls localhost:50051
    grpc_cli call localhost:50051 GetHeroById "id: 1" --protofiles=backend/src/hero/hero.proto
    grpc_cli call localhost:50051 ListHeroesByName "name: 'Jo'" --protofiles=backend/src/hero/hero.proto


## Directory structure

    /backend                               --> Backend source files
    /frontend                              --> Frontend sources files


## Contact

For more information please contact kmturley
