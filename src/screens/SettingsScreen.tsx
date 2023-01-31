import { Button, StyleSheet, Text } from 'react-native'
import { ScreenContainer } from '@/components/ScreenContainer'
import { useQueryVersion } from '@/services/queries'
import { useMutationLogout } from '@/services/mutations'
import { tokens } from '@/styles'

export function SettingsScreen() {
  const { mutate: logout } = useMutationLogout()
  const { data } = useQueryVersion()

  function handleLogout() {
    logout()
  }

  return (
    <ScreenContainer style={styles.container}>
      <Button title="logout" onPress={handleLogout} />
      <Text>version {data}</Text>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: tokens.space,
    paddingRight: tokens.space,
  },
})
