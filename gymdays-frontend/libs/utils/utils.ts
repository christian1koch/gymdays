export function dateToYearMonthDay(date: Date): string {
	return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
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

export const DEFAULT_WEIGHTS = getDefaultWeights();
