import { View, SizableText, ViewProps } from "tamagui";

interface BasicCardProps extends ViewProps {
	title: string;
	footer?: string;
}
export function BasicCard({ title, footer, ...rest }: BasicCardProps) {
	return (
		<View
			bg={"$background"}
			height={"$6"}
			minWidth={"$6"}
			flex={1}
			justifyContent="center"
			alignItems="center"
			{...rest}
		>
			<SizableText size={"$5"}>{title}</SizableText>
			<SizableText size={"$2"} className="absolute right-1 bottom-1">
				{footer}
			</SizableText>
		</View>
	);
}
