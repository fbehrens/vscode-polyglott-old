module Demo 
open Fable.Core
open Fable.Import
open Fable.Import.vscode
open Ionide.VSCode.Helpers

let activate (context : vscode.ExtensionContext) = 
    printfn "Hello world"
    
    vscode.commands.registerCommand("extension.sayHello", fun _ ->
        promise {
            let ra = ["essen";"trinken"] |>ResizeArray 
            let! r = vscode.window.showQuickPick( ra |> Case1)
            printfn "selected %s" r

        } |> ignore
        //r.``then``(fun s -> printfn "selected %s" s)
        vscode.window.showInformationMessage "Hello my extension!" |> unbox )
        
    |> context.subscriptions.Add
    
