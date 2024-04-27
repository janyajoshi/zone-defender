export interface Priorities {
	priority1: number
	priority2: number
	priority3: number
}

export class PriorityQueue {
	priorities: Priorities[]
	constructor() {
		this.priorities = []
	}

	isEmpty(): boolean {
		return this.priorities.length === 0
	}

	enqueue(priorities: Priorities): void {
		let added: boolean = false

		for (let i = 0; i < this.priorities.length; i++) {
			const current = this.priorities[i]
			if (priorities.priority1 > current.priority1) {
				this.priorities.splice(i, 0, priorities)
				added = true
				break
			}
		}

		if (!added) {
			this.priorities.push(priorities)
		}
	}

	dequeue(): Priorities | undefined {
		return this.isEmpty() ? undefined : this.priorities.shift()
	}

	front(): Priorities | undefined {
		return this.isEmpty() ? undefined : this.priorities[0]
	}

	size(): number {
		return this.priorities.length
	}
}
