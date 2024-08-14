import { styled } from "nativewind";
import { Text as _Text } from "@ui-kitten/components";

const StyledText = styled(_Text);

type TextProps = React.ComponentProps<typeof _Text>;

export const Text = (props: TextProps) => <StyledText {...props} />;
