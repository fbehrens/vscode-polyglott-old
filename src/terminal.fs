namespace Polyglott
module Terminal =
  open Polyglott
  open Fable.Core
  open Fable.Import
  open Fable.Import.vscode
  open Ionide.VSCode.Helpers
  let mutable _terminal : Terminal option = None

  let initTerminal () = 
    let t = window.createTerminal "fsharp"
    if JS.isDefined workspace.rootPath then t.sendText((sprintf "cd %s" workspace.rootPath),true)
    t.sendText("fsharpi",true)
    t

  let rec terminal () = 
    match _terminal with 
    | Some t -> t
    | None ->    
        _terminal <- initTerminal () |> Some
        terminal () 
  let mutable _context : ExtensionContext option = None 

  let lineOrSelection () = 
      let editor = window.activeTextEditor
      let text = 
        if editor.selection.isEmpty then
          let editor = window.activeTextEditor
          let file = editor.document.fileName
          let pos = editor.selection.start
          let line = editor.document.lineAt pos
          line.text
        else
          let range = Range(editor.selection.anchor.line, editor.selection.anchor.character, editor.selection.active.line, editor.selection.active.character)
          editor.document.getText range
      _context |> Option.iter (fun c -> c.workspaceState.update("last",text) |> ignore )
      (terminal()).sendText( (text+";;"), true)
      commands.executeCommand "cursorDown" |> ignore

  let lastCommand () = 
      let text = 
        match _context with
        | None -> ""
        | Some c -> c.workspaceState.get "last"
      (terminal()).sendText( (text+";;"), true)

  let activate (context : vscode.ExtensionContext) = 
    _context <- Some context
    vscode.commands.registerCommand("polyglott.lineOrSelection",lineOrSelection |> unbox )
    |> context.subscriptions.Add 
    vscode.commands.registerCommand("polyglott.lastCommand",lastCommand |> unbox )
    |> context.subscriptions.Add 
    printfn "a terminal" 
