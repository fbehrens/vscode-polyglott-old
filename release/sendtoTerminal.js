"use strict";

exports.__esModule = true;
exports._context = exports.terminal = undefined;
exports.showQuickPick = showQuickPick;
exports.information = information;
exports.pasteSelection = pasteSelection;
exports.activate = activate;
exports.deactivate = deactivate;

var _vscode = require("vscode");

var _fableCore = require("fable-core");

var _Helpers = require("./paket-files/Ionide/ionide-vscode-helpers/Helpers");

var terminal = exports.terminal = function () {
  var t = _vscode.window.createTerminal("sendto");

  if (_vscode.workspace.rootPath != undefined) {
    t.sendText(_fableCore.String.fsFormat("cd %s")(function (x) {
      return x;
    })(_vscode.workspace.rootPath), true);
  }

  t.sendText("fsharpi", true);
  return t;
}();

var _context = exports._context = null;

function showQuickPick() {
  return function (builder_) {
    var ra = Array.from(_fableCore.List.ofArray(["essen", "trinken"]));
    return _Helpers.Promise.bind(function (_arg1) {
      _fableCore.String.fsFormat("selected %s")(function (x) {
        console.log(x);
      })(_arg1);

      return Promise.resolve();
    }, _vscode.window.showQuickPick(ra));
  }(_Helpers.PromiseBuilderImp.promise);
}

function information() {
  return function (builder_) {
    return _Helpers.Promise.bind(function (_arg1) {
      _fableCore.String.fsFormat("chosen %A")(function (x) {
        console.log(x);
      })(_arg1);

      return Promise.resolve();
    }, _vscode.window.showInformationMessage("Hello2", "a", "b"));
  }(_Helpers.PromiseBuilderImp.promise);
}

function pasteSelection() {
  var editor = _vscode.window.activeTextEditor;
  var text = editor.selection.isEmpty ? _context != null ? function () {
    var c = _context;
    return c.workspaceState.get("last");
  }() : "" : function () {
    var range = new _vscode.Range(editor.selection.anchor.line, editor.selection.anchor.character, editor.selection.active.line, editor.selection.active.character);
    return editor.document.getText(range);
  }();

  _fableCore.Seq.iterate(function (c) {
    c.workspaceState.update("last", text);
  }, function () {
    var $var1 = _context;

    if ($var1 != null) {
      return [$var1];
    } else {
      return [];
    }
  }());

  return [terminal.sendText(text + ";;"), true];
}

function activate(context) {
  exports._context = _context = context;
  (function () {
    var objectArg = context.subscriptions;
    return function (arg00) {
      objectArg.push(arg00);
    };
  })()(_vscode.commands.registerCommand("sendtoTerminal.pasteSelection", function (arg00_) {
    return pasteSelection(arg00_);
  }));
}

function deactivate() {}
//# sourceMappingURL=sendtoTerminal.js.map