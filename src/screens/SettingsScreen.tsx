import { StyleSheet } from 'react-native'
import { ScreenContainer } from '@/components/ScreenContainer'
import { P, MainButton } from '@/html'
import { useQueryVersion } from '@/services/queries'
import { useMutationLogout } from '@/services/auth'
import { tokens } from '@/styles'

export function SettingsScreen() {
  const { mutate: logout } = useMutationLogout()
  const { data } = useQueryVersion()

  function handleLogout() {
    logout()
  }

  return (
    <ScreenContainer
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <MainButton onPress={handleLogout}>Logout</MainButton>
      <P align="center" margin={0}>
        Miniflux version {data ?? '0.0.00'}
      </P>
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
