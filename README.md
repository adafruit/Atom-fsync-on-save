# fsync-on-save

When Atom saves a file, sometimes you need to flush all the
data to the storage device immediately. For instance, you might want to
make sure data is written to a persistent storage medium promptly, or
a file might be on on a removable drive that may be unplugged without
notice.

This simple package does an `fsync()` or equivalent to write all the
data immediately.  The `node.js` function `fs.fsyncSync()` is called
after the file is written.

The original motivation for this package was to make Atom be a safe
editor for use with [Adafruit Industries CircuitPython](https://www.adafruit.com/circuitpython).
CircuitPython will automatically reload and restart when a file is
written to the `CIRCUITPY` drive. Several operating systems do not
write all data and metadata to USB drives immediately. This
delayed-write behavior can cause auto-reload to read an incompletely
written version of the updated file (such as `main.py` or `code.py`)
when CircuitPython restarts. It can also cause the `CIRCUITPY`
filesystem to become corrupted if the board is unplugged or reset
before the file is completely written.

As of this writing, this delayed-write behavior is noticeable on
Windows and Linux, but not on MacOS. Note that Linux may still write
additional metata to `CIRCUITPY` a minute or so later after saving the
file, causing an auto-reload. That's a different problem which this
package cannot address.
