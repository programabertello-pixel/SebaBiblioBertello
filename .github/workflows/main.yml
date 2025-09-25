name: Package Repository

on:
  push:
    branches:
      - main

jobs:
  package:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Create ZIP archive
        run: |
          zip -r packaged-app.zip .

      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: packaged-app
          path: packaged-app.zip
