import { ForwardedRef, forwardRef } from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'
import { P } from './P'
import { tokens } from '@/tokens'

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
      <TextInput ref={ref} {...restProps} style={styles.input} />
    </>
  )
}

export const Input = forwardRef(BaseInput)

const styles = StyleSheet.create({
  input: {
    marginTop: tokens.space / 4,
    padding: tokens.space,
    borderRadius: tokens.radius,
    borderWidth: 1.5,
    borderColor: tokens.foregroundColor,
    marginBottom: tokens.space,
  },
})
