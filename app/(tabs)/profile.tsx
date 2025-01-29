import useSession from '@/hooks/ctx';
import { MarksType, NotesType, UserType } from '@/types';
import { fakeMarks, fakeUser } from '@/utils/fakeData';
import { fetchImage, fetchMarks, fetchUser, fetchtLogtime } from '@/utils/fetchData';
import { Settings } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import forEach from 'obliterator/foreach';
import { useEffect, useState } from 'react';
import { RefreshControl, StyleSheet, View, useColorScheme } from 'react-native';
import { BarChart, barDataItem } from 'react-native-gifted-charts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Accordion, Avatar, Button, Card, ListItem, Paragraph, ScrollView, Separator, Spinner, Text, XStack, YStack } from 'tamagui';

export default function Profile() {
  const { signOut, session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  let colorScheme = useColorScheme();
  const [reload, setReload] = useState(true);
  const [user, setUser] = useState<UserType | null>(null);
  const [image, setImage] = useState<string>('error');
  const [marks, setMarks] = useState<MarksType | null>(null);
  const [logTime, setLogTime] = useState<barDataItem[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (!session) {
        console.log('No session available');
        setIsLoading(false);
        return;
      }
      try {
        if (session === 'guest') {
          setUser(fakeUser);
          setMarks(fakeMarks);
          setImage(fakeUser.picture);
          return;
        }
        const responseUser = await fetchUser(session);
        const responseMarks = await fetchMarks(session);
        const image = await fetchImage(session || 'error');
        setImage(image);
        if (!responseUser.ok) {
          console.error('Fetch error:', responseUser);
        } else {
          const data = await responseUser.json();
          setUser(data);
        }
        if (!responseMarks.ok) {
          console.error('Fetch error:', responseMarks);
        } else {
          const data: MarksType = await responseMarks.json();
          const grouped = data.notes.reduce((acc: any, note) => {
            const key = note.codemodule;
            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push(note);
            return acc;
          }, {});
          data.modules.forEach((module) => {
            module.notes = grouped[module.codemodule] || [];
          });
          setMarks(data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Fetch error:', error);
        signOut();
      }
    })();
    (async () => {
      if (!session || session === 'guest') return;
      const logReq = await fetchtLogtime({ session });
      if (logReq.status !== 200) {
        signOut();
      }
      const logBody = await logReq.json();
      const current_week = await logBody.splice(-5);
      const formatLogTime: barDataItem[] = await current_week.map((log: Array<any>) => {
        const value = log[1] / 3600;
        const label = new Date(log[0] * 1000).toLocaleDateString('en-US', { weekday: 'long' }).slice(0, 3);
        return { value, label };
      });
      setLogTime(formatLogTime);
    })();
  }, [session, reload]);

  if (isLoading || !user || !marks) {
    return (
      <SafeAreaView style={styles.container}>
        <Spinner size='large' />
      </SafeAreaView>
    );
  }

  function getWeekTime() {
    if (!logTime) {
      return 0;
    }
    let hours = 0;
    let isWeekStart = false;
    forEach(logTime, (log) => {
      if (isWeekStart) {
        hours += log.value ? log.value : 0;
      }
      if (log.label === 'Mon') {
        isWeekStart = true;
        hours += log.value ? log.value : 0;
      }
    });
    return hours.toFixed(2);
  }

  return (
    <SafeAreaView style={styles.container}>
      <XStack justifyContent={'flex-end'} alignItems={'flex-end'} width={'100%'} marginTop={'$2'} marginRight={'$1'}>
        <Settings onPress={() => router.push('/settings')} />
      </XStack>
      <YStack gap={'20'} width={'90%'}>
        <Card bordered padded>
          <Card.Footer alignItems={'center'} gap={'$3'}>
            <Avatar radiused={true} size={'$8'}>
              <Avatar.Image src={image} />
            </Avatar>
            <YStack>
              <Paragraph size={'$6'}>{user.title}</Paragraph>
              <XStack justifyContent={'space-around'} gap={'$2'}>
                <Paragraph size={'$3.5'}>{user.studentyear} year</Paragraph>
                <Paragraph size={'$3.5'}>{user.credits} credits</Paragraph>
                <Paragraph size={'$3.5'}>{user.gpa[0].gpa} GPA</Paragraph>
              </XStack>
            </YStack>
          </Card.Footer>
        </Card>
        {logTime && (
          <Card bordered padded>
            <Card.Header>
              <Paragraph size={'$5'}>Log time</Paragraph>
              <Paragraph>This week: {getWeekTime()}</Paragraph>
            </Card.Header>
            <Card.Footer>
              <BarChart
                data={logTime}
                barBorderRadius={10}
                frontColor={'#0091d3'}
                xAxisLabelTextStyle={{
                  color: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
                }}
                yAxisTextStyle={{
                  color: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
                }}
                maxValue={12}
                renderTooltip={(item: barDataItem) => {
                  return <ListItem title={item.value?.toFixed(2)} bordered borderRadius={'$10'} zIndex={100} />;
                }}
              />
            </Card.Footer>
          </Card>
        )}
        <YStack maxHeight={'70%'} gap={'$2'}>
          <Paragraph size='$5' textAlign={'center'}>
            Marks
          </Paragraph>
          <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => setReload(!reload)} />} gap={'$4'}>
            <Accordion type={'multiple'} collapsable marginTop={'4'}>
              {marks.modules.map((module) => (
                <Accordion.Item value={module.codemodule} key={module.codemodule + module.codeinstance}>
                  <Accordion.Trigger flexDirection='row' justifyContent='space-between'>
                    <Paragraph>
                      {module.title} <Text color={module.grade !== 'A' && module.grade !== 'B' && module.grade !== '-' ? 'red' : 'green'}>{module.grade !== '-' ? `- ${module.grade}` : ''}</Text>
                    </Paragraph>
                  </Accordion.Trigger>
                  <Accordion.HeightAnimator animation='slow'>
                    <Accordion.Content animation='slow' exitStyle={{ opacity: 0 }}>
                      <YStack>
                        {module.notes.map((note: NotesType) => (
                          <YStack key={note.final_note + note.title}>
                            <ListItem>
                              <Paragraph>{note.title}</Paragraph> <Paragraph>{note.final_note.toString(10)}</Paragraph>
                            </ListItem>
                            <Separator />
                          </YStack>
                        ))}
                      </YStack>
                    </Accordion.Content>
                  </Accordion.HeightAnimator>
                </Accordion.Item>
              ))}
            </Accordion>
          </ScrollView>
          <Button onPress={signOut} bordered>
            Logout
          </Button>
        </YStack>
      </YStack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 20,
  },
});
