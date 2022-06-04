let
  pkgs = import (fetchTarball https://github.com/NixOS/nixpkgs/archive/cce0667.tar.gz) {};
in 
  with pkgs; mkShell {

    buildInputs = [
      nodejs-18_x
      nodePackages.pnpm
    ];

  }
