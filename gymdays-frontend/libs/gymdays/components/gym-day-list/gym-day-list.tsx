import { Layout, List, useTheme } from "@ui-kitten/components";
import { GymDayData } from "@gymDays/types";
import { Button, Card, Group, H3, Paragraph, SizableText, View } from "tamagui";
import { dateToYearMonthDay } from "@utils/utils";
import { styled } from "tamagui";
import { Pressable, ViewProps } from "react-native";
import { Link } from "expo-router";
import AddButton from "@ui/add-button";
import HeaderNav, { MenuItemProps } from "@ui/header-nav";
import { router } from "expo-router";
import * as Services from "libs/gymdays/features/services/services";
import { useSelectableItem } from "libs/gymdays/features/hooks/useSelectableItem";
import { Plus, StarFull } from "@tamagui/lucide-icons";
import { PortalGate } from "libs/utils/portal/PortalContext";
import { useAppSelector } from "app/hooks";
import { selectTodaysGymDay } from "app/store";
import { SwappableWithDelete } from "@ui/swappable-with-delete";
import { useEffect, useMemo, useState } from "react";
import { DarkTheme } from "@react-navigation/native";
import * as db from "@gymDays/db";

interface GimDayListProps {
	gymDays: GymDayData[];
}

interface HeaderProps extends ViewProps {
	date: Date;
	name: string;
}
const StyledLayout = styled(Layout);

const Header = ({ date, name, ...viewProps }: HeaderProps) => {
	const theme = useTheme();
	return (
		<>
			<View
				className=" rounded-bl-2xl absolute p-2 -right-1 -top-1"
				bg={DarkTheme.colors.background}
			>
				<SizableText size={"$4"}>
					{dateToYearMonthDay(new Date(date))}
				</SizableText>
			</View>
			<StyledLayout
				{...viewProps}
				className="flex-row items-center justify-between"
			>
				<H3>{name}</H3>
			</StyledLayout>
		</>
	);
};

const CardWeightText = ({
	text,
	isPersonalBest,
}: {
	text: string;
	isPersonalBest: boolean;
}) => {
	if (isPersonalBest) {
		return (
			<View className="flex-row items-center">
				<StarFull size={18} color={"$color.yellow9Dark"} />
				<Paragraph className="ml-2" color={"$color.yellow9Dark"}>
					{text}
				</Paragraph>
			</View>
		);
	}
	return <Paragraph>{text}</Paragraph>;
};

const LinkGymDayCard = ({
	item,
	index,
	onLongPress,
	personalBests,
}: {
	item: GymDayData;
	index: number;
	onLongPress: () => void;
	personalBests: number[];
}) => {
	return (
		<Link
			key={index}
			href={{
				pathname: "/gym-days/[id]",
				params: { id: item.id },
			}}
			asChild
		>
			<SimpleGymCard
				personalBests={personalBests}
				onLongPress={onLongPress}
				gymDayData={item}
			/>
		</Link>
	);
};

const SimpleGymCard = ({
	gymDayData,
	onPress,
	onLongPress,
	highlighted,
	personalBests,
}: {
	gymDayData: GymDayData;
	onPress?: () => void;
	onLongPress?: () => void;
	highlighted?: boolean;
	personalBests: number[];
}) => {
	const { exercises } = gymDayData;
	const exercisesWithPersonalBest = useMemo(() => {
		return exercises.map((exercise) => {
			const maxWeight = Math.max(...exercise.sets.map((s) => s.weights));
			const isPersonalBest = exercise.sets.some((s) =>
				personalBests.includes(s.id)
			);
			const exerciseForHome = {
				id: exercise.id,
				gymDay: exercise.gymDay,
				name: exercise.name,
				maxWeight,
				isPersonalBest,
			};
			return exerciseForHome;
		});
	}, [exercises, personalBests]);
	return (
		<Pressable onLongPress={onLongPress} onPress={onPress}>
			<Card
				className="mb-3 border-2"
				borderColor={highlighted ? "$color" : "$colorTransparent"}
			>
				<Card.Header>
					<Header
						date={new Date(gymDayData.date)}
						name={gymDayData.name}
					/>
				</Card.Header>

				<View className="flex-row p-6">
					<View>
						{gymDayData.exercises.map((exercise, i) => (
							<Paragraph key={i}>{exercise.name}</Paragraph>
						))}
					</View>
					<View className="flex-1 items-end">
						{exercisesWithPersonalBest.map((exercise, i) => {
							if (exercise.maxWeight > 0) {
								return (
									<CardWeightText
										text={exercise.maxWeight + "kg"}
										isPersonalBest={exercise.isPersonalBest}
									/>
								);
							}
						})}
					</View>
				</View>
			</Card>
		</Pressable>
	);
};

