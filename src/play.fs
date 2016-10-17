namespace SendTo
module Play  =
  open Fable.Core
  open Fable.Import.vscode
  open Ionide.VSCode.Helpers
  
  let hello () =
    promise {
      let! a= window.showInformationMessage("Hello4", "a" ,"b")
      printfn "chosen3 %A" a
    } |> ignore

  let showQuickPick () = 
    promise {
      let ra = ["essen";"trinken"] |>ResizeArray 
      let! r = window.showQuickPick( ra |> Case1)
      printfn "selected %s" r } 

  let activate (context : ExtensionContext) = 
    commands.registerCommand("sendtoTerminal.hello",hello |> unbox )
    |> context.subscriptions.Add 

