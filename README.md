# angular-nest-grpc

Example full-stack Typescript project using:

* Angular 7.2.x
* NestJS 5.6.x
* Protocol Buffers 3.2.x


## Installation

Install backend dependencies using:

    cd backend
    npm install

Install frontend dependencies using:

    cd frontend
    npm install


## Usage

Run the Nest backend:

    cd backend
    npm start

View the Nest backend at:

    http://localhost:3100/

Run the Angular frontend:

    cd frontend
    npm start

View the Angular frontend at:

    http://localhost:4200/


## Protocol Buffers

If you update backend .proto files, then you will need to recompile them to frontend services using:

    cd frontend
    npm run compile

You can find out more information about gRPC requests and generated client-side code here:

    https://github.com/improbable-eng/grpc-web/blob/master/client/grpc-web/docs/code-generation.md


## Directory structure

    /backend                               --> Backend source files
    /frontend                              --> Frontend sources files


## Contact

For more information please contact kmturley
