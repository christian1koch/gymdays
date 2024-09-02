import { Layout, List, useTheme } from "@ui-kitten/components";
import { GymDayData } from "@gymDays/types";
import { Button, Card, Group, H3, Paragraph, View } from "tamagui";
import { bulkNumberToWeightString, dateToYearMonthDay } from "@utils/utils";
import { styled } from "tamagui";
import { Pressable, ViewProps } from "react-native";
import { Link } from "expo-router";
import AddButton from "@ui/add-button";
import HeaderNav, { MenuItemProps } from "@ui/header-nav";
import { router } from "expo-router";
import * as Services from "libs/gymdays/features/services/services";
import { useSelectableItem } from "libs/gymdays/features/hooks/useSelectableItem";
import { Plus } from "@tamagui/lucide-icons";
import { PortalGate } from "libs/utils/portal/PortalContext";
import { useAppSelector } from "app/hooks";
import { selectTodaysGymDay } from "app/store";

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
		<StyledLayout
			{...viewProps}
			className="flex-row items-center justify-between"
		>
			<H3>{name}</H3>
			<StyledLayout
				className="rounded-full p-1 mx-2"
				style={{
					backgroundColor: theme["color-primary-500"],
				}}
			>
				<Paragraph>{dateToYearMonthDay(new Date(date))}</Paragraph>
			</StyledLayout>
		</StyledLayout>
	);
};

const LinkGymDayCard = ({
	item,
	index,
	onLongPress,
}: {
	item: GymDayData;
	index: number;
	onLongPress: () => void;
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
			<SimpleGymCard onLongPress={onLongPress} gymDayData={item} />
		</Link>
	);
};

const SimpleGymCard = ({
	gymDayData,
	onPress,
	onLongPress,
	highlighted,
}: {
	gymDayData: GymDayData;
	onPress?: () => void;
	onLongPress?: () => void;
	highlighted?: boolean;
}) => {
	return (
		<Pressable onLongPress={onLongPress} onPress={onPress}>
			<Card
				className="mb-3"
				bg={!highlighted ? "$background" : "$borderColor"}
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
						{gymDayData.exercises.map((exercise, i) => (
							<Paragraph key={i}>
								{exercise.sets.map((set) => {
									return set.weights;
								})}
							</Paragraph>
						))}
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
							/>
						);
					}
					return (
						<LinkGymDayCard
							index={index}
							item={item}
							onLongPress={() => onLongPress(item.id)}
						/>
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
