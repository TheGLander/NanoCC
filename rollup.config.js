import analyze from "rollup-plugin-analyzer"
import { terser } from "rollup-plugin-terser"
import typescript from "rollup-plugin-typescript2"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"

const production = process.env.NODE_ENV === "production"

const plugins = [
	resolve({ browser: true }),
	commonjs(),
	typescript({
		tsconfig: "./tsconfig.json",
	}),
	terser(),
	analyze({
		summaryOnly: true,
	}),
]

//import banner from "rollup-plugin-banner"
export default [
	{
		input: ["./src/index.ts"],
		output: {
			file: "./app.js",
			format: "cjs",
			sourcemap: false,
			freeze: false,
		},
		plugins,
		external: ["Storage"],
	},
]
