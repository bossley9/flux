{
  description = "A Miniflux client app";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/23.05";

  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs {
        inherit system;
        config = {
          allowUnfree = true;
          android_sdk.accept_license = true;
        };
      };
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        name = "react-native";

        nativeBuildInputs = [
          pkgs.nodejs
          pkgs.android-studio
        ];

        shellHook = ''
          set -o vi
        '';
      };
    };
}
