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
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (props, ref) => {
  const { name, isInvalid, isRequired, error } = props
  const { label = name } = props

  return (
    <FormControl isInvalid={isInvalid} isRequired={isRequired}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <ChakraInput {...props} id={name} ref={ref} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}

export default forwardRef(Input)
