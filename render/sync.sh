# copy the kb src from the repo, then add the render-only shell
rm -rf src && cp -r ../repo/src src
mkdir -p src/routes
printf '<!doctype html>\n<html lang="en">\n<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />%%sveltekit.head%%</head>\n<body>%%sveltekit.body%%</body>\n</html>\n' > src/app.html
echo "export const prerender = true;" > src/routes/+layout.js
