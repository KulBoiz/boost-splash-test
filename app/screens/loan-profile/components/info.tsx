import { observer } from "mobx-react-lite"
import React, { useEffect, useRef } from "react"
import { Platform, ScrollView, View } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"
import { truncateString } from "../../../constants/variable"
import { useStores } from "../../../models"
import { color } from "../../../theme"
import ItemView from "../../loan/components/item-view"
import Document from "./document"
import Note from "../../../components/note/note"
import { Box } from "native-base"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

interface Props {}

const Info = observer((props: Props) => {
  // @ts-ignore
  const { loanStore } = useStores()
  const { loanDetail, files, templates, task } = loanStore
  const { user } = task

  const checkGender = () => {
    if (!user?.gender) {
      return "Khác"
    }

    if (user.gender === "male") {
      return "Nam"
    }

    return "Nữ"
  }

  if (!loanDetail) return <></>

  const name = () => {
    if (user?.fullName) {
      return user?.fullName
    } else {
      if (user?.firstName || user?.lastName) {
        return (user?.firstName || "") + " " + (user?.lastName || "")
      }

      return ""
    }
  }

  return (
    <Box flex="1">
      <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={20}
        contentContainerStyle={styles.container}
      >
        <View style={styles.content}>
          <AppText style={styles.title} value={"Khách hàng"} />
          <View style={styles.contentItem}>
            <ItemView
              style={styles.item}
              title={"loan.infoLoan.profile.fullName"}
              content={truncateString(name(), 20)}
            />
            <ItemView
              style={styles.item}
              title={"loan.infoLoan.profile.sex"}
              content={checkGender()}
            />
            <ItemView
              style={styles.item}
              title={"loan.infoLoan.profile.phone"}
              content={user?.tels?.[0]?.tel}
            />
            <ItemView
              style={styles.item}
              title={"loan.infoLoan.profile.email"}
              content={user?.emails?.[0]?.email}
            />
          </View>
        </View>

        {loanDetail?.id && <Document loanDetail={loanDetail} files={files} templates={templates} />}

        {loanDetail?.id && (
          <View style={styles.content}>
            <AppText style={styles.title} value={"Ghi chú"} />

            <View style={[styles.contentItem, styles.contentItemNote]}>
              <Note id={loanDetail?.id} />
            </View>
          </View>
        )}
      </KeyboardAwareScrollView>
    </Box>
  )
})

export default Info

const styles = ScaledSheet.create({
  container: {
    paddingLeft: "16@s",
    paddingRight: "16@s",
    paddingBottom: "16@s",
  },
  content: {
    marginBottom: "16@s",
  },
  title: {
    marginBottom: "8@s",
  },
  contentItem: {
    borderRadius: "8@s",
    padding: "8@s",
    backgroundColor: color.palette.white,
  },
  contentItemNote: {
    padding: "16@s",
  },
  item: {
    padding: "8@s",
  },
})
