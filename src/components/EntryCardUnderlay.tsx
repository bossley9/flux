import { CardContainer } from '@/components/CardContainer'
import { P } from '@/html'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { tokens } from '@/tokens'

type Props = {
  icon: string
  text: string
}

export function EntryCardUnderlay({ icon, text }: Props) {
  return (
    <CardContainer
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: tokens.darkColor,
        borderColor: tokens.darkColor,
        paddingRight: tokens.space * 2,
      }}
    >
      <Icon
        style={{ marginRight: tokens.space / 2 }}
        name={icon}
        size={20}
        color={tokens.foregroundColor}
      />
      <P color={tokens.foregroundColor}>{text}</P>
    </CardContainer>
  )
}
