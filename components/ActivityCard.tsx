import { ListItem, Text } from "tamagui";
import { CircleCheck, CircleX } from "@tamagui/lucide-icons";
import { Activity, ActivityType } from "@/types";

export default function ActivityCard({activity, type}: { activity: Activity, type: ActivityType }) {
    let dateText;
    if (type === "project" && activity.type_acti_code != "proj") {
        return null
    }
    if (type === "activity" && activity.type_acti_code === "proj") {
        return null
    }
    const calculateDaysDiff = (start: string, end: string) => {
        let daysDiff = Math.round((new Date(start).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
        if (daysDiff < 0) {
            daysDiff = Math.round((new Date(end).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
            if (daysDiff < 0) {
                return `Already ended`;
            } else if (daysDiff === 1) {
                return `Ends today`;
            } else {
                return `Ends in ${daysDiff} days`;
            }
        } else {
            if (daysDiff === 1) {
                return `Starts tomorrow`
            } else if (daysDiff === 0) {
                return `Starts today`
            }
            return `Starts in ${daysDiff} days`;
        }
    };

    if (!activity.begin_event || !activity.end_event) {
        dateText = calculateDaysDiff(activity.begin_acti, activity.end_acti);
    } else {
        dateText = calculateDaysDiff(activity.begin_event, activity.end_event);
    }

    return (
        <ListItem key={activity.codeacti + activity.begin_event} bordered radiused justifyContent={"flex-start"} alignContent={"center"} gap={"$2"}>
            {activity.registered === 0 ? <CircleX/> : <CircleCheck/>}<Text maxWidth={"60%"}> {activity.acti_title}</Text> <Text>{dateText}</Text>
        </ListItem>
    )
}