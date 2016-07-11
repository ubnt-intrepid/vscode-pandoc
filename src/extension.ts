'use strict';

import {commands, ExtensionContext, window} from 'vscode';
import * as cp from 'child_process';

function sayHello() {
    let editor = window.activeTextEditor;
    // get selected text.
    let text = editor.document.getText(editor.selection);

    var pandoc = cp.exec("pandoc --from=markdown --to=latex", (err, stdout, stderr) => {
        if (err) {
            console.error("pandoc failed: %s", stderr);
            return;
        }

        window.activeTextEditor.edit((edit) => {
            edit.replace(editor.selection, stdout);
        });
    });

    // send text.
    pandoc.stdin.write(text);
    pandoc.stdin.end();
}

export function activate(context: ExtensionContext) {
    let disposable = commands.registerCommand('extension.sayHello', sayHello); 
    context.subscriptions.push(disposable);
}
