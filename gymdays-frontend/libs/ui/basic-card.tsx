import { View, SizableText, ViewProps } from "tamagui";

interface BasicCardProps extends ViewProps {
	title: string;
	footer?: string;
}
export function BasicCard({ title, footer, ...rest }: BasicCardProps) {
	return (
		<View
			bg={"$background"}
			minWidth={"$10"}
			height={"$6"}
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
