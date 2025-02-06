import type { Activity, ActivityType, AppointmentType } from '@/types';
import { CircleCheck, CircleX } from '@tamagui/lucide-icons';
import { Link } from 'expo-router';
import { ListItem, Text } from 'tamagui';
import { useEffect, useState } from 'react';
import useSession from '@/hooks/ctx';
import { fetchAppointments } from '@/utils/fetchData';
import JWT from 'expo-jwt';

export default function ActivityCard({ activity, type }: { activity: Activity; type: ActivityType }) {
  let dateText: string;
  const [isRegistered, setIsRegistered] = useState(false);
  const { session } = useSession();

  useEffect(() => {
    const checkRegistration = async () => {
      if (!session) {
        setIsRegistered(false);
        return;
      }

      if (activity.registered === 1) {
        setIsRegistered(true);
        return;
      }

      try {
        const appointmentsResponse = await fetchAppointments({
          session,
          year: activity.scolaryear,
          module: activity.codemodule,
          city: activity.codeinstance,
          activity: activity.codeacti,
        });

        const appointments: AppointmentType = await appointmentsResponse.json();
        const userLogin = JWT.decode(session, null).login;

        const registered = appointments.slots.some((slot) =>
          slot.slots.some(
            (appointment) =>
              appointment.members.some((member) => member.login === userLogin) ||
              appointment.master?.login === userLogin,
          ),
        );

        setIsRegistered(registered);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setIsRegistered(false);
      }
    };

    checkRegistration();
  }, [session, activity]);

  if (type === 'project' && activity.type_acti_code !== 'proj') {
    return null;
  }
  if (type === 'activity' && activity.type_acti_code === 'proj') {
    return null;
  }
  const calculateDaysDiff = (start: string, end: string) => {
    let daysDiff = Math.round((new Date(start).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    if (daysDiff < 0) {
      daysDiff = Math.round((new Date(end).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
      if (daysDiff < 0) {
        return 'Already ended';
      }
      if (daysDiff === 1) {
        return 'Ends today';
      }
      return `Ends in ${daysDiff} days`;
    }
    if (daysDiff === 1) {
      return 'Starts tomorrow';
    }
    if (daysDiff === 0) {
      return 'Starts today';
    }
    return `Starts in ${daysDiff} days`;
  };

  if (!activity.begin_event || !activity.end_event) {
    dateText = calculateDaysDiff(activity.begin_acti, activity.end_acti);
  } else {
    dateText = calculateDaysDiff(activity.begin_event, activity.end_event);
  }

  return (
    <Link
      href={`/activity?year=${activity.scolaryear}&module=${activity.codemodule}&city=${activity.codeinstance}&activity=${activity.codeacti}`}
    >
      <ListItem
        key={activity.codeacti + activity.begin_event}
        bordered
        radiused
        justifyContent={'flex-start'}
        alignContent={'center'}
        gap={'$2'}
      >
        {isRegistered ? <CircleCheck /> : <CircleX />} {/* Use state here */}
        <Text maxWidth={'60%'}>{activity.acti_title}</Text> <Text>{dateText}</Text>
      </ListItem>
    </Link>
  );
}
