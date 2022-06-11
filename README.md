# SlimeVR UI


This is the GUI of SlimeVR, it uses the SolarXR protocol to communicate with the server and is completely isolated from the server logic.

This project is written in Typescript and using Tauri as the backend. Tauri is written in Rust.

# Prerequisites

- Node 16 (We recommend the use of nvm instead of installing node directly)
- Windows Webview
- SlimeVR server installed

# Install

```
npm install
```

# Launch in dev mode

```
npm run tauri dev
```

# Contributions
By contributing to this project you are placing all your code under MIT or less restricting licenses, and you certify that the code you have used is compatible with those licenses or is authored by you. If you're doing so on your work time, you certify that your employer is okay with this.

For a how-to on contributing, see [CONTRIBUTING.md](CONTRIBUTING.md).

# License Clarification

**SlimeVR software** (including server, firmware, drivers, installator, documents, and others - see licence for each case specifically) **is distributed under the [MIT License](https://github.com/SlimeVR/SlimeVR-Server/blob/main/LICENSE) and is copyright of Eiren Rain and SlimeVR.** The MIT Licence is a permissive license giving you rights to modify and distribute the software with little strings attached.

**However, the MIT License has some limits, and if you wish to distribute software based on SlimeVR, you need to be aware of them:**

* When distributing any software that uses or is based on SlimeVR, you have to provide to the end-user the original, unmodified `LICENSE` file from SlimeVR. This file is located [here](LICENSE.md). This includes the `Copyright (c) 2021 Eiren Rain, SlimeVR` part of the license. It is not sufficient to use a generic MIT License, it must be the original license file.
* This applies even if you distribute software without the source code. In this case, one way to provide it to the end-user is to have a menu in your application that lists all the open source licenses used, including SlimeVR's.

Please refer to the [LICENSE](LICENSE.md) file if you are at any point uncertain what the exact the requirements are.