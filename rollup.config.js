import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

export default {
    input: "./src/index.ts",
    plugins: [commonjs(), typescript()],
    output: {
        dir: "dist",
        format: "esm",
    },
};
