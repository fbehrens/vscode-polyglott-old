module SimpleRepl
open Fable.Core
open Fable.Import
open Fable.Import.vscode
open Ionide.VSCode.Helpers

let terminal = 
  let t = window.createTerminal "my"
  if JS.isDefined workspace.rootPath then
    t.sendText((sprintf "cd %s" workspace.rootPath),true)
  t.sendText("fsharpi",true)
  t

let mutable _context : ExtensionContext option = None 

let showQuickPick () = 
  promise {
    let ra = ["essen";"trinken"] |>ResizeArray 
    let! r = vscode.window.showQuickPick( ra |> Case1)
    printfn "selected %s" r
   } 
 
let information () =
  promise {
    let! a= vscode.window.showInformationMessage("Hello2", "a" ,"b")
    printfn "chosen %A" a
  }

let pasteSelection () = 
    let editor = window.activeTextEditor
    let text = 
      if editor.selection.isEmpty then
        match _context with
        | None -> ""
        | Some c -> c.workspaceState.get "last"
      else
        let range = Range(editor.selection.anchor.line, editor.selection.anchor.character, editor.selection.active.line, editor.selection.active.character)
        editor.document.getText range
    _context |> Option.iter (fun c -> c.workspaceState.update("last",text) |> ignore )
    terminal.sendText (text+";;"), true
  
let activate (context : vscode.ExtensionContext) = 
  _context <- Some context
  vscode.commands.registerCommand("simpleRepl.pasteSelection",pasteSelection |> unbox )
  |> context.subscriptions.Add 

let deactivate () =
    ()