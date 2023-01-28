let
  pkgs = import <nixpkgs> {
    config = {
      allowUnfree = true;
      android_sdk.accept_license = true;
    };
  };
in
pkgs.mkShell {
  name = "react-native";

  nativeBuildInputs = [
    pkgs.nodejs
    pkgs.android-studio
  ];

  shellHook = ''
    set -o vi
  '';
}

