import React, { forwardRef, ForwardRefRenderFunction } from "react"
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/core"

interface InputProps extends ChakraInputProps {
  label?: string
  error?: string
  name: string
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (props, ref) => {
  const { name, isInvalid, isRequired, error, label, placeholder } = props

  return (
    <FormControl isInvalid={isInvalid} isRequired={isRequired}>
      <FormLabel htmlFor={name}>{label || name}</FormLabel>
      <ChakraInput {...props} id={name} ref={ref} placeholder={placeholder || name} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}

export default forwardRef(Input)
