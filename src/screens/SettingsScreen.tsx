import { StyleSheet, View } from 'react-native'
import { ScrollScreenContainer } from '@/components/ScrollScreenContainer'
import { Heading, P, MainButton } from '@/html'
import { useQueryVersion } from '@/services/queries'
import { useMutationLogout } from '@/services/auth'
import { tokens } from '@/tokens'

export function SettingsScreen() {
  const { mutate: logout } = useMutationLogout()
  const { data } = useQueryVersion()

  function handleLogout() {
    logout()
  }

  return (
    <ScrollScreenContainer
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Heading level={1}>Settings</Heading>
      <View style={styles.content}>
        <MainButton onPress={handleLogout}>Logout</MainButton>
        <P align="center" margin={0}>
          Miniflux version {data ?? '0.0.00'}
        </P>
      </View>
    </ScrollScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: tokens.space,
    paddingRight: tokens.space,
  },
  contentContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
})
