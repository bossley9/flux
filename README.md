# flux

A [Miniflux](https://miniflux.app) client app

## About

flux is a simple interface wrapper around the Miniflux API designed for viewing and consuming feed items. It does not, however, have the ability manage account data, sessions, integrations, tokens, or feeds themselves.

## Motivation

I wanted a way to access my feeds from my phone without signing into a separate browser app or using a PWA. I also wanted to brush up on my React Native knowledge and play around with React Query data fetching and Typescript. I also wanted custom styling and the existing Miniflux clients just didn't do it for me :)

## Installation

1. Clone and install dependencies.
    ```sh
    npm install
    ```
2. Build using Expo. I used Expo to defer builds because it's less hassle (but it does require an account).
    ```sh
    npm run build
    ```
3. Install the APK via ADB.
    ```sh
    adb install MY-BUILD.apk
    ```
