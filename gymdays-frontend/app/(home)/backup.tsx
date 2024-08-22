import { useEffect, useState } from "react";
import { Button, Group, Input, SizableText, Spinner, View } from "tamagui";
import { createNewBackup, getBackupId } from "@gymDays/db";
import HeaderNav from "@ui/header-nav";
import {
	createBackup,
	restoreBackup,
	updateBackup,
} from "libs/gymdays/features/db/backup";
import Toast from "react-native-toast-message";
import { ConfirmationDialog } from "@ui/confirmation-dialog";
import { fetchAllGymDays } from "@gymDays/services";

export default function BackupPage() {
	const [backupId, setBackupId] = useState<string>();
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingAction, setIsLoadingAction] = useState(false);
	const [error, setError] = useState<string>();
	const [customBackupId, setCustomBackupId] = useState<string>("");
	const isRestoreDisabled = !backupId;

	useEffect(() => {
		const fetchBackupId = async () => {
			try {
				setIsLoading(true);
				const backupIdRes = await getBackupId();
				setBackupId(backupIdRes);
			} catch (error) {
				const err = error as Error;
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		};

		fetchBackupId();
	}, []);

	const showCreateSuccessToast = () => {
		Toast.show({
			type: "success",
			text1: "Backup created",
			text2: "Save the backup id for future uses",
		});
	};
	const showRestoreSuccessToast = () => {
		Toast.show({
			type: "success",
			text1: "Backup restored",
			text2: "Save the backup id for future uses",
		});
	};

	const showErrorToast = (error: string) => {
		Toast.show({
			type: "error",
			text1: "Backup failed",
			text2: error,
		});
	};

	const onBackupCreate = async () => {
		try {
			setIsLoadingAction(true);
			if (backupId) {
				const res = await updateBackup(backupId);
				showCreateSuccessToast();
				console.log(res);
				return;
			}
			const res = await createBackup();
			await createNewBackup(res.id);
			setBackupId(res.id);
			showCreateSuccessToast();
		} catch (error) {
			const err = error as Error;
			console.log(err.message);
			showErrorToast(err.message);
		} finally {
			setIsLoadingAction(false);
		}
	};

	const onBackupRestore = async () => {
		let _backupId = backupId;
		if (!_backupId) {
			_backupId = customBackupId;
		}
		try {
			setIsLoadingAction(true);
			await restoreBackup(_backupId);
			const dbBackupId = await getBackupId();
			if (!dbBackupId) {
				await createNewBackup(_backupId);
				setBackupId(_backupId);
			}
			await fetchAllGymDays();
			showRestoreSuccessToast();
		} catch (error) {
			const err = error as Error;
			console.log(err);
			showErrorToast(err.message);
		} finally {
			setIsLoadingAction(false);
		}
	};

	if (isLoading) {
		return (
			<View className="flex-1 justify-center">
				<Spinner />
			</View>
		);
	}
	return (
		<>
			<HeaderNav title="Back-ups" href={"/"} />
			<View className="flex-1 justify-around">
				<View>
					{backupId && (
						<>
							<View className="flex-row justify-center">
								<SizableText size={"$7"}>
									Your back-up id:{" "}
								</SizableText>
								<SizableText
									size={"$7"}
									color={"$accentColor"}
									textDecorationLine={"underline"}
								>
									{backupId}
								</SizableText>
							</View>
							<View className="mx-12">
								<SizableText theme={"alt2"}>
									Save this id somewhere safe to restore
									back-ups after re-install or installing in a
									new device
								</SizableText>
							</View>
						</>
					)}
				</View>
				<View className="mx-5">
					{isLoadingAction ? (
						<Spinner size="large" />
					) : (
						<>
							<Button onPress={onBackupCreate} className="mb-5">
								Create Back-up
							</Button>
							{isRestoreDisabled ? (
								<RestoreBackupInputGroup
									onButtonPress={onBackupRestore}
									onChangeText={setCustomBackupId}
								/>
							) : (
								<ConfirmationDialog
									triggerText="Restore Back-up"
									acceptText="Restore"
									title="Restore Back Up"
									description={
										"Restore will replace your gymdays with the ones in your last back up."
									}
									onAccept={onBackupRestore}
									triggerButtonProps={{
										theme: "accent",
									}}
								/>
							)}
						</>
					)}
				</View>
			</View>
		</>
	);
}
interface RestoreBackupInputGroupProps {
	onChangeText: (text: string) => void;
	onButtonPress: () => void;
}
function RestoreBackupInputGroup({
	onButtonPress,
	onChangeText,
}: RestoreBackupInputGroupProps) {
	return (
		<Group orientation="horizontal" className="w-full">
			<Group.Item>
				<Input
					placeholder="Enter backupId here"
					className="flex-1"
					onChangeText={onChangeText}
					textContentType={"username"}
					autoCorrect={false}
					autoCapitalize="none"
				/>
			</Group.Item>
			<Group.Item>
				<ConfirmationDialog
					triggerText="Restore Back-up"
					triggerButtonProps={{
						bg: "$accentBackground",
						borderTopLeftRadius: 0,
						borderBottomLeftRadius: 0,
					}}
					acceptText="Restore"
					title="Restore Back Up"
					description={
						"Restore will replace your gymdays with the ones in your last back up."
					}
					onAccept={onButtonPress}
				/>
			</Group.Item>
		</Group>
	);
}
