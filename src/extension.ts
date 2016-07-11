'use strict';

import * as vscode from 'vscode';
import * as cp from 'child_process';

function selectedText(): string {
    let editor = vscode.window.activeTextEditor;
    let doc = editor.document;
    let selection = editor.selection;
    return doc.getText(selection);
}

function sayHello() {
    // vscode.window.showInformationMessage('Hello World!');
    let text = selectedText();

    var pandoc = cp.exec("pandoc --from=markdown --to=latex", (err, stdout, stderr) => {
        if (err) {
            console.error("pandoc failed: %s", stderr);
            return;
        }

        console.log("converted: \"%s\"", stdout);
        // TODO: replace selected text to converted string.
    });

    // send text.
    pandoc.stdin.write(text);
    pandoc.stdin.end();
}

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.sayHello', sayHello); 
    context.subscriptions.push(disposable);
}
