# browser-extension

Testing grounds for build browser extension on Manifest V3.

## Requirements

- Canary (nightly) build of Chrome or Edge.
- Node.js
- TypeScript

## Purpose

The purpose of this repo and extension is to verify certain patterns and functionality for Manifest V3 browser extensions.

It relies on the new "chrome.storage.session" storage API that can be used to keep secrets, such as private keys and passwords.

Please remember that browsers and extensions are inherently not very secure.
