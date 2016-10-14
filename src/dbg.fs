namespace SendTo
module Dbg =
  open Fable.Core
  open Fable.Import
  open Fable.Import.vscode
  open Ionide.VSCode.Helpers

  let fn name value = 
    printfn "%s: %A" value
