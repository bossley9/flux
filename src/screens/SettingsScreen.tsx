import { StyleSheet, View } from 'react-native'
import { ScrollScreenContainer } from '@/components/ScrollScreenContainer'
import { Heading, P } from '@/html'
import { ActionButton } from '@/components/ActionButton'
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
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <ActionButton icon="logout" onPress={handleLogout}>
            Logout
          </ActionButton>
        </View>
        <P align="center" margin={0}>
          Miniflux version{' '}
          <P style={{ fontWeight: 'bold' }}>{data ?? '0.0.00'}</P>
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
    gap: tokens.space,
    alignContent: 'center',
    justifyContent: 'center',
  },
})
