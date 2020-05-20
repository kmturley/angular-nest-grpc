# angular-nest-grpc

Example full-stack Typescript project using:

* Angular 9.1.x
* NestJS 7.0.x
* Protocol Buffers 3.12.x
* Envoy Proxy 1.14.x


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

    npm install -g grpcc

Then view the endpoints using:

    grpcc -i --proto ./backend/src/hero/hero.proto --address localhost:50051

    // call grpc methods
    client.getHeroes({}, printReply)
    client.getHeroById({ id: 1 }, printReply)

    // call streaming methods
    var call = client.getHeroesStream().on('data', streamReply).on('status', streamReply); call.write({});
    var call = client.getHeroByIdStream().on('data', streamReply).on('status', streamReply); call.write({ id: 1 });

Test the regular HTTP REST api at:

    http://localhost:3001/hero
    http://localhost:3001/hero/1


## Directory structure

    /backend                               --> Backend source files
    /frontend                              --> Frontend sources files


## Contact

For more information please contact kmturley
