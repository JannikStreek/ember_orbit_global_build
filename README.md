Ember Orbit.js global build Example
========================

Very basic example without Ember CLI. The router creates one todo item on visit and registers log messages if items are added.

Default: Wired JSONSource => Opening of index.html#todos results in no log messages.
If the LocalStorageSource is wired instead => Opening of index.html#todos results in log messages.

Issues:

- JSONSource does not receive didTransform events, the localStorageSource does
