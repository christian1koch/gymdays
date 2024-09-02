export function dateToYearMonthDay(date: Date): string {
	// Month + 1 bc is zero indexed...
	const newDate =
		date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
	return newDate;
}

export function numberToWeightString(weight: number): string {
	return `${weight} kg`;
}

export function bulkNumberToWeightString(weights: number[]): string {
	return weights.map((weight) => `${weight}`).join(" ");
}

const getDefaultWeights = () => {
	let weights: number[] = [];
	const setOfWeights = new Set<string>();
	for (let i = 2.5; i <= 200; i += 2.5) {
		setOfWeights.add("" + i);
		weights.push(i);
	}
	for (let i = 2; i <= 100; i += 2) {
		if (!setOfWeights.has("" + i)) {
			weights.push(i);
		}
	}
	return weights.sort((a, b) => a - b);
};

export const getArrayLastElement = <T>(arr: T[]) => {
	return arr[arr.length - 1];
};

function getDefaultReps() {
	let reps: number[] = [];
	for (let i = 1; i <= 100; i++) {
		reps.push(i);
	}
	return reps;
}

export const DEFAULT_WEIGHTS = getDefaultWeights();

export const DEFAULT_REPS = getDefaultReps();
