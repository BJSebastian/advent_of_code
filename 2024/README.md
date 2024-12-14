# 2024 - Using Typescript from Day 6 onwards
<!-- markdownlint-disable MD029 -->

1. Initialize the project:

```zsh
mkdir my-project
cd my-project
npm init -y 
```

2. Install TypeScript and ts-node

```zsh
npm install -D typescript ts-node @types/node
```

- *typescript*: The TypeScript compiler.
- *ts-node*: Allows you to run TypeScript files directly without compiling them first.
- *@types/node*: Provides TypeScript definitions for Node.js core modules.

3. Create a tsconfig.json file:

```zsh
npx tsc --init
```

This creates a tsconfig.json file, which configures the TypeScript compiler. You might want to customize some options, such as:

- *"target":* "es6": Specifies the ECMAScript version to target.
- *"module":* "commonjs": Specifies the module system to use (CommonJS for Node.js).
- *"outDir":* "./dist": Specifies the output directory for compiled JavaScript files.
- *"esModuleInterop":* true: Enables interoperability between CommonJS and ES modules.

4. Create a TypeScript file:

Create a file named index.ts (or any other name you prefer) and add some TypeScript code:

```ts
import { readFileSync } from 'fs'; 

const data = readFileSync('package.json', 'utf8');
console.log(JSON.parse(data).name); 
```

5. Run your TypeScript code:

```zsh
# This command will execute your TypeScript file using ts-node.
npx ts-node index.ts 
```

6. Set up a build script:

Add a "build" script to your package.json file:

```json
"scripts": {
  "build": "tsc"
}
```

Now you can compile your TypeScript code to JavaScript by running:

```zsh
# This will create the compiled JavaScript files in the dist directory.
npm run build 
```
