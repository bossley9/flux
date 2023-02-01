import { ForwardedRef, forwardRef } from 'react'
import { TextInput, TextInputProps, ViewStyle } from 'react-native'
import { P } from './P'
import { tokens } from '@/styles'

type Props = TextInputProps & {
  name: string
}

function BaseInput(
  { name, ...restProps }: Props,
  ref: ForwardedRef<TextInput | null>
) {
  return (
    <>
      <P>{name}</P>
      <TextInput ref={ref} {...restProps} style={styles} />
    </>
  )
}

export const Input = forwardRef(BaseInput)

const styles: ViewStyle = {
  marginTop: tokens.space / 4,
  padding: tokens.space,
  borderRadius: tokens.radius,
  borderWidth: 1.5,
  borderColor: tokens.foregroundColor,
  marginBottom: tokens.space,
}
