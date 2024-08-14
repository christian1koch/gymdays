import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { BasicExercise } from "../../../../gymdays/data";
import { useEffect, useState } from "react";
import { getExerciseById, getExerciseTypes } from "../../../../db/db";
import Exercise from "../../../../gymdays/exercise";
import HeaderNav from "../../../../ui/header-nav";
import { useAppSelector } from "../../../hooks";
import { Footer } from "gymdays/footer";

export default function Page() {
	const searchParams = useLocalSearchParams();
	const { gymDayId, exerciseId } = searchParams;
	const gymDays = useAppSelector((state) => state.gymDays.gymDays);
	const gymDay = gymDays.find((g) => g.id === Number(gymDayId));
	const exercise = gymDay?.exercises.find((e) => e.id === Number(exerciseId));

	const [deleteMode, setDeleteMode] = useState(false);

	const getDeleteModeText = () => {
		if (deleteMode) {
			return "Disable Delete Mode";
		}
		return "Enable Delete Mode";
	};
	if (!exercise) {
		return null;
	}
	return (
		<>
			<HeaderNav
				title="Edit Exercise"
				href={{
					pathname: "/gym-days/[id]",
					params: { id: exercise.gymDay },
				}}
				menuItems={[
					{
						title: getDeleteModeText(),
						onPress: () => setDeleteMode(!deleteMode),
					},
				]}
			/>
			<Exercise exercise={exercise} deleteMode={deleteMode} />
			<Footer />
		</>
	);
}
