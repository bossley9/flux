# flux

A [Miniflux](https://miniflux.app) client app

## Motivation

I wanted a way to access my feeds from my phone without signing into a separate browser app or using a PWA. I also wanted to brush up on my React Native knowledge and play around with data fetching and Typescript.

Plus I'm opinionated too - I want custom styling and the existing Miniflux clients just don't do it for me :)

## Installation

1. Clone and install dependencies.

```sh
npm install
```

2. Build. I used Expo to defer builds because it's much less hassle. You have to create an account, though.

```sh
npm run build
```

If you want to develop locally on NixOS, I've left a nix shell available via `shell.nix`.
