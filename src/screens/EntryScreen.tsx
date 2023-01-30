import { Text } from 'react-native'
import { ScreenContainer } from '@/components/ScreenContainer'
import { Screen, ScreenProps } from '@/navigation'

type Props = ScreenProps<Screen.Entry>

export function EntryScreen({ route }: Props) {
  const { entry } = route.params

  return (
    <ScreenContainer>
      <Text>This is entry {entry.id}</Text>
      <Text>entry title is {entry.title}</Text>
      <Text>entry content is {entry.content}</Text>
    </ScreenContainer>
  )
}
