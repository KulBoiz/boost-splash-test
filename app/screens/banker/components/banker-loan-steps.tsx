import { Box, HStack, IBoxProps, ScrollView } from "native-base"
import React, { useEffect, useRef } from "react"
import { s, vs } from "react-native-size-matters"
import { StepSuccessSvg } from "../../../assets/svgs"
import { Text } from "../../../components"

type Props = IBoxProps & {
  activeIndex?: number
}

const BankerLoanSteps = React.memo(({ activeIndex = 0, ...props }: Props) => {
  const scrollRef = useRef<any>(null)
  const steps = [
    "Chờ xử lý",
    "Tiếp nhận",
    "Thẩm định",
    "Duyệt cho vay",
    "Phong toả 3 bên",
    "Đang giải ngân",
    "Đã giải ngân",
  ]

  useEffect(() => {
    if (activeIndex > 3) {
      scrollRef?.current?.scrollToEnd({ animated: true })
    } else if (activeIndex < 2) {
      scrollRef?.current?.scrollTo({ x: 0, animated: true })
    } else {
      scrollRef?.current?.scrollTo({ x: activeIndex * 70, animated: true })
    }
  }, [activeIndex])

  return (
    <Box mt={vs(20)} {...props}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 30, paddingRight: 40 }}
        scrollEnabled={false}
      >
        {steps.map((item, index) => {
          const active = index === activeIndex
          const success = activeIndex > index
          return (
            <Box key={index} alignItems="center" justifyContent="center">
              <HStack>
                <Box alignItems="center" height={45}>
                  {success ? (
                    <StepSuccessSvg />
                  ) : (
                    <Box
                      width={6}
                      height={6}
                      alignItems="center"
                      justifyContent="center"
                      bg={active ? "primary" : "white"}
                      rounded="full"
                      borderWidth="1"
                      borderColor={active ? "primary" : "#C6CACE"}
                    >
                      <Text
                        text={String(index + 1)}
                        color={active ? "white" : "grayChateau"}
                        fontSize={14}
                        lineHeight={20}
                        fontWeight={600}
                      />
                    </Box>
                  )}
                  {active ? (
                    <Box position="absolute" width="100" bottom="0">
                      <Text
                        color="primary"
                        fontSize={12}
                        lineHeight={17}
                        fontWeight="400"
                        text={item}
                        mt="1"
                        textAlign={"center"}
                      />
                    </Box>
                  ) : null}
                </Box>
                <Box height={6} alignItems="center" justifyContent="center">
                  {index < steps.length - 1 ? (
                    <Box
                      width={66}
                      borderTopWidth={1}
                      borderTopColor={success ? "green" : "iron"}
                      mx={s(10)}
                    />
                  ) : null}
                </Box>
              </HStack>
            </Box>
          )
        })}
      </ScrollView>
    </Box>
  )
})

export default BankerLoanSteps
