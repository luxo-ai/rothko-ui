# Verde :leaves:

Verde is a monorepo compising all the frontend parts of aemiko.

## Monorepo Structure

<pre>
├── apps
│   ├── <a href="/apps/mobile">mobile</a>
│   ├── <a href="/apps/aemiko">aemiko</a>
│   └── <a href="/apps/abp">abp</a>  
├── lerna.json
├── packages
│   ├── <a href="/packages/ui">shared ui</a>
│   └── <a href="/packages/utils">shared utils</a>
├── scripts
│   └── ...
...
</pre>

| Subrepos                |          Description          |
| :---------------------- | :---------------------------: |
| [mobile](apps/mobile)   |     React Native (Mobile)     |
| [aemiko](apps/aemiko)   |    NextJs Customer Webapp     |
| [abp](apps/abp)         |     React Business Portal     |
| [ui](packages/ui)       | Shared React UI Library (DLS) |
| [utils](packages/utils) | Shared React Utility Library  |

## Branches

- [main](tree/main): this is the production branch, **do not push directly**. Deploys to aemiko.com
- [dev](tree/dev): developement branch. Deploys [here](https://brave-davinci-a009da.netlify.app/).

## Environment variables

Don't forget to set your `.env` file. See the [.env.example](.env.example) file for information on what env variables exist in the project. To symlink your `.env` file use the `yarn link:env` script.

## Run locally

To run locally use the root level scripts. To run:

- [mobile](apps/mobile): use `yarn start:mobile:dev`.
- [aemiko](apps/aemiko): use `yarn start:aemiko:dev`.
- [abp](apps/abp): use `yarn start:abp:dev`.

If you're editing the shared libraries: [ui](packages/ui) and [utils](packages/utils) you'll also want to hot reload them via: `yarn build:shared:dev`.

## Notes

The monorepo is using [lerna](https://lerna.js.org/) for sub-repo orchestration. Netlify with monorepo can be challenging, use the `NETLIFY_USE_YARN=true` flag.

## Questions?

Consult [@luserazo](https://github.com/luserazo)
