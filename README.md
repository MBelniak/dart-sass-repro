# dart-sass-repro

In the 'main' branch there's a reproduction using node-sass.
In the 'with-dart-sass' there's a reproduction using dart-sass.
In the 'minimal-repro' branch there's a minimal repro code.

## How to reproduce?

Clone the repo, then
```
git checkout minimal-repro
npm install 
npm run build
```

In the console there's only 'Importer received: missing', there is no 'Importer received: exists', so the importer is not called for existing file.
