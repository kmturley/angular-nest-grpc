// package: hero
// file: hero/hero.proto

var hero_hero_pb = require("../hero/hero_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var HeroService = (function () {
  function HeroService() {}
  HeroService.serviceName = "hero.HeroService";
  return HeroService;
}());

HeroService.FindOne = {
  methodName: "FindOne",
  service: HeroService,
  requestStream: false,
  responseStream: false,
  requestType: hero_hero_pb.HeroById,
  responseType: hero_hero_pb.Hero
};

HeroService.QueryHeroes = {
  methodName: "QueryHeroes",
  service: HeroService,
  requestStream: false,
  responseStream: true,
  requestType: hero_hero_pb.QueryHeroesRequest,
  responseType: hero_hero_pb.Hero
};

exports.HeroService = HeroService;

function HeroServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

HeroServiceClient.prototype.findOne = function findOne(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(HeroService.FindOne, {
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

HeroServiceClient.prototype.queryHeroes = function queryHeroes(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(HeroService.QueryHeroes, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.end.forEach(function (handler) {
        handler();
      });
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.HeroServiceClient = HeroServiceClient;

