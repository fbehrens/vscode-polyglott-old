namespace Polyglott
module Main  =
  open Polyglott
  open Fable.Import.vscode

  let activate (context : ExtensionContext) = 
    Terminal.activate context
    Play.activate context

