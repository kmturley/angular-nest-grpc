// package: hero
// file: hero/hero.proto

var hero_hero_pb = require("../hero/hero_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var HeroService = (function () {
  function HeroService() {}
  HeroService.serviceName = "hero.HeroService";
  return HeroService;
}());

HeroService.GetHeroes = {
  methodName: "GetHeroes",
  service: HeroService,
  requestStream: false,
  responseStream: false,
  requestType: hero_hero_pb.HeroById,
  responseType: hero_hero_pb.HeroList
};

HeroService.GetHeroById = {
  methodName: "GetHeroById",
  service: HeroService,
  requestStream: false,
  responseStream: false,
  requestType: hero_hero_pb.HeroById,
  responseType: hero_hero_pb.Hero
};

HeroService.GetHeroesStream = {
  methodName: "GetHeroesStream",
  service: HeroService,
  requestStream: true,
  responseStream: true,
  requestType: hero_hero_pb.HeroById,
  responseType: hero_hero_pb.HeroList
};

HeroService.GetHeroByIdStream = {
  methodName: "GetHeroByIdStream",
  service: HeroService,
  requestStream: true,
  responseStream: true,
  requestType: hero_hero_pb.HeroById,
  responseType: hero_hero_pb.Hero
};

exports.HeroService = HeroService;

function HeroServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

HeroServiceClient.prototype.getHeroes = function getHeroes(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(HeroService.GetHeroes, {
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

HeroServiceClient.prototype.getHeroesStream = function getHeroesStream(metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.client(HeroService.GetHeroesStream, {
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport
  });
  client.onEnd(function (status, statusMessage, trailers) {
    listeners.status.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners.end.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners = null;
  });
  client.onMessage(function (message) {
    listeners.data.forEach(function (handler) {
      handler(message);
    })
  });
  client.start(metadata);
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    write: function (requestMessage) {
      client.send(requestMessage);
      return this;
    },
    end: function () {
      client.finishSend();
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

HeroServiceClient.prototype.getHeroByIdStream = function getHeroByIdStream(metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.client(HeroService.GetHeroByIdStream, {
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport
  });
  client.onEnd(function (status, statusMessage, trailers) {
    listeners.status.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners.end.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners = null;
  });
  client.onMessage(function (message) {
    listeners.data.forEach(function (handler) {
      handler(message);
    })
  });
  client.start(metadata);
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    write: function (requestMessage) {
      client.send(requestMessage);
      return this;
    },
    end: function () {
      client.finishSend();
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.HeroServiceClient = HeroServiceClient;

