/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 Dan Halbert for Adafruit Industries
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use babel';

var child_process = require("child_process");
var fs = require('fs');
var path = require('path');

export default {

  activate(state) {
    // On every TextEditor save, make sure the file is completely written out immediately.
    atom.workspace.observeTextEditors(
      function(editor) {
        editor.onDidSave(function(event) {
          console.log(event.path);
          // Only sync files that may be on the CIRCUITPY filesystem.
          if (event.path.includes("CIRCUITPY")) {
            if (process.platform == "linux") {
              // Sync the filesystem containing the file.
              child_process.execFileSync("/bin/sync", ["--file-system", event.path]);
            } else {
              // Sync the file.
              fd = fs.openSync(event.path, "a");
              fs.fsyncSync(fd);
              fs.closeSync(fd);
              // console.log('CIRCUITPY synced');
            }
          }
        });
      }
    );
  },
}
