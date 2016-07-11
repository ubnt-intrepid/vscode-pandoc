'use strict';

import {commands, ExtensionContext, window} from 'vscode';
import * as cp from 'child_process';

export function activate(context: ExtensionContext) {
    let editor = window.activeTextEditor;

    let disposable = commands.registerCommand('extension.convertPandoc', () => {
        // The text to be converted.
        let text = editor.document.getText(editor.selection);

        // create the instance of pandoc executable with callback.
        var pandoc = cp.exec("pandoc --from=markdown --to=latex", (err, stdout, stderr) => {
            if (err) {
                console.error("pandoc failed: %s", stderr);
                return;
            }

            window.activeTextEditor.edit((edit) => {
                edit.replace(editor.selection, stdout);
            });
        });

        // send text from stdin.
        pandoc.stdin.write(text);
        pandoc.stdin.end();
    }); 
    context.subscriptions.push(disposable);
}
