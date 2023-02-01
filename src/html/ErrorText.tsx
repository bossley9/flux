import { P } from '@/html'
import { Text } from 'react-native'
import { tokens } from '@/styles'

type Props = { children?: React.ReactNode }

export function ErrorText({ children }: Props) {
  return (
    <P color={tokens.errorColor} align="center">
      <Text style={{ fontWeight: 'bold' }}>{children}</Text>
    </P>
  )
}
