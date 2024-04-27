echo "Running Next.js build script with npm"
npm run build

echo "Current directory"
pwd

echo "Copying post markdown files to build output"
cp -r ./post ./public/post_md

echo "Files in ./"
ls -la

echo "Files in ./public"
ls -la ./public

echo "Content of ./.vercel/project.json"
cat ./.vercel/project.json