import { Priorities, PriorityQueue } from "./pq"

const isEven = (num: number): boolean => num % 2 === 0

export const addMatrices = (matrix1: number[][], matrix2: number[][]): number[][] | undefined => {
	const numberOfRows = matrix1.length
	const numberOfColumns = matrix1[0].length

	if (numberOfRows !== matrix2.length || numberOfColumns !== matrix2[0].length) {
		return undefined
	}

	const resultMatrix: number[][] = new Array(numberOfRows)
		.fill(null)
		.map(() => new Array(numberOfColumns))

	for (let i = 0; i < numberOfRows; i++) {
		for (let j = 0; j < numberOfColumns; j++) {
			resultMatrix[i][j] = matrix1[i][j] + matrix2[i][j]
		}
	}

	return resultMatrix
}

export const invertMatrix = (matrix: number[][]): number[][] => {
	const numberOfRows = matrix.length
	const numberOfColumns = matrix[0].length

	const invertedMatrix = new Array(numberOfColumns).fill(null).map(() => new Array(numberOfRows))

	for (let i = 0; i < numberOfRows; i++) {
		for (let j = 0; j < numberOfColumns; j++) {
			invertedMatrix[j][i] = matrix[i][j]
		}
	}

	return invertedMatrix
}

const getPriorityMatrix = (
	numberOfRows: number,
	numberOfColumns: number
): number[][] | undefined => {
	const rowPriority: Array<Array<number>> = []
	const columnPriority: Array<Array<number>> = []

	//	set row priority
	for (let i = 0; i < numberOfRows; i++) {
		const row: Array<number> = []
		for (
			let j = 0;
			isEven(numberOfColumns) ? j < numberOfColumns / 2 : j <= Math.floor(numberOfColumns / 2);
			j++
		) {
			row.push(numberOfColumns - j)
		}
		for (
			let j = isEven(numberOfColumns) ? numberOfColumns / 2 : Math.floor(numberOfColumns / 2) + 1;
			j < numberOfColumns;
			j++
		) {
			row.push(j + 1)
		}
		rowPriority.push(row)
	}

	//	set column priority
	for (let j = 0; j < numberOfColumns; j++) {
		const column: Array<number> = []
		for (
			let i = 0;
			isEven(numberOfRows) ? i < numberOfRows / 2 : i <= Math.floor(numberOfRows / 2);
			i++
		) {
			column.push(numberOfRows - i)
		}
		for (
			let i = isEven(numberOfRows) ? numberOfRows / 2 : Math.floor(numberOfRows / 2) + 1;
			i < numberOfRows;
			i++
		) {
			column.push(i + 1)
		}
		columnPriority.push(column)
	}

	return addMatrices(rowPriority, invertMatrix(columnPriority))
}

export const getPriorityQueue = (grid: boolean[][]): PriorityQueue => {
	const pq: PriorityQueue = new PriorityQueue()
	const priorityMatrix: number[][] | undefined = getPriorityMatrix(grid.length, grid[0].length)
	if (priorityMatrix === undefined) {
		console.error("pq: Invalid Parameters")
	} else {
		for (let i = 0; i < priorityMatrix.length; i++) {
			for (let j = 0; j < priorityMatrix[0].length; j++) {
				pq.enqueue({
					priority1: grid[i][j] === true ? 0 : priorityMatrix[i][j],
					priority2: i,
					priority3: j,
				} as Priorities)
			}
		}
	}
	return pq
}
