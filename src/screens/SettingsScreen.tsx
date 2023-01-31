import { Button, StyleSheet } from 'react-native'
import { ScreenContainer } from '@/components/ScreenContainer'
import { useMutationLogout } from '@/services/mutations'
import { tokens } from '@/styles'

export function SettingsScreen() {
  const { mutate: logout } = useMutationLogout()

  function handleLogout() {
    logout()
  }

  return (
    <ScreenContainer style={styles.container}>
      <Button title="logout" onPress={handleLogout} />
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
