import { Paragraph, View } from "tamagui";
import Divider from "./divider";

export const HorizontalList = ({
	list,
}: {
	list: string[] | JSX.Element[];
}) => {
	return (
		<View className="flex-row flex-wrap gap-y-2">
			{list.map((item, i) => (
				<View key={i}>
					<View className="flex-row">
						<Paragraph className="">{item}</Paragraph>
						{i < list.length - 1 && <Divider className="mx-2" />}
					</View>
				</View>
			))}
		</View>
	);
};
