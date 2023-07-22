import { StyleSheet, View } from 'react-native'
import { ScrollScreenContainer } from '@/components/ScrollScreenContainer'
import { Heading, P } from '@/html'
import { ActionButton } from '@/components/ActionButton'
import { useQueryVersion } from '@/services/queries'
import { useMutationLogout } from '@/services/auth'
import { useTheme, type Theme } from '@/theme'

export function SettingsScreen() {
  const { mutate: logout } = useMutationLogout()
  const { data } = useQueryVersion()
  const styles = makeStyles({ tokens: useTheme() })

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
        <View style={styles.actionContainer}>
          <ActionButton icon="logout" onPress={handleLogout}>
            Logout
          </ActionButton>
        </View>
        <P align="center" margin={0}>
          Miniflux version <P style={styles.version}>{data ?? '0.0.00'}</P>
        </P>
      </View>
    </ScrollScreenContainer>
  )
}

type StyleProps = {
  tokens: Theme
}
const makeStyles = ({ tokens }: StyleProps) =>
  StyleSheet.create({
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
    actionContainer: { flexDirection: 'row', justifyContent: 'center' },
    version: { fontWeight: 'bold' },
  })
