import { Box, HStack, Input, IInputProps, IBoxProps, ITextProps } from "native-base"
import React, { useCallback } from "react"
import { Animated } from "react-native"
import { s, vs } from "react-native-size-matters"
import { Text } from "../../../components"
import { TxKeyPath } from "../../../i18n"

const makeAnimatedValue = (value) => new Animated.Value(value ? 1 : 0)

interface Props extends IInputProps {
  label?: string
  prefix?: string
  labelTx?: TxKeyPath
  _container?: IBoxProps
  _labelContainer?: IBoxProps
  _label?: ITextProps
}

const BankerInput = React.memo((props: Props) => {
  const {
    prefix,
    label,
    labelTx,
    defaultActionVisible = true,
    fixedLabel,
    showLabel = true,
    required = false,
    _container,
    _labelContainer,
    _label,
    ...rest
  } = props

  const [inputValue, setInputValue] = React.useState<string | undefined>(props.value)
  const [fadeAnim] = React.useState<Animated.Value>(makeAnimatedValue(props.value))
  const [fieldFocused, setFieldFocused] = React.useState<boolean>(!!props.value)
  const [isActionVisible, setIsActionVisible] = React.useState<boolean>(defaultActionVisible)
  const [borderColor, setBorderColor] = React.useState<string>("iron")

  React.useEffect(() => {
    if (!inputValue?.length && props.value?.length) {
      Animated.spring(fadeAnim, { toValue: 1, useNativeDriver: true }).start()
      setFieldFocused(false)
    }
    setInputValue(props.value)
    if (!defaultActionVisible) {
      setIsActionVisible(!!props.value?.length)
    }
  }, [props.value, defaultActionVisible])

  const _showLabel = () => {
    setBorderColor("primary")
    if (!fixedLabel && showLabel) {
      setFieldFocused(true)
    }
  }

  const _onChangeText = React.useCallback(
    (value) => {
      setInputValue(value)

      props.onChangeText?.(value)

      if (!defaultActionVisible) {
        setIsActionVisible(!!value?.length)
      }
      _showLabel()
    },
    [props.onChangeText, defaultActionVisible],
  )

  const _onInputFocus = React.useCallback(
    (e) => {
      props.onFocus?.(e)
      _showLabel()
    },
    [props.onFocus, fadeAnim, fixedLabel, showLabel],
  )

  const _onInputBlur = React.useCallback(
    (e) => {
      props.onBlur?.(e)
      setBorderColor("iron")
      setFieldFocused(false)
    },
    [props.onBlur, fadeAnim, inputValue],
  )

  const renderLabel = useCallback(() => {
    return (
      <HStack p="1" bg="white" alignItems="center">
        <Text
          fontSize={12}
          lineHeight={17}
          fontWeight="500"
          color="grayChateau"
          {..._label}
          text={label}
          tx={labelTx}
        />
        {!!required && (
          <Text
            color="red.500"
            fontSize={10}
            lineHeight={14}
            fontWeight="400"
            {..._label}
            text=" *"
          />
        )}
      </HStack>
    )
  }, [required])

  return (
    <HStack
      borderColor={borderColor}
      borderWidth="1"
      borderRadius={4}
      height={vs(37)}
      alignItems="center"
      {..._container}
    >
      {fieldFocused ? (
        <Box position="absolute" top="-12" left="2" zIndex="1" h="6">
          {renderLabel()}
        </Box>
      ) : (
        <Box
          position="absolute"
          top="0"
          left="3"
          right="0"
          bottom="0"
          justifyContent="center"
          {..._labelContainer}
        >
          {renderLabel()}
        </Box>
      )}
      <Input
        mx="3"
        selectionColor="primary"
        px="0"
        _focus={{ bg: "transparent" }}
        borderWidth="0"
        flex={1}
        {...rest}
        onFocus={_onInputFocus}
        onBlur={_onInputBlur}
      />
      {!!prefix && (
        <Text
          mr="3"
          fontSize={12}
          lineHeight={17}
          fontWeight="500"
          color="grayChateau"
          text={prefix}
        />
      )}
    </HStack>
  )
})

export default BankerInput
