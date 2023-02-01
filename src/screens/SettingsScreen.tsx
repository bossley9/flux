import { Button, StyleSheet } from 'react-native'
import { ScreenContainer } from '@/components/ScreenContainer'
import { P } from '@/html'
import { useQueryVersion } from '@/services/queries'
import { useMutationLogout } from '@/services/mutations'
import { tokens } from '@/styles'

export function SettingsScreen() {
  const { mutate: logout } = useMutationLogout()
  const { data } = useQueryVersion()

  function handleLogout() {
    // TODO add confirmation dialog before logout
    logout()
  }

  return (
    <ScreenContainer
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Button title="Logout" onPress={handleLogout} />
      <P align="center">Miniflux version {data ?? '0.0.00'}</P>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: tokens.space,
    paddingRight: tokens.space,
  },
  contentContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
})
