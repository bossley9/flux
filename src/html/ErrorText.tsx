import { P } from './P'
import { Text } from 'react-native'
import { tokens } from '@/tokens'

type Props = { children?: React.ReactNode }

export function ErrorText({ children }: Props) {
  return (
    <P color={tokens.errorColor} align="center">
      <Text style={{ fontWeight: 'bold' }}>{children}</Text>
    </P>
  )
}
