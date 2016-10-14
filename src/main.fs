namespace SendTo
module Main  =
  open SendTo
  open Fable.Core
  open Fable.Import
  open Fable.Import.vscode
  open Ionide.VSCode.Helpers

  let activate (context : vscode.ExtensionContext) = 
    printfn "a Main"
    Terminal.activate context
    Play.activate context

