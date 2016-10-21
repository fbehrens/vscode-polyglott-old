namespace Polyglott
module Dbg =
  open Fable.Core
  open Fable.Import

  let fn name value = 
    printfn "%s: %A" value
