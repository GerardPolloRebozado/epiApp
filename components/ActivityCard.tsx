import { ListItem, Text } from "tamagui";
import { CircleCheck, CircleX } from "@tamagui/lucide-icons";
import { Activity } from "@/types";

export default function ActivityCard({activity}: { activity: Activity }) {
    let dateText;
    if (!activity.begin_event || !activity.end_event) {
        let days_diff = Math.round((new Date(activity.begin_acti).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
        if (days_diff < 0) {
            days_diff = Math.round((new Date(activity.end_acti).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
            dateText = `Ends in ${days_diff} days`;
        } else {
            dateText = `Starts in ${days_diff} days`;
        }
    } else {
        let days_diff = Math.round((new Date(activity.begin_event).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
        if (days_diff < 0) {
            days_diff = Math.round((new Date(activity.end_event).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
            dateText = `Ends in ${days_diff} days`;
        } else {
            dateText = `Starts in ${days_diff} days`;
        }
    }
    return (
        <ListItem key={activity.codeacti + activity.begin_event} bordered radiused>
            <Text>{activity.registered === 0 ? <CircleX/> : <CircleCheck/>} {activity.acti_title} - {dateText}</Text>
        </ListItem>
    )
}