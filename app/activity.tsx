import { SafeAreaView } from "react-native-safe-area-context";
import {
	Redirect,
	useLocalSearchParams,
	useNavigation,
	useRouter,
} from "expo-router";
import { useEffect, useState } from "react";
import {
	fetchActivity,
	fetchAppointments,
	registerActivity,
} from "@/utils/fetchData";
import useSession from "@/hooks/ctx";
import { ActivityExtendedType, AppointmentType, ProjectType } from "@/types";
import {
	Accordion,
	Button,
	Card,
	H6,
	Paragraph,
	ScrollView,
	Separator,
	Spinner,
	XStack,
	YStack,
} from "tamagui";
import { transformHours } from "@/utils/randomUtils";
import { StyleSheet } from "react-native";
import JWT from "expo-jwt";
import { Stack } from "expo-router";

export default function Activity() {
	const { session } = useSession();
	let registered = false;
	if (!session) {
		return <Redirect href={"/auth"} />;
	}
	const local = useLocalSearchParams<{
		activity: string;
		city: string;
		module: string;
		year: string;
	}>();
	const [activity, setActivity] = useState<ActivityExtendedType | null>(null);
	const [relatedActivities, setRelatedActivities] = useState<
		ActivityExtendedType[] | null
	>(null);
	const [reload, setReload] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [registerLoad, setRegisterLoad] = useState(false);
	const [project, setProject] = useState<ProjectType | null>(null);
	const [appointments, setAppointments] = useState<AppointmentType | null>(
		null,
	);
	const router = useRouter();
	const navigation = useNavigation();

	useEffect(() => {
		async function getActivity() {
			if (!session) {
				return;
			}
			setIsLoading(true);
			const res = await fetchActivity(
				session,
				local.year,
				local.module,
				local.city,
				local.activity,
			);
			if (res.ok) {
				const activityRes: ActivityExtendedType = await res.json();
				setActivity(activityRes);
				if (activityRes.is_projet) {
					const projectRes = await fetchActivity(
						session,
						local.year,
						local.module,
						local.city,
						local.activity,
						true,
					);
					const projectBody: ProjectType = await projectRes.json();
					setProject(projectBody);
					if (projectBody.urls) {
						let tempRelActivitiesArray: ActivityExtendedType[] = [];
						for (const item of projectBody.urls) {
							const year = item.link.split("/")[1];
							const module = item.link.split("/")[2];
							const city = item.link.split("/")[3];
							const activ = item.link.split("/")[4];
							const activRes = await fetchActivity(
								session,
								year,
								module,
								city,
								activ,
							);
							const activBody: ActivityExtendedType = await activRes.json();
							tempRelActivitiesArray.push(activBody);
						}
						setRelatedActivities(tempRelActivitiesArray);
					}
				}
				if (activityRes.type_code === "rdv") {
					const appointmentsRes = await fetchAppointments({
						session,
						year: local.year,
						module: local.module,
						city: local.city,
						activity: local.activity,
					});
					const appointmentsBody = await appointmentsRes.json();
					setAppointments(appointmentsBody);
				}
				setIsLoading(false);
			} else {
				router.push("/");
			}
		}

		getActivity();
	}, [reload]);
	if (isLoading || !activity) {
		return <Spinner size={"large"} />;
	} else if (activity) {
		activity.events.forEach((event) => {
			if (event.already_register != null) {
				registered = true;
			}
		});
	}

	function buttonRegister(eventCode: string, register: boolean) {
		if (!session) {
			return;
		}
		setRegisterLoad(true);
		registerActivity(
			session,
			local.year,
			local.module,
			local.city,
			local.activity,
			eventCode,
			register,
		).then((res) => {
			if (res.ok) {
				setReload(!reload);
				setRegisterLoad(false);
			}
		});
	}

	function buttonRegisterAppointment(appointmentId: string, register: boolean) {
		if (!session) {
			return;
		}
		setRegisterLoad(true);
		registerActivity(
			session,
			local.year,
			local.module,
			local.city,
			local.activity,
			appointmentId,
			register,
		).then((res) => {
			if (res.ok) {
				setReload(!reload);
				setRegisterLoad(false);
			}
		});
	}

	function openActivity(activ: ActivityExtendedType) {
		router.push(
			`/activity?year=${activ.scolaryear}&module=${activ.codemodule}&city=${activ.codeinstance}&activity=${activ.codeacti}`,
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<Stack.Screen
				options={{
					title: project ? project.title : activity?.title || "Activity",
				}}
			/>
			<YStack
				width={"95vw"}
				gap={"$2"}
				justifyContent={"center"}
				alignItems={"center"}
			>
				{activity.description && (
					<Card
						radiused
						padded
						bordered
						backgrounded
						marginVertical={"$6"}
						borderWidth={"$1.5"}
					>
						<Card.Header>
							<H6>Activity description</H6>
							<Separator />
						</Card.Header>
						<Card.Footer>
							<Paragraph>{activity.description}</Paragraph>
						</Card.Footer>
					</Card>
				)}
				{relatedActivities && relatedActivities.length > 0 && (
					<ScrollView>
						<YStack style={styles.scrollView}>
							<Paragraph>Related activities</Paragraph>
							{relatedActivities.map((activity) => {
								return (
									<Card
										justifyContent={"center"}
										padded
										radiused
										elevate
										marginTop={"$2"}
										key={activity.codeacti}
										onPress={() => openActivity(activity)}
									>
										<Card.Header>
											<H6>{activity.title}</H6>
											<Separator />
										</Card.Header>
										<Card.Footer>
											<XStack gap={"$4"}>
												<Paragraph>
													{new Date(activity.start).toDateString()}
												</Paragraph>
												<Paragraph>
													{transformHours(activity.nb_hours)}
												</Paragraph>
											</XStack>
										</Card.Footer>
									</Card>
								);
							})}
						</YStack>
					</ScrollView>
				)}
				{!appointments && activity.events.length > 0 && (
					<ScrollView>
						<YStack style={styles.scrollView}>
							<Paragraph>Events</Paragraph>
							{activity.events.map((event) => {
								return (
									<Card
										justifyContent={"center"}
										padded
										radiused
										elevate
										marginTop={"$2"}
										key={event.code}
										bordered
									>
										<Card.Header>
											<H6>Event {event.num_event}</H6>
											<Paragraph size={"$4"}>
												{event.begin} - {event.end.split(" ").at(-1)}
											</Paragraph>
										</Card.Header>
										<Card.Footer>
											<YStack>
												<XStack width={"100%"} justifyContent={"space-between"}>
													<Paragraph size={"$4"}>
														{event.location.split("/")[2]}
														{"->"}
														{event.location.split("/").at(-1)}
													</Paragraph>
													<Paragraph size={"$4"}>
														{event.nb_inscrits}/{event.seats}
													</Paragraph>
												</XStack>
												{!registered && (
													<Button
														onPress={() => buttonRegister(event.code, true)}
													>
														{registerLoad ? <Spinner /> : "Register"}
													</Button>
												)}
												{event.already_register != null && (
													<Button
														onPress={() => buttonRegister(event.code, false)}
													>
														{registerLoad ? <Spinner /> : "Unregister"}
													</Button>
												)}
											</YStack>
										</Card.Footer>
									</Card>
								);
							})}
						</YStack>
					</ScrollView>
				)}
				{appointments && (
					<>
						<Paragraph>Appointments</Paragraph>
						<ScrollView>
							<Accordion type={"single"} collapsible>
								{appointments.slots.map((slot) => {
									return (
										<YStack key={slot.id}>
											<Accordion.Item value={slot.id.toString(10)}>
												<Accordion.Trigger>
													<Paragraph>
														{slot.title.length > 0
															? slot.title
															: "Appointment slot"}{" "}
														- {slot.room}
													</Paragraph>
												</Accordion.Trigger>
												<Accordion.Content>
													{slot.slots.map((appointmentSlot) => {
														return (
															<Card
																justifyContent={"center"}
																padded
																radiused
																elevate
																marginTop={"$2"}
																key={appointmentSlot.id}
																bordered
															>
																<Card.Header>
																	<H6>
																		{new Date(
																			appointmentSlot.date,
																		).toLocaleString("en-US", {
																			weekday: "short",
																			day: "2-digit",
																			month: "short",
																			hour: "2-digit",
																			minute: "2-digit",
																		})}
																	</H6>
																</Card.Header>
																<Card.Footer
																	justifyContent={"center"}
																	alignItems={"center"}
																>
																	{appointmentSlot.master &&
																	appointmentSlot.master.login !==
																		JWT.decode(session, null).login ? (
																		<Paragraph>
																			Someone already registered
																		</Paragraph>
																	) : appointmentSlot.master &&
																		appointmentSlot.master.login ===
																			JWT.decode(session, null).login ? (
																		<Button
																			onPress={() =>
																				buttonRegisterAppointment(
																					appointmentSlot.id.toString(10),
																					false,
																				)
																			}
																		>
																			Unregister
																		</Button>
																	) : (
																		<Button
																			onPress={() =>
																				buttonRegisterAppointment(
																					appointmentSlot.id.toString(10),
																					true,
																				)
																			}
																		>
																			Register
																		</Button>
																	)}
																</Card.Footer>
															</Card>
														);
													})}
												</Accordion.Content>
											</Accordion.Item>
										</YStack>
									);
								})}
							</Accordion>
						</ScrollView>
					</>
				)}
			</YStack>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		marginHorizontal: 4,
	},
	scrollView: {
		alignItems: "center",
		gap: "$2",
		maxHeight: 300,
	},
});
