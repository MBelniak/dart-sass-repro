const path = require('path');
const fs = require('fs-extra');

const getRelativeToRootDirPaths = (relativeToRootDirPath, cssDir) =>
    relativeToRootDirPath
        .split(path.sep)
        .map((_, i, array) => {
            const parts = [...array];
            parts.splice(i, 0, cssDir);
            return parts.join(path.sep);
        })
        .reverse();

const isRelativePath = requestPath => requestPath.startsWith('.');
    
module.exports = function customerDirectoryInSourcesSassImporter(options) {
    const importsToResolve = require('sass-loader/dist/importsToResolve').default;

    return function importer(request, origin, done) {
        const requests = importsToResolve(request).flatMap(requestPath => {
            if (isRelativePath(requestPath)) {
                const absPath = path.join(path.dirname(origin), requestPath);
                const rootRelative = path.relative(options.rootDirectory, absPath);
                return getRelativeToRootDirPaths(rootRelative, options.cssDir);
            }

            return requestPath;
        }).map(relativePath => path.join(options.rootDirectory, relativePath));

        for (const requestPath of requests) {
            console.log(requestPath);
            if (fs.existsSync(requestPath)) {

                return done({
                    file: requestPath
                });
            }
        }

        return done({
            file: request
        });
    };
}

