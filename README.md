# Funbook

## Project setup
```
yarn install
```

Compiles and hot-reloads for development
```
yarn serve
```

Compiles and minifies for production
```
yarn build
```

Lints and fixes files
```
yarn lint
```

## Project Deploy

Docker

1. Build the latest repo

```bash
yarn build
```

2. Switch to your Docker Context

```bash
docker context use <context-name>
```

3. Build the Docker Image

```bash
docker compose up -d --build
```

Then you can visit the website at `http://<host>:<port>`.

### Changes of FABWeb vs Fabulous

1. navigationView

- **location**: `src/components/general/navigationView/index.vue`

- **operation**:
    `Remove`
    ```javascript
    <local-tree-view
                        v-if="false"
    ```

2. Settings

- **location**: ``

- **operation**:
  - `v-if="false"` `updater` in `fv-collapse`
  - Use `import { RemoteNotebookWatcher } from '@/js/eventManager.js';` to replace `import { NotebookWatcher } from '@/js/eventManager.js';`
  - Use `nw: new RemoteNotebookWatcher(),` to replace `nw: new NotebookWatcher(),`
  - Comment
    ```javascript
    eventInit() {
        // this.nw.on('updater-callback', (event, { status, info }) => {
        //     this.updater.status = status;
        //     if (status === 'latest')
        //         this.updater.version = info.releaseName;
        //     if (status === 'loading')
        //         this.updater.downloadPercent = info.percent.toFixed(0);
        //     console.log({ status, info });
        // });
    },
    ```
