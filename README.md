# CircuitPython Force to Drive

[Adafruit Industries CircuitPython](https://www.adafruit.com/circuitpython) will automatically reload and restart when a file is written to the `CIRCUITPY` drive. Several operating systems do not write all data and metadata to USB drives immediately. This delayed-write behavior can cause auto-reload to read an incompletely written version of the updated file (such as `main.py` or `code.py`) when CircuitPython restarts. It can also cause the `CIRCUITPY` filesystem to become corrupted if the board is unplugged or reset before the file is completely written.

This simple package forces a file to be written completely to the `CIRCUITPY` drive whenever a file is saved to that drive.

On Linux, `/bin/syncfs` is run to force out the file (because it may do a more complete job than just `fsync`). On other operating systems, the `node.js` operation `fs.fsyncSync()` is called on the file. The file is not sync'd if the file being saved is not being written to the `CIRCUITPY` drive.

As of this writing, this delayed-write behavior is noticeable on Windows and Linux, but not on MacOS. Note that Linux may still write to CIRCUITPY a minute or so later after saving the file, causing an auto-reload. That's' a different problem which this package cannot address.
