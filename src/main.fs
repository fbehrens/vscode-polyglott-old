namespace SendTo
module Main  =
  open SendTo
  open Fable.Import.vscode

  let activate (context : ExtensionContext) = 
    Terminal.activate context
    Play.activate context

