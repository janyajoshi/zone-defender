import tape from "tape"
import { getCoordinates } from "../index"
import assertions from "./assertions"

tape("main export is a function", function test(t: tape.Test) {
	t.strictEqual(typeof getCoordinates, "function", "")
	t.end()
})

tape("matrix addition", function test(t: tape.Test) {
	assertions.matrixAddition.forEach((a) => t.deepEqual(a.actual, a.expected, ""))
	t.end()
})

tape("matrix inversion", function test(t: tape.Test) {
	assertions.invertMatrix.forEach((a) => t.deepEqual(a.actual, a.expected, ""))
	t.end()
})