export default function GimDayList({ gymDays }: GimDayListProps) {
	const {
		selectModeOn: selectMode,
		setSelectModeOff,
		selectedItemsArr: selectedExercises,
		onLongPress,
		onSelectableItemPress,
	} = useSelectableItem();

	const [isScrollEnabled, setIsScrollEnabled] = useState(true);
	const [personalBestSetIds, setPersonalBestSetIds] = useState<number[]>([]);

	useEffect(() => {
		const fetchPersonalBests = async () => {
			const personalBests = await db.findPersonalBest();
			setPersonalBestSetIds(personalBests);
		};
		fetchPersonalBests();
	}, []);
	const todaysGymDay = useAppSelector(selectTodaysGymDay);

	const onPressInsert = async () => {
		const res = await Services.createNewGymDay();
		router.navigate({
			pathname: "/gym-days/[id]",
			params: { id: res.id },
		});
	};

	const getMenuItems = () => {
		if (!selectMode) {
			const menuItems = [
				{
					title: "Backups",
					onPress: () => {
						router.navigate("/backup");
					},
				},
			];
			return menuItems;
		}
		const selectedMenuItems: MenuItemProps[] = [
			{
				title: "Stop Selecting",
				onPress: () => {
					setSelectModeOff();
				},
			},
			{
				title: "Delete",
				onPress: () => {
					setSelectModeOff();
					Services.bulkDeleteGymDays(selectedExercises);
				},
			},
		];
		return selectedMenuItems;
	};

	const currentGymDayButtons = (
		<Group orientation="horizontal" className="mx-6">
			<Group.Item>
				<Button
					className="flex-1"
					onPress={() => {
						if (todaysGymDay) {
							router.navigate({
								pathname: "/gym-days/[id]",
								params: { id: todaysGymDay.id },
							});
						}
					}}
				>
					Go to Current Gym Day
				</Button>
			</Group.Item>
			<Group.Item>
				<Button
					onPress={onPressInsert}
					bg={"$accentBackground"}
					icon={Plus}
				/>
			</Group.Item>
		</Group>
	);

	return (
		<View className="flex-1">
			<HeaderNav title="Gym Days" menuItems={getMenuItems()} />
			<List
				style={{ backgroundColor: "transparent" }}
				className="h-5/6"
				data={gymDays}
				scrollEnabled={isScrollEnabled}
				renderItem={({ item, index }) => {
					if (selectMode) {
						return (
							<SimpleGymCard
								onPress={() => onSelectableItemPress(item.id)}
								gymDayData={item}
								key={item.id}
								highlighted={selectedExercises.includes(
									item.id
								)}
								personalBests={personalBestSetIds}
							/>
						);
					}
					return (
						<SwappableWithDelete
							key={item.id}
							onDeletePress={() =>
								Services.bulkDeleteGymDays([item.id])
							}
							onSwapping={(isSwapping) =>
								setIsScrollEnabled(!isSwapping)
							}
						>
							<LinkGymDayCard
								index={index}
								item={item}
								onLongPress={() => onLongPress(item.id)}
								personalBests={personalBestSetIds}
							/>
						</SwappableWithDelete>
					);
				}}
			/>
			<PortalGate name="footer" isEntry>
				{todaysGymDay ? (
					currentGymDayButtons
				) : (
					<AddButton
						text="Create new gym day"
						onPress={onPressInsert}
					/>
				)}
			</PortalGate>
		</View>
	);
}
