# UI Library

This sub repo contains various common UI React components and hooks. It also contains the theme library.

Of particular importance are the [Elements/\*.tsx](src/Elements) files. These contain all the UI component elements like `Dropdown.tsx` and `DatePicker.tsx`.

Try to keep this package light and _only_ code that's shared.

## Bundler

This package uses [microbundle](https://github.com/developit/microbundle) bundle and package the goods. You can build the package using via: `yarn build`. If you want to build and watch the files for new changes, use: `yarn build:dev`.

## For contributers

Keep the dependency list extremely lean, please 🙏.

## Questions?

Consult [@luserazo](https://github.com/luserazo)
