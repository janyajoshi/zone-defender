import { PriorityQueue } from "./pq"
import { getPriorityQueue } from "./pq-utils"

interface ForbiddenZone {
	top: number
	left: number
	width: number
	height: number
}

interface MaxRowsAndCols {
	rows: number
	cols: number
}

interface Coordinates {
	x: number
	y: number
}

const getMaxRowsAndCols = (
	gridWidth: number,
	gridHeight: number,
	boxWidth: number,
	boxHeight: number
): MaxRowsAndCols => {
	const rows = Math.floor(gridHeight / boxHeight)
	const cols = Math.floor(gridWidth / boxWidth)
	return { rows, cols } as MaxRowsAndCols
}

const getGrid = (
	gridWidth: number,
	gridHeight: number,
	boxWidth: number,
	boxHeight: number,
	forbiddenZones: Array<ForbiddenZone>,
	padding: number
) => {
	const { rows, cols }: MaxRowsAndCols = getMaxRowsAndCols(
		gridWidth,
		gridHeight,
		boxWidth,
		boxHeight
	)
	const grid: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false))
	for (const fz of forbiddenZones) {
		if (
			fz.top + fz.height > gridHeight + 2 * padding ||
			fz.left + fz.width > gridWidth + 2 * padding
		) {
			console.error("Invalid dimensions: forbidden zone ignored.", fz)
			continue
		}

		//  determine indexes
		const start__from_top: number = Math.floor(
			(fz.top - padding < padding ? padding : fz.top - padding) / boxHeight
		)
		const end__from_bottom: number = Math.ceil((fz.top + fz.height - padding) / boxHeight) - 1
		//
		const start__from_left: number = Math.floor(
			(fz.left - padding < padding ? padding : fz.left - padding) / boxWidth
		)
		const end__from_right: number = Math.ceil((fz.left + fz.width - padding) / boxWidth) - 1

		//  mark overlapped boxes as occupied
		for (let i = start__from_top; i <= end__from_bottom && i < rows; i++) {
			for (let j = start__from_left; j <= end__from_right && j < cols; j++) {
				grid[i][j] = true
			}
		}
	}
	return grid
}

const getBlockCoordinates = (
	boxWidth: number,
	boxHeight: number,
	row: number | undefined,
	col: number | undefined,
	padding: number
): Coordinates | undefined => {
	if (row === undefined || col === undefined) {
		return undefined
	} else
		return {
			x: (col === 0 ? 0 : col * boxWidth) + padding,
			y: (row === 0 ? 0 : row * boxHeight) + padding,
		}
}

export const getCoordinates = (
	gridWidth: number,
	gridHeight: number,
	boxWidth: number,
	boxHeight: number,
	forbiddenZones: Array<ForbiddenZone>,
	padding: number
): Array<Coordinates | undefined> => {
	const grid = getGrid(
		gridWidth - 2 * padding,
		gridHeight - 2 * padding,
		boxWidth,
		boxHeight,
		forbiddenZones,
		padding
	)
	const pq: PriorityQueue = getPriorityQueue(grid)
	const usablePqSize: number = pq.priorities.filter((p) => p.priority1 !== 0).length
	const coordinates: Array<Coordinates | undefined> = []

	for (let i = 0; i < usablePqSize; i++) {
		const priority = pq.dequeue()
		coordinates.push(
			getBlockCoordinates(boxWidth, boxHeight, priority?.priority2, priority?.priority3, padding)
		)
	}
	return coordinates
}
