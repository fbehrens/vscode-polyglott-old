"use strict";

exports.__esModule = true;
exports.Settings = exports.Process = exports.VSCode = exports.PromiseBuilderImp = exports.Promise = exports.JS = undefined;

var _fableCore = require("fable-core");

var _vscode = require("vscode");

var _child_process = require("child_process");

var child_process = _interopRequireWildcard(_child_process);

var _fs = require("fs");

var fs = _interopRequireWildcard(_fs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JS = exports.JS = function ($exports) {
    return $exports;
}({});

var _Promise = function ($exports) {
    var create = $exports.create = function create(body) {
        return new Promise(function (resolverFunc, rejectorFunc) {
            body(function (v) {
                resolverFunc(v);
            })(function (e) {
                rejectorFunc(e);
            });
        });
    };

    var map = $exports.map = function map(a, pr) {
        return pr.then(a);
    };

    var bind = $exports.bind = function bind(a, pr) {
        return pr.then(a);
    };

    var _catch = $exports.catch = function _catch(a, pr) {
        return pr.then(null, a);
    };

    var either = $exports.either = function either(a, b, pr) {
        return pr.then(a, b);
    };

    var lift = $exports.lift = function lift(a) {
        return Promise.resolve(a);
    };

    var reject = $exports.reject = function reject(reason) {
        return Promise.reject(reason);
    };

    var onSuccess = $exports.onSuccess = function onSuccess(a, pr) {
        return pr.then(function (value) {
            a(value);
            return value;
        });
    };

    var onFail = $exports.onFail = function onFail(a, pr) {
        return pr.catch(function (reason) {
            a(reason);
            return reject(reason);
        });
    };

    var PromiseBuilder = $exports.PromiseBuilder = function PromiseBuilder() {
        _classCallCheck(this, PromiseBuilder);
    };

    _fableCore.Util.setInterfaces(PromiseBuilder.prototype, [], "Ionide.VSCode.Helpers.Promise.PromiseBuilder");

    return $exports;
}({});

exports.Promise = _Promise;

var PromiseBuilderImp = exports.PromiseBuilderImp = function ($exports) {
    var promise = $exports.promise = new _Promise.PromiseBuilder();
    return $exports;
}({});

var VSCode = exports.VSCode = function ($exports) {
    var getPluginPath = $exports.getPluginPath = function getPluginPath(pluginName) {
        var ext = _vscode.extensions.getExtension(pluginName);

        return ext.extensionPath;
    };

    return $exports;
}({});

var Process = exports.Process = function ($exports) {
    var isWin = $exports.isWin = function isWin() {
        return process.platform === "win32";
    };

    var isMono = $exports.isMono = function isMono() {
        return !(process.platform === "win32");
    };

    var onExit = $exports.onExit = function onExit(f, proc) {
        proc.on("exit", f);
        return proc;
    };

    var onOutput = $exports.onOutput = function onOutput(f, proc) {
        proc.stdout.on("data", f);
        return proc;
    };

    var onErrorOutput = $exports.onErrorOutput = function onErrorOutput(f, proc) {
        proc.stderr.on("data", f);
        return proc;
    };

    var onError = $exports.onError = function onError(f, proc) {
        proc.on("error", f);
        return proc;
    };

    var spawn = $exports.spawn = function spawn(location, linuxCmd, cmd) {
        var cmd_ = Array.from(cmd === "" ? [] : cmd.split(" "));
        var options = {
            cwd: _vscode.workspace.rootPath
        };

        if (isWin() ? true : linuxCmd === "") {
            return child_process.spawn(location, cmd_, options);
        } else {
            var prms = Array.from(_fableCore.Seq.delay(function (unitVar) {
                return _fableCore.Seq.append(_fableCore.Seq.singleton(location), _fableCore.Seq.delay(function (unitVar_1) {
                    return cmd_;
                }));
            }));
            return child_process.spawn(linuxCmd, prms, options);
        }
    };

    var spawnWithNotification = $exports.spawnWithNotification = function spawnWithNotification(location, linuxCmd, cmd, outputChannel) {
        return onError(function (e) {
            (function (arg00) {
                outputChannel.append(arg00);
            })(_fableCore.Util.toString(e));
        }, onOutput(function (e) {
            (function (arg00) {
                outputChannel.append(arg00);
            })(_fableCore.Util.toString(e));
        }, spawn(location, linuxCmd, cmd)));
    };

    var exec = $exports.exec = function exec(location, linuxCmd, cmd) {
        var options = {
            cwd: _vscode.workspace.rootPath
        };
        return new Promise(function (resolve, error) {
            if (isWin()) {
                child_process.exec(location + " " + cmd, options, function (e) {
                    return function (i) {
                        return function (o) {
                            var arg = [e, i, o];
                            resolve(arg);
                        };
                    };
                });
            } else {
                child_process.exec(linuxCmd + " " + location + " " + cmd, options, function (e) {
                    return function (i) {
                        return function (o) {
                            var arg = [e, i, o];
                            resolve(arg);
                        };
                    };
                });
            }
        });
    };

    return $exports;
}({});

var Settings = exports.Settings = function ($exports) {
    var Toml = $exports.Toml = function ($exports) {
        return $exports;
    }({});

    var FakeSettings = $exports.FakeSettings = function () {
        function FakeSettings(linuxPrefix, command, build, parameters, test) {
            _classCallCheck(this, FakeSettings);

            this.linuxPrefix = linuxPrefix;
            this.command = command;
            this.build = build;
            this.parameters = parameters;
            this.test = test;
        }

        FakeSettings.prototype.Equals = function Equals(other) {
            return _fableCore.Util.equalsRecords(this, other);
        };

        FakeSettings.prototype.CompareTo = function CompareTo(other) {
            return _fableCore.Util.compareRecords(this, other);
        };

        return FakeSettings;
    }();

    _fableCore.Util.setInterfaces(FakeSettings.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Ionide.VSCode.Helpers.Settings.FakeSettings");

    var WebPreviewSettings = $exports.WebPreviewSettings = function () {
        function WebPreviewSettings(linuxPrefix, command, host, port, script, build, startString, parameters, startingPage) {
            _classCallCheck(this, WebPreviewSettings);

            this.linuxPrefix = linuxPrefix;
            this.command = command;
            this.host = host;
            this.port = port;
            this.script = script;
            this.build = build;
            this.startString = startString;
            this.parameters = parameters;
            this.startingPage = startingPage;
        }

        WebPreviewSettings.prototype.Equals = function Equals(other) {
            return _fableCore.Util.equalsRecords(this, other);
        };

        WebPreviewSettings.prototype.CompareTo = function CompareTo(other) {
            return _fableCore.Util.compareRecords(this, other);
        };

        return WebPreviewSettings;
    }();

    _fableCore.Util.setInterfaces(WebPreviewSettings.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Ionide.VSCode.Helpers.Settings.WebPreviewSettings");

    var Settings = $exports.Settings = function () {
        function Settings(fake, webPreview) {
            _classCallCheck(this, Settings);

            this.Fake = fake;
            this.WebPreview = webPreview;
        }

        Settings.prototype.Equals = function Equals(other) {
            return _fableCore.Util.equalsRecords(this, other);
        };

        Settings.prototype.CompareTo = function CompareTo(other) {
            return _fableCore.Util.compareRecords(this, other);
        };

        return Settings;
    }();

    _fableCore.Util.setInterfaces(Settings.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Ionide.VSCode.Helpers.Settings.Settings");

    var loadOrDefault = $exports.loadOrDefault = function loadOrDefault(map, def) {
        try {
            var path = _vscode.workspace.rootPath + "/.ionide";
            var t = map(toml.parse(fs.readFileSync(path).toString()));

            if (t != undefined) {
                return t;
            } else {
                return def;
            }
        } catch (matchValue) {
            return def;
        }
    };

    return $exports;
}({});
//# sourceMappingURL=Helpers.js.map