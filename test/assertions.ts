import { addMatrices, invertMatrix } from "../utils/pq-utils"

interface Assertion {
	actual: any
	expected: any
}
const getAssertion = (actual: any, expected: any): Assertion => {
	return { actual, expected } as Assertion
}

export default {
	matrixAddition: [
		getAssertion(
			addMatrices(
				[
					[1, 1],
					[2, 2],
				],
				[
					[3, 3],
					[4, 4],
				]
			),
			[
				[4, 4],
				[6, 6],
			]
		),
		getAssertion(addMatrices([[9, 9]], [[1, 5]]), [[10, 14]]),
	],
	invertMatrix: [
		getAssertion(invertMatrix([[1], [2], [3]]), [[1, 2, 3]]),
		getAssertion(
			invertMatrix([
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9],
			]),
			[
				[1, 4, 7],
				[2, 5, 8],
				[3, 6, 9],
			]
		),
	],
}
