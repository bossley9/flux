import { StyleSheet } from 'react-native'
import { CardContainer } from '@/components/CardContainer'
import { P } from '@/html'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useTheme, type Theme } from '@/theme'

type Props = {
  icon: string
  text: string
}

export function EntryCardUnderlay({ icon, text }: Props) {
  const tokens = useTheme()
  const styles = makeStyles({ tokens })
  return (
    <CardContainer style={styles.container}>
      <Icon
        style={styles.icon}
        name={icon}
        size={20}
        color={tokens.foregroundColor}
      />
      <P color={tokens.foregroundColor}>{text}</P>
    </CardContainer>
  )
}

type StyleProps = {
  tokens: Theme
}
const makeStyles = ({ tokens }: StyleProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: tokens.darkColor,
      borderColor: tokens.darkColor,
      paddingRight: tokens.space * 2,
    },
    icon: {
      marginRight: tokens.space / 2,
    },
  })
