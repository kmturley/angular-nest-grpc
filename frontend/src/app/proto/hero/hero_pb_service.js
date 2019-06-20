// package: hero
// file: hero/hero.proto

var hero_hero_pb = require("../hero/hero_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var HeroService = (function () {
  function HeroService() {}
  HeroService.serviceName = "hero.HeroService";
  return HeroService;
}());

HeroService.GetHeroById = {
  methodName: "GetHeroById",
  service: HeroService,
  requestStream: false,
  responseStream: false,
  requestType: hero_hero_pb.HeroById,
  responseType: hero_hero_pb.Hero
};

HeroService.ListHeroesById = {
  methodName: "ListHeroesById",
  service: HeroService,
  requestStream: false,
  responseStream: false,
  requestType: hero_hero_pb.HeroById,
  responseType: hero_hero_pb.HeroList
};

exports.HeroService = HeroService;

function HeroServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

HeroServiceClient.prototype.getHeroById = function getHeroById(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(HeroService.GetHeroById, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

HeroServiceClient.prototype.listHeroesById = function listHeroesById(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(HeroService.ListHeroesById, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.HeroServiceClient = HeroServiceClient;

